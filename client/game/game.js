function Game(map, config, ui) {
	this.map = map
	this.config = config
	this.ui = ui
}

Game.prototype.step = function(deltatime) {
	var samplestate = {	// sample state
		bullets: [
			{
				id: 0,
				owning_player: 0,
				current_position: {
					x: 100,
					y: 100,
				},
				direction: {
					x: 1,
					y: 1,
				}
			},
		],
		units: [
			{
				id: 0,
				owning_player: 0,
				current_position: {
					x: 100,
					y: 100
				},
				target_position: {
					x: 100,
					y: 100
				},
				shooting_cooldown: 0
			},
		],
	}
	
	this.ui.render(deltatime, samplestate)
}