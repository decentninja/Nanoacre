package server

import (
	"code.google.com/p/go.net/websocket"
)

type player struct {
	conn        *websocket.Conn
	ready       bool
	lateChecked bool
}

type message struct {
	data []byte
	p    *player
}

func (p *player) listen(ch chan<- *message) {
	for { //TODO: handle connection closing
		var mess []byte
		websocket.Message.Receive(p.conn, &mess)
		ch <- &message{mess, p}
	}
}

func (p *player) send(data []byte) {
	websocket.Message.Send(p.conn, data)
}
