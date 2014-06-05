Nanoacre
========

Nanoacre is a fast multiplayer strategy game written in javascript and golang. Try it out at: [nanoacre.sootn.se](http://nanoacre.sootn.se), you will need a friend and both of you need to press the random game button. If more players want to join in, create a custom lobby, enter the amount of players and share the link browser link between the players. GLHF

There are a bug in Firefox when you press the rematch button... We know.

## History
The game originated as a school project at KTH, the Swedish Royal Institute of Technology (a University) and has taken of from there. 

## Mapmaking
Maps are images using a specialized palette (supplied in the .gpl or .pxpalette files).
Every pixel is a tile, black is empty, white is a wall and the different reds are different
players. The darkest red is player 1, then it goes up from there. 

## Development Setup
  install [golang](http://golang.org/)
  clone
  cd nanoacre
  go run main.go
  open browser localhost:9000
