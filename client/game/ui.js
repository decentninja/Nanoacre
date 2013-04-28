var BULLET_LENGTH = 50;
var PLAYER_SIZE = 10;

var TILE_RENDER_SIZE = 40;
var UI_RENDER_FACTOR = TILE_RENDER_SIZE / TILE_SIZE;

function Ui(canvas_context, config, loadData) {
	this.ctx = canvas_context
	this.config = config
	this.map = loadData.Field
}

Ui.prototype.render = function(deltatime, state) {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.strokeStyle = this.config.colors.bullet
	this.ctx.lineWidth = 3;
	for(var i = 0; i < state.bullets.length; i++) {
		var bullet = state.bullets[i]
		this.ctx.beginPath()
		var x = bullet.position.x * UI_RENDER_FACTOR;
		var y = bullet.position.y * UI_RENDER_FACTOR;
		this.ctx.moveTo(x, y)
		this.ctx.lineTo(
			x + BULLET_LENGTH * bullet.direction.x,
			y + BULLET_LENGTH * bullet.direction.y)
		this.ctx.stroke()
	}
	this.ctx.fillStyle = this.config.colors.map
	this.ctx.beginPath()
	for(var i = 0; i < this.map.Tiles.length; i++) {
		for(var j = 0; j < this.map.Tiles[0].length; j++) {
			if(this.map.Tiles[i][j] == 1) {
				this.ctx.rect(j*TILE_RENDER_SIZE, i*TILE_RENDER_SIZE, TILE_RENDER_SIZE, TILE_RENDER_SIZE)
			}
		}
	}
	this.ctx.fill();
	for(var i = 0; i < state.units.length; i++) {
		var unit = state.units[i]
		this.ctx.fillStyle = this.config.colors.teams[unit.owning_player]
		this.ctx.beginPath()
		var x = unit.position.x * UI_RENDER_FACTOR;
		var y = unit.position.y * UI_RENDER_FACTOR;
		this.ctx.arc(x, y, PLAYER_RADIUS * UI_RENDER_FACTOR, 0, Math.PI*2, false)
		this.ctx.fill()
	}
}

Ui.prototype.handleMousedown = function(x, y, button, game) {
	var ev = {
		time: game.getNextFrame(),
		type: this.config.buttons[button],
		who: 0,
		towards: {
			x: (x / UI_RENDER_FACTOR) | 0,
			y: (y / UI_RENDER_FACTOR) | 0
		}
	}
	return ev
}
