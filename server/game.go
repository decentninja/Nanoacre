package server

import (
	"fmt"
	"log"
)

const (
	PING           = "ping"
	START          = "start"
	LOAD           = "load"
	LOSS           = "loss"
	WIN            = "win"
	REMATCH_ACCEPT = "rematchAccepted"
)

type game struct {
	id           int
	players      []*player
	ch           chan *message
	parentCustom *custom
	shouldQuit   bool
}

type loadData struct {
	Id      int
	Options []string
	Field   *playfield
}

func (g *game) gatherPlayers() {
	for p := range g.parentCustom.newPlayerChannel {
		p.ch = g.ch
		g.players = append(g.players, p)
		log.Printf("Game %s has %d/%d players.\n", g.str(), len(g.players), g.parentCustom.numPlayers)
		if len(g.players) == g.parentCustom.numPlayers {
			break
		}
	}
	g.parentCustom.spawnNewGame()
	g.load()
	g.run()
}

func (g *game) load() {
	field := g.parentCustom.getField()
	for i, p := range g.players {
		p.sendJSON(loadData{
			Id:      i,
			Options: g.parentCustom.options,
			Field:   field,
		})
	}
	log.Printf("Game %s has sent loadData.\n", g.str())
}

func (g *game) run() {
	for mess := range g.ch {
		g.handleMessage(mess)

		if g.shouldQuit {
			break
		}
	}

	log.Printf("Game %s is closing down.\n", g.str())
}

func (g *game) handleMessage(mess *message) {
	switch mess.data {
	case "pong":
		mess.p.send(PING)

	case "ready":
		mess.p.state.ready = true
		g.latencyIfAllReady()

	case "lastpong":
		mess.p.state.lateChecked = true
		g.startIfAllChecked()

	case "dead":
		mess.p.state.dead = true
		g.endIfAllDead()

	case "rematch":
		mess.p.state.wantRegame = true
		g.rematchIfAllAgree()

	case "disconnect":
		log.Printf("Game %s got a disconnect, shutting down.", g.str())
		g.sendToAllOthers(mess)
		g.shouldQuit = true

	default:
		g.sendToAllOthers(mess)
	}
}

func (g *game) latencyIfAllReady() {
	for _, p := range g.players {
		if !p.state.ready {
			return
		}
	}

	g.sendToAll(PING)
}

func (g *game) startIfAllChecked() {
	for _, p := range g.players {
		if !p.state.lateChecked {
			return
		}
	}

	g.sendToAll(START)
	log.Printf("Game %s has sent a start signal.\n", g.str())
}

func (g *game) endIfAllDead() {
	alive := 0
	for _, p := range g.players {
		if !p.state.dead {
			alive++
			if alive > 1 {
				return
			}
		}
	}

	for _, p := range g.players {
		if p.state.dead {
			p.send(LOSS)
		} else {
			p.send(WIN)
		}
	}
}

func (g *game) rematchIfAllAgree() {
	for _, p := range g.players {
		if !p.state.wantRegame {
			return
		}
	}

	g.sendToAll(REMATCH_ACCEPT)
	log.Printf("Game %s is starting a rematch.\n", g.str())
	for _, p := range g.players {
		p.state = new(gameState)
	}
	g.load()
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

func (g *game) str() string {
	return fmt.Sprintf("%s:%d", g.parentCustom.name, g.id)
}
