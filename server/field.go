package server

import (
	"fmt"
	"image"
	"image/color"
	"log"
	"os"
	"path/filepath"

	_ "image/png"
)

type playfield struct {
	Tiles          [][]int
	Name           string
	unitsPerPlayer []int
}

const (
	FIRST_PLAYER_TILE = 100
)

var (
	COLOR_MAP = map[color.Color]int{
		color.RGBA{0, 0, 0, 255}:       0,
		color.RGBA{255, 255, 255, 255}: 1,
		color.RGBA{50, 0, 0, 255}:      100,
		color.RGBA{100, 0, 0, 255}:     101,
		color.RGBA{150, 0, 0, 255}:     102,
		color.RGBA{200, 0, 0, 255}:     103,
		color.RGBA{250, 0, 0, 255}:     104,
	}
)

var ()

func readFieldsFromFolder(folder string) map[int][]*playfield {
	fo, err := os.Open(folder)
	d(err)
	files, err := fo.Readdirnames(-1)
	d(err)

	ret := make(map[int][]*playfield)
	for _, file := range files {
		if file[0] != '.' {
			field := readFieldFromFile(folder, file)
			fields, exists := ret[len(field.unitsPerPlayer)]
			if !exists {
				ret[len(field.unitsPerPlayer)] = make([]*playfield, 0)
				fields = ret[len(field.unitsPerPlayer)]
			}
			ret[len(field.unitsPerPlayer)] = append(fields, field)
		}
	}

	logMessage := "Loaded maps numPlayers:count --"

	for players, fields := range ret {
		logMessage += fmt.Sprintf(" %d:%d", players, len(fields))
	}

	log.Print(logMessage)

	return ret
}

func readFieldFromFile(folder, file string) *playfield {
	fi, err := os.Open(filepath.Join(folder, file))
	d(err)
	defer fi.Close()

	img, _, err := image.Decode(fi)
	d(err)

	ret := make([][]int, img.Bounds().Size().Y, img.Bounds().Size().Y)
	tempslice := make([]int, 5, 5)
	nPlayers := 0

	for i := img.Bounds().Min.X; i < img.Bounds().Max.X; i++ {
		ret[i] = make([]int, img.Bounds().Size().X, img.Bounds().Size().X)
		for j := img.Bounds().Min.Y; j < img.Bounds().Max.Y; j++ {
			ret[i][j] = COLOR_MAP[color.RGBAModel.Convert(img.At(i, j))]
			playerId := ret[i][j] - FIRST_PLAYER_TILE
			if playerId > 0 {
				tempslice[playerId]++
			}
			if playerId >= nPlayers {
				nPlayers = playerId + 1
			}
		}
	}

	return &playfield{
		Name:           file,
		Tiles:          ret,
		unitsPerPlayer: tempslice[0:nPlayers],
	}
}

// Awesome error stuff
func d(err interface{}) {
	if err != nil {
		panic(err)
	}
}
