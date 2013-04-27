package server

import (
	"code.google.com/p/go.net/websocket"

	"log"
	"net/http"
	"math/rand"
)

var waitingConnection = make(chan *player)
var fields []*playfield

func SetupSocketServer() {
	http.Handle("/ws", websocket.Handler(newConnection))
	fields = readFieldsFromFolder("maps")
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
		g.load(fields[rand.Intn(len(fields))])
		g.run()
	}
}
