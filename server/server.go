package server

import (
	"code.google.com/p/go.net/websocket"

	"log"
	"net/http"
	"math/rand"
	"path/filepath"
)

var waitingConnection = make(chan *player)
var fields []*playfield

func SetupSocketServer(field string) {
	http.Handle("/ws", websocket.Handler(newConnection))
	if field == "" {
		fields = readFieldsFromFolder("maps")
	} else {
		fields = []*playfield{readFieldFromFile(filepath.Join("maps", field))}
	}
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
