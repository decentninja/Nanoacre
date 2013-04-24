package server

var (
	PING  = []byte("ping")
	START = []byte("start")
)

type game struct {
	players []*player
}

func (g *game) run() {
	ch := make(chan *message, 1)
	for _, p := range g.players {
		go p.listen(ch)
	}

	for mess := range ch {
		g.handleMessage(mess)
	}
}

func (g *game) sendToAllOthers(mess *message) {
	for _, p := range g.players {
		if p != mess.p {
			p.send(mess.data)
		}
	}
}

func (g *game) sendToAll(data []byte) {
	for _, p := range g.players {
		p.send(data)
	}
}

func (g *game) handleMessage(mess *message) {
	switch string(mess.data) {
	case "pong":
		mess.p.send(PING)

	case "ready":
		mess.p.ready = true
		g.latencyIfAllReady()

	case "lastpong":
		mess.p.lateChecked = true
		g.startIfAllChecked()

	default:
		g.sendToAllOthers(mess)
	}
}

func (g *game) latencyIfAllReady() {
	for _, p := range g.players {
		if !p.ready {
			return
		}
	}

	g.sendToAll(PING)
}

func (g *game) startIfAllChecked() {
	for _, p := range g.players {
		if !p.lateChecked {
			return
		}
	}

	g.sendToAll(START)
}
