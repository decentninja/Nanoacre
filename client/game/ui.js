function Ui(canvas_context, config, loadData) {
	this.ctx = canvas_context
	this.config = config
	this.map = loadData.Field
	this.part_height = this.ctx.canvas.height / this.map.height
	this.part_width = this.ctx.canvas.width / this.map.width
}

Ui.prototype.render = function(deltatime, state) {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.strokeStyle = this.config.colors.bullet
	this.ctx.lineWidth = 3;
	for(var i = 0; i < state.bullets.length; i++) {
		var bullet = state.bullets[i]
		this.ctx.beginPath()
		var x = bullet.position.x * this.part_width / TILE_SIZE;
		var y = bullet.position.y * this.part_height / TILE_SIZE;
		this.ctx.moveTo(x, y)
		this.ctx.lineTo(
			x + 50*bullet.direction.x,
			y + 50*bullet.direction.y)
		this.ctx.stroke()
	}
	this.ctx.fillStyle = this.config.colors.map
	this.ctx.beginPath()
	for(var i = 0; i < this.map.Tiles.length; i++) {
		for(var j = 0; j < this.map.Tiles[0].length; j++) {
			if(this.map.Tiles[i][j] == 1) {
				this.ctx.rect(j*this.part_width, i*this.part_height, this.part_width, this.part_height)
			}
		}
	}
	this.ctx.fill();
	for(var i = 0; i < state.units.length; i++) {
		var unit = state.units[i]
		this.ctx.fillStyle = this.config.colors.teams[unit.owning_player]
		this.ctx.beginPath()
		var x = unit.position.x * this.part_width / TILE_SIZE;
		var y = unit.position.y * this.part_height / TILE_SIZE;
		this.ctx.arc(x, y, 10, 0, Math.PI*2, false)
		this.ctx.fill()
	}
}

Ui.prototype.handleMousedown = function(x, y, button, game) {
	var ev = {
		time: game.getNextFrame(),
		type: this.config.buttons[button],
		who: 0,
		towards: {
			x: (x * TILE_SIZE / this.part_width) | 0,
			y: (y * TILE_SIZE / this.part_height) | 0
		}
	}
	return ev
}
