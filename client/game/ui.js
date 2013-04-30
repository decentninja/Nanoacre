var BULLET_LENGTH = 50;
var BULLET_WIDTH = 3;
var PLAYER_SIZE = 10;
var SELECTED_WIDTH = 3;

var TILE_RENDER_SIZE = 40;
var UI_RENDER_FACTOR = TILE_RENDER_SIZE / TILE_SIZE;

function Ui(canvas_context, config, loadData) {
	this.ctx = canvas_context
	this.config = config
	this.map = loadData.Field

	this.playerId = loadData.Id
	this.selection = []
	this.ownedUnits = []
	this.shiftDown = false
}

Ui.prototype.registerInitialUnits = function(units) {
	units.forEach(function(unit) {
		if (unit.owning_player == this.playerId) {
			this.ownedUnits.push(unit.id)
		}
	}, this)
	this.selection = [this.ownedUnits[0]]
}

Ui.prototype.render = function(deltatime, state) {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.strokeStyle = this.config.colors.bullet
	this.ctx.lineWidth = BULLET_WIDTH;
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
		if (this.selection.indexOf(unit.id) != -1) {
			this.ctx.lineWidth = SELECTED_WIDTH
			this.ctx.strokeStyle = this.config.colors.selected
			this.ctx.stroke()
		}
	}
}

Ui.prototype.handleMousedown = function(x, y, button, nextFrame) {
	var type = this.config.buttons[button]
	return this.selection.map(function(unitId, index, selection) {
		return {
			time: nextFrame,
			type: type,
			who: unitId,
			towards: {
				x: (x / UI_RENDER_FACTOR) | 0, //TODO: offset if several units are selected
				y: (y / UI_RENDER_FACTOR) | 0
			}
		}
	})
}

Ui.prototype.handleKeyDown = function(keycode, nextFrame) {
	if (keycode >= 49 && keycode <= 57) { //1-9
		var index = keycode - 49
		if (this.ownedUnits.length > index) {
			var unitId = this.ownedUnits[index]
			if (this.shiftDown) {
				this.toggleUnitSelection(unitId)
			} else {
				this.selection = [this.ownedUnits[index]]
			}
		}
	} else if (keycode == 16) { //shift
		this.shiftDown = true
	}

	return null
}

Ui.prototype.toggleUnitSelection = function(unitId) { //TODO: This should probably be a bit more intelligent, say only remove units when more than one unit is selected
	var index = this.selection.indexOf(unitId)
	if (index == -1) {
		this.selection.push(unitId)
	} else {
		this.selection.splice(index, 1)
	}
}

Ui.prototype.handleKeyUp = function(keycode, nextFrame) {
	if (keycode == 16) {
		this.shiftDown = false
	}
}
