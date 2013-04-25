function Ui(canvas_context, config, map) {
	this.ctx = canvas_context
	this.config = config
	this.map = map
}

Ui.prototype.render = function(deltatime, state) {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	for(var i = 0; i < state.units.length; i++) {
		var unit = state.units[i]
		this.ctx.fillStyle = this.config.colors.teams[unit.owning_player]
		this.ctx.beginPath();
		this.ctx.arc(unit.position.x, unit.position.y, 10, 0, Math.PI*2, false)
		this.ctx.fill();
	}
}

Ui.prototype.handleMousedown = function(x, y, button, game) {
	var type
	switch(button) {
		case 0:
			type = "fire"
			break
		case 2:
			type = "move"
			break
	}
	var ev = {
		time: game.getNextFrame(),
		type: type,
		who: 0,
		towards: {
			x: x,
			y: y
		}
	}
	return ev
}
