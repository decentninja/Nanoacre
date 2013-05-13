package server

import (
	"code.google.com/p/go.net/websocket"
	"io"
	"log"
)

type player struct {
	conn  *websocket.Conn
	ch    chan *message
	state *gameState
}

type gameState struct {
	ready       bool
	lateChecked bool
	dead        bool
	wantRegame  bool
}

type message struct {
	data string
	p    *player
}

// Handle disconnect
// Listen for messages and send to game
func (p *player) listen() {
	for {
		mess := &message{
			p: p,
		}
		err := websocket.Message.Receive(p.conn, &(mess.data))
		if err != nil {
			if err == io.EOF {
				mess.data = "disconnect"
				p.ch <- mess
			} else {
				log.Println("got an error, things have died: ", err)
			}
			return
		}
		p.ch <- mess
	}
}

func (p *player) send(data string) {
	websocket.Message.Send(p.conn, data)
}

func (p *player) sendJSON(data interface{}) {
	websocket.JSON.Send(p.conn, data)
}
