package server

const (
	PING  = "ping"
	START = "start"
	LOAD  = "load"
)

type game struct {
	players []*player
	ch      chan *message
}

func (g *game) load() {
	g.sendToAll(LOAD) //TODO: send more interesting data
}

func (g *game) run() {
	for mess := range g.ch {
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

func (g *game) sendToAll(data string) {
	for _, p := range g.players {
		p.send(data)
	}
}

func (g *game) handleMessage(mess *message) {
	switch mess.data {
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
