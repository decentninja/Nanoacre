package server

import (
	"code.google.com/p/go.net/websocket"

	"log"
	"math/rand"
	"net/http"
	"strconv"
)

type server struct {
	customs   map[string]*custom
	allFields map[int][]*playfield
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
	var fields map[int][]*playfield
	if field == "" {
		fields = readFieldsFromFolder("maps")
	} else {
		field := readFieldFromFile("maps", field)
		fields = map[int][]*playfield{len(field.unitsPerPlayer): []*playfield{field}}
	}
	l := &server{
		customs:   make(map[string]*custom),
		allFields: fields,
	}
	l.customs["default"] = l.newDefaultCustom("default")
	handler := websocket.Handler(l.newConnection())
	http.Handle("/ws", handler)
}

func (s *server) newConnection() func(*websocket.Conn) {
	return func(ws *websocket.Conn) {
		query := ws.Request().URL.Query()
		customKey := query.Get("custom")
		c, exists := s.customs[customKey]
		if !exists { //TODO: data race might lose one player if connections are simultaneous
			numPlayers := 2
			if num := query.Get("players"); num != "" {
				var err error
				numPlayers, err = strconv.Atoi(num)
				if err != nil {
					log.Printf("Tried to create a new custom, but got a \"players\" that was not a number (err: %s)\n", err)
					return
				}
			}
			var options []string
			options, exists = query["option"]
			if !exists {
				options = make([]string, 0, 0)
			}
			c = s.newCustom(customKey, numPlayers, options)
			s.customs[customKey] = c
		}
		log.Printf("Got new connection in custom: \"%s\"\n", customKey)
		p := &player{
			conn:  ws,
			state: new(gameState),
		}
		c.newPlayerChannel <- p
		p.listen()
	}
}

func (s *server) newDefaultCustom(name string) *custom {
	return s.newCustom(name, 2, make([]string, 0, 0))
}

func (s *server) newCustom(name string, numPlayers int, options []string) *custom {
	c := &custom{
		name:             name,
		fields:           s.allFields[numPlayers],
		options:          options,
		numPlayers:       numPlayers,
		newPlayerChannel: make(chan *player),
	}
	if c.fields == nil {
		log.Printf("Custom %s: tried to create with %d players, but no maps so defaulting to 2.", c.name, c.numPlayers)
		c.fields = s.allFields[2]
		c.numPlayers = 2
	}
	c.spawnNewGame()
	return c
}

func (c *custom) spawnNewGame() {
	g := &game{
		players:      make([]*player, 0),
		ch:           make(chan *message, c.numPlayers),
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
