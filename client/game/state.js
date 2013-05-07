function State(map) {
	this.nbullet = 0
	this.bullets = []
	this.nunits = 0
	this.units = []
	for(var i = 0; i < map.height; i++) {
		for(var j = 0; j < map.width; j++) {
			var possibleteam = map.Tiles[i][j] - 100;
			if (possibleteam >= 0) {
				var position = {
					x: (j + 1/2) * TILE_SIZE,
					y: (i + 1/2) * TILE_SIZE
				};
				this.units.push({
					id: this.nunits,
					owning_player: possibleteam,
					position: position,
					target: position,
					shooting_cooldown: 0,
					shots_fired: 0,
				})
				this.nunits++;
			}
		}
	}
}

State.prototype.getRemainingPlayers = function() {
	var players = []
	this.units.forEach(function(unit) {
		if(players.indexOf(unit.owning_player) == -1) {
			players.push(unit.owning_player)
		}
	})
	return players
}