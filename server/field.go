package server

import (
	"bufio"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
)

type playfield struct {
	Tiles          [][]int
	unitsPerPlayer []int
}

const (
	firstPlayerTile = 100
)

func (p *playfield) calcUnitsPerPlayer() {
	tempslice := make([]int, 24)
	nPlayers := 0
	for _, row := range p.Tiles {
		for _, tile := range row {
			playerId := tile - firstPlayerTile
			if playerId > 0 {
				tempslice[playerId]++
			}
			if playerId > nPlayers {
				nPlayers = playerId
			}
		}
	}

	p.unitsPerPlayer = tempslice[:nPlayers]
}

func readFieldsFromFolder(folder string) []*playfield {
	fo, err := os.Open(folder)
	d(err)
	files, err := fo.Readdirnames(-1)
	d(err)
	mapfiles := make([]string, 1)
	for _, file := range files {
		if file[0] != '.' {
			println(file)
			mapfiles = append(mapfiles, file)
		}
	}

	ret := make([]*playfield, len(files))
	for i := range ret {
		ret[i] = readFieldFromFile(filepath.Join(folder, files[i]))
	}

	return ret
}

func readFieldFromFile(file string) *playfield {
	fi, err := os.Open(file)
	d(err)
	defer fi.Close()

	reader := bufio.NewReader(fi)
	tile := regexp.MustCompile(`(\d+)`)

	ret := make([][]int, 0, 256)

	var line string
	for err == nil {
		line, err = reader.ReadString('\n')

		match := tile.FindAllStringSubmatch(line, -1)
		row := make([]int, len(match))
		for i, m := range match {
			num, _ := strconv.Atoi(m[1])
			row[i] = num
		}
		ret = append(ret, row)
	}

	return &playfield{Tiles: ret}
}

func d(err interface{}) {
	if err != nil {
		panic(err)
	}
}
