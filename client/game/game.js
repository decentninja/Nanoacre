var TIME_STEP = 16;

function Game(map, config, ui) {
	this.map = map
	this.config = config
	this.ui = ui
	var samplestate = {
		nbullets: 1,
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
		nunits: 2,
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
					x: 300,
					y: 300
				},
				shooting_cooldown: 0
			},
		],
	}
	this.timeline = new Timeline(samplestate)
	this.timeBehind = 0
}

Game.prototype.step = function(deltatime, eventqueue) {
	while (eventqueue.length > 0) {
		this.timeline.insert(eventqueue.pop())
	}

	this.timeBehind += deltatime
	while (this.timeBehind >= TIME_STEP) {
		this.timeBehind -= TIME_STEP
		this.timeline.step()
	}
	this.ui.render(deltatime, this.timeline.getCurrentState())
}

Game.prototype.getNextFrame = function() {
	return this.timeline.getNextFrame();
}
