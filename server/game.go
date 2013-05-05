package server

import (
	"fmt"
	"log"
)

const (
	PING  = "ping"
	START = "start"
	LOAD  = "load"
)

type game struct {
	id           int
	players      []*player
	ch           chan *message
	parentCustom *custom
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
	log.Printf("Game %s has sent a start signal.\n", g.str())
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
