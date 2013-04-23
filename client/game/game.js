function Game(map, config, ui) {
	this.map = map
	this.config = config
	this.ui = ui
}

Game.prototype.step = function(deltatime) {
	ui.render(deltatime, {/* state */})
}