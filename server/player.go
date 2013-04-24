package server

import (
	"code.google.com/p/go.net/websocket"
	"log"
)

type player struct {
	conn        *websocket.Conn
	ch          chan *message
	ready       bool
	lateChecked bool
}

type message struct {
	data string
	p    *player
}

func (p *player) listen() {
	for { //TODO: handle connection closing
		var mess string
		err := websocket.Message.Receive(p.conn, &mess)
		if err != nil {
			log.Println("got an error, things have died: ", err)
			return
		}
		p.ch <- &message{mess, p}
	}
}

func (p *player) send(data string) {
	websocket.Message.Send(p.conn, data)
}
