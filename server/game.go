package server

import (
	"fmt"
	"log"
	"time"
)

const (
	PING           = "ping"
	START          = "start"
	LOAD           = "load"
	LOSS           = "loss"
	WIN            = "win"
	DRAW           = "draw"
	REMATCH_ACCEPT = "rematchAccepted"
)

type game struct {
	id             int
	players        []*player
	ch             chan *message
	parentCustom   *custom
	shouldQuit     bool
	waitingForDraw bool
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
		log.Printf("Game %s: %d/%d players.\n", g.str(), len(g.players), g.parentCustom.numPlayers)
		if len(g.players) == g.parentCustom.numPlayers {
			for len(g.ch) > 0 {
				m := <-g.ch
				if m.data == "disconnect" {
					g.removePlayer(m.p)
					log.Printf("Game %s: removed a player as it had disconnected.\n", g.str())
				}
			}
			if len(g.players) == g.parentCustom.numPlayers {
				break
			}
		}
	}

	g.parentCustom.spawnNewGame()
	g.load()
	g.run()
}

func (g *game) removePlayer(p *player) {
	for i, pl := range g.players {
		if pl == p {
			g.players[i] = g.players[len(g.players)-1]
			g.players = g.players[0 : len(g.players)-1]
		}
	}
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
	log.Printf("Game %s: sent loadData.\n", g.str())
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
		log.Printf("Game %s: a player has died.", g.str())
		time.AfterFunc(time.Second, func() { g.endIfAllDead() })

	case "rematch":
		mess.p.state.wantRegame = true
		log.Printf("Game %s: a player wants a regame.", g.str())
		g.rematchIfAllAgree()

	case "disconnect":
		log.Printf("Game %s: got a disconnect", g.str())
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
	log.Printf("Game %s: sent start signal.\n", g.str())
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

	if !g.waitingForDraw {
		g.waitingForDraw = true
		log.Printf("Game %s: waiting in case of a draw.\n", g.str())
		time.AfterFunc(time.Second, func() {
			log.Printf("Game %s: gameover, sending win and loss.\n", g.str())
			if alive == 1 {
				for _, p := range g.players {
					if p.state.dead {
						p.send(LOSS)
					} else {
						p.send(WIN)
					}
				}
			} else {
				g.sendToAll(DRAW)
			}
			g.waitingForDraw = false
		})
	}
}

func (g *game) rematchIfAllAgree() {
	for _, p := range g.players {
		if !p.state.wantRegame {
			return
		}
	}

	g.sendToAll(REMATCH_ACCEPT)
	log.Printf("Game %s: starting rematch.\n", g.str())
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
