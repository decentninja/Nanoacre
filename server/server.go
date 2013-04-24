package server

import (
	"code.google.com/p/go.net/websocket"

	"net/http"
)

var waitingConnection = make(chan *player)

func SetupSocketServer() {
	http.Handle("/ws", websocket.Handler(newConnection))
}

func newConnection(ws *websocket.Conn) {
	p := &player{
		conn: ws,
	}
	select {
	case waitingConnection <- p:
	case otherP := <-waitingConnection:
		g := &game{
			players: []*player{p, otherP},
		}
		g.run()
	}
}
