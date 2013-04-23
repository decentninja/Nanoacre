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
				position: {
					x: 110,
					y: 110,
				},
				direction: {
					x: 0.707106781,
					y: 0.707106781,
				}
			},
		],
		units: [
			{
				id: 0,
				owning_player: 0,
				position: {
					x: 100,
					y: 100
				},
				target: {
					x: 100,
					y: 100
				},
				shooting_cooldown: 0
			},
			{
				id: 1,
				owning_player: 1,
				position: {
					x: 200,
					y: 200
				},
				target: {
					x: 100,
					y: 100
				},
				shooting_cooldown: 0
			},
		],
	}
	
	this.ui.render(deltatime, samplestate)
}