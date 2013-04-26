package server

import (
	"code.google.com/p/go.net/websocket"

	"log"
	"net/http"
)

var waitingConnection = make(chan *player)

func SetupSocketServer() {
	http.Handle("/ws", websocket.Handler(newConnection))
}

func newConnection(ws *websocket.Conn) {
	log.Println("Got new connection.")
	p := &player{
		conn: ws,
		ch:   make(chan *message),
	}
	select {
	case waitingConnection <- p:
		p.listen()

	case otherP := <-waitingConnection:
		p.ch = otherP.ch
		go p.listen()

		g := &game{
			players: []*player{p, otherP},
			ch:      p.ch,
		}
		log.Println("Starting a new game.")
		g.load()
		g.run()
	}
}
