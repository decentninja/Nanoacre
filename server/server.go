package server

import (
	"code.google.com/p/go.net/websocket"

	"log"
	"math/rand"
	"net/http"
	"path/filepath"
)

type server struct {
	customs   map[string]*custom
	allFields []*playfield
}

type custom struct {
	name             string
	nextId           int
	newPlayerChannel chan *player
	fields           []*playfield
	options          []string
	numPlayers       int
}

func SetupSocketServer(field string) {
	var fields []*playfield
	if field == "" {
		fields = readFieldsFromFolder("maps")
	} else {
		fields = []*playfield{readFieldFromFile(filepath.Join("maps", field))}
	}
	l := &server{
		customs:   make(map[string]*custom),
		allFields: fields,
	}
	l.customs["default"] = l.newDefaultCustom("default")
	handler := websocket.Handler(l.newConnection())
	http.Handle("/ws", handler)
}

func (l *server) newConnection() func(*websocket.Conn) {
	return func(ws *websocket.Conn) {
		customKey := ws.Request().URL.Query().Get("custom")
		c, exists := l.customs[customKey]
		if !exists { //TODO: data race might lose one player if connections are simultaneous
			l.customs[customKey] = l.newDefaultCustom(customKey)
		}
		log.Printf("Got new connection in custom: \"%s\"\n", customKey)
		p := &player{
			conn: ws,
		}
		c.newPlayerChannel <- p
		p.listen()
	}
}

func (l *server) newDefaultCustom(name string) *custom {
	c := &custom{
		name:             name,
		fields:           l.allFields,
		options:          make([]string, 0, 0),
		newPlayerChannel: make(chan *player),
	}
	c.spawnNewGame()
	return c
}

func (c *custom) spawnNewGame() {
	g := &game{
		players:      make([]*player, 0),
		ch:           make(chan *message),
		parentCustom: c,
		id:           c.nextId,
	}
	c.nextId++
	log.Printf("Spawning game %s.\n", g.str())
	go g.gatherPlayers()
}

func (c *custom) getField() *playfield {
	return c.fields[rand.Intn(len(c.fields))]
}
