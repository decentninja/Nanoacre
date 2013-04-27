package server

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
	//TODO: actual implementation
	return []*playfield{
		&playfield{
			Tiles: [][]int{
				[]int{0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
				[]int{0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
				[]int{0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
				[]int{0, 100, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 101, 0},
				[]int{0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
				[]int{0, 100, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 101, 0},
				[]int{0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
				[]int{0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
				[]int{0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
				[]int{0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
			},
			unitsPerPlayer: []int{2, 2},
		},
	}
}
