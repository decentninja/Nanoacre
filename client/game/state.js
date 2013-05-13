function State(map) {
	this.nbullets = 0
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
				this.units.push(new Unit(this.nunits, possibleteam, position))
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

function Unit(id, team, position) {
	this.id = id
	this.owning_player = team
	this.position = position
	this.shooting_cooldown = 0
	this.reload_cooldown = 0
}

Unit.prototype.canFire = function() {
	return this.shooting_cooldown <= (MAX_SHOTS -1) * SHOOTING_COOLDOWN / MAX_SHOTS
	       && (this.reload_cooldown || !this.shooting_cooldown)
}