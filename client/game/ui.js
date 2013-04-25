function Ui(canvas_context, config, map) {
	this.ctx = canvas_context
	this.config = config
	this.map = map
	this.part_height = this.ctx.canvas.height / this.map.parts.length
	this.part_width = this.ctx.canvas.width / this.map.parts[0].length
}

Ui.prototype.render = function(deltatime, state) {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.strokeStyle = this.config.colors.bullet
	this.ctx.lineWidth = 3;
	for(var i = 0; i < state.bullets.length; i++) {
		var bullet = state.bullets[i]
		this.ctx.beginPath()
		this.ctx.moveTo(bullet.position.x, bullet.position.y)
		this.ctx.lineTo(
			bullet.position.x + 50*bullet.direction.x, 
			bullet.position.y + 50*bullet.direction.y)
		this.ctx.stroke()
	}
	this.ctx.fillStyle = this.config.colors.map
	this.ctx.beginPath()
	for(var i = 0; i < this.map.parts.length; i++) {
		for(var j = 0; j < this.map.parts[0].length; j++) {
			if(this.map.parts[i][j] == 1) {
				this.ctx.rect(j*this.part_width, i*this.part_height, this.part_width, this.part_height)
			}
		}
	}
	this.ctx.fill();
	for(var i = 0; i < state.units.length; i++) {
		var unit = state.units[i]
		this.ctx.fillStyle = this.config.colors.teams[unit.owning_player]
		this.ctx.beginPath()
		this.ctx.arc(unit.position.x, unit.position.y, 10, 0, Math.PI*2, false)
		this.ctx.fill()
	}
}

Ui.prototype.handleMousedown = function(x, y, button, game) {
	var ev = {
		time: game.getNextFrame(),
		type: this.config.buttons[button],
		who: 0,
		towards: {
			x: x,
			y: y
		}
	}
	return ev
}
