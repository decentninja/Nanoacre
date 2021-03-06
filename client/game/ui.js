(function() {
"use strict";

var SELECTED_WIDTH = 3;

var BORDER_WIDTH_START = 13.0;
var BORDER_WIDTH_MID = 7.0;
var BORDER_BREAK_POINT = 0.1;
var BORDER_CHANGE_FACTOR = 0.75;

var COOLDOWN_RADIUS = 3;
var COOLDOWN_WIDTH = 6;

var DOT_DISTANCE = Math.PI/8;

var TILE_RENDER_SIZE = 40;
var UI_RENDER_FACTOR = TILE_RENDER_SIZE / TILE_SIZE;

var BULLET_LENGTH = 50;
var BULLET_WIDTH = UI_RENDER_FACTOR * BULLET_RADIUS;

var UNIT_EXPLOSION_PUSH_AWAY_FACTOR = 4;
var WALL_EXPLOSION_PUSH_AWAY_FACTOR = -1;
var WALL_EXPLOSION_DIRECTION_FACTOR = 0.1;

function Ui(canvas, config, loadData) {
	this.ctx = canvas.getContext("2d");
	this.config = config;
	this.map = loadData.Field;
	this.playerId = loadData.Id;

	this.deadUnits = [];
	this.ownedUnits = [];
	this.deadBullets = [];

	this.particlesystem = new Particlesystem(this.ctx);

	this.borderWidth = 0;
}

Ui.prototype.setupCanvas = function() {
	var canvas = this.ctx.canvas;
	canvas.width = this.map.width * TILE_RENDER_SIZE;
	canvas.height = this.map.height * TILE_RENDER_SIZE;
};

Ui.prototype.registerInitialUnits = function(units) {
	units.forEach(function(unit) {
		if (unit.owning_player === this.playerId) {
			this.ownedUnits.push(unit.id);
		}
	}, this);
	this.selection = this.ownedUnits[0];
};

Ui.prototype.render = function(deltatime, state, uiEvents) {
	var alsoDrawBullets = [];
	if (this.lastState) {
		if (this.triedToFireWith !== null) {
			for (var i = 0; i < this.lastState.units.length; i++) {
				var unit = this.lastState.units[i];
				if (unit.id === this.triedToFireWith) {
					if (!unit.canFire()) {
						this.setBorder(this.config.colors.bullet, true);
					}
					break;
				}
			}
			this.triedToFireWith = null;
		}
	}
	this.lastState = state;

	uiEvents.forEach(function(ev) {
		if (ev.type === "playerBulletCollision") {
			var unit = ev.unit, bullet = ev.bullet;
			this.deadBullets[bullet.id] = true;
			if (this.deadUnits[unit.id])
				return;
			this.deadUnits[unit.id] = unit;

			this.particlesystem.explosion(
				unit.position.x * UI_RENDER_FACTOR, 
				unit.position.y * UI_RENDER_FACTOR, 
				this.config.colors.teams[unit.owning_player],
				bullet.direction,
				UNIT_EXPLOSION_PUSH_AWAY_FACTOR
			);
		}
		else if (ev.type === "bulletOutOfBounds") {
			var bullet = ev.bullet;
			this.deadBullets[bullet.id] = true;
		}
		else if (ev.type === "wallBulletCollision") {
			var bullet = ev.bullet, w = ev.wall;
			if (this.deadBullets[bullet.id])
				return;
			this.deadBullets[bullet.id] = true;

			// Explode in the same direction as the bullet except reflected
			// against the wall. (This logic doesn't work for shooting against
			// concave corners, but whatever.)
			var dir = {
				x: WALL_EXPLOSION_DIRECTION_FACTOR * bullet.direction.x,
				y: WALL_EXPLOSION_DIRECTION_FACTOR * bullet.direction.y,
			};
			var T = this.map.Tiles;
			var bx = bullet.position.x, by = bullet.position.y;
			var dx = bullet.direction.x, dy = bullet.direction.y;
			var sx = 0, sy = 0, ex = this.map.width - 1, ey = this.map.height - 1;
			if (((w.x === sx || T[w.y][w.x - 1] !== 1) && dx > 0 && bx < TILE_SIZE * w.x + BULLET_SPEED) ||
			    ((w.x === ex || T[w.y][w.x + 1] !== 1) && dx < 0 && bx > TILE_SIZE * (w.x + 1) - BULLET_SPEED))
			{
				dir.x *= -1;
			}
			if (((w.y === sy || T[w.y - 1][w.x] !== 1) && dy > 0 && by < TILE_SIZE * w.y + BULLET_SPEED) ||
			    ((w.y === ey || T[w.y + 1][w.x] !== 1) && dy < 0 && by > TILE_SIZE * (w.y + 1) - BULLET_SPEED))
			{
				dir.y *= -1;
			}
			this.particlesystem.explosion(
				bullet.position.x * UI_RENDER_FACTOR,
				bullet.position.y * UI_RENDER_FACTOR,
				this.config.colors.wallExplosion,
				dir,
				WALL_EXPLOSION_PUSH_AWAY_FACTOR
			);

			// Add a continuation of the bullet to the list to be drawn, so that
			// it looks like it totally hits the wall.
			alsoDrawBullets.push(bullet);
		}
	}, this);

	state.units.forEach(function(u) {
		this.deadUnits[u.id] = null;
	}, this);
	state.bullets.forEach(function(b) {
		this.deadBullets[b.id] = false;
	}, this);


	// Clear
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

	// Deadlings
	this.deadUnits.forEach(function(maybeUnit) {
		if (maybeUnit)
			this.renderUnit(maybeUnit, false);
	}, this);

	// Units
	for (var i = 0; i < state.units.length; i++) {
		this.renderUnit(state.units[i], true);
	}

	// Bullets
	this.renderBullets(state.bullets.concat(alsoDrawBullets));

	// Particles
	this.particlesystem.update(deltatime);
	this.particlesystem.render();

	// Shadows
	var ownedUnits = state.units.filter(function(unit) {
		return (unit.owning_player === this.playerId);
	}, this);
	var nonOwnedUnits = state.units.filter(function(unit) {
		return (unit.owning_player !== this.playerId);
	}, this)
	this.renderShadows(ownedUnits, nonOwnedUnits);

	// Map
	this.ctx.fillStyle = this.config.colors.map;
	this.ctx.beginPath();
	for (var i = 0; i < this.map.height; i++) {
		for (var j = 0; j < this.map.width; j++) {
			if (this.map.Tiles[i][j] === 1) {
				this.ctx.rect(j*TILE_RENDER_SIZE, i*TILE_RENDER_SIZE, TILE_RENDER_SIZE, TILE_RENDER_SIZE);
			}
		}
	}
	this.ctx.fill();

	// Animated border
	this.updateBorder(deltatime);

	// Shooting on cooldown feedback
	for (var i = 0; i < state.units.length; i++) {
		if (this.selection === state.units[i].id) {
			if (!state.units[i].canFire()) {
				this.setBorder(this.config.colors.bullet, false);
			} else {
				this.clearBorder(this.config.colors.bullet);
			}
		}
	}
	//this.drawBorder();
};

Ui.prototype.renderUnit = function(unit, alive) {
	var x = unit.position.x * UI_RENDER_FACTOR;
	var y = unit.position.y * UI_RENDER_FACTOR;
	var isSelected = (this.selection === unit.id);
	if (alive) {
		this.ctx.fillStyle = this.config.colors.teams[unit.owning_player];
	} else {
		this.ctx.fillStyle = this.config.colors.dead;
	}

	var idWhenSelected = this.ownedUnits.indexOf(unit.id);
	if (idWhenSelected === -1) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, PLAYER_RADIUS * UI_RENDER_FACTOR, 0, Math.PI*2, false);
	} else {
		this.drawDots(x, y, idWhenSelected + 1, PLAYER_RADIUS * UI_RENDER_FACTOR * 1.4, 2);
		this.ctx.beginPath();
		this.ctx.arc(x, y, PLAYER_RADIUS * UI_RENDER_FACTOR, 0, Math.PI*2, false);
	}
	this.ctx.fill();

	if (isSelected) {
		this.ctx.lineWidth = SELECTED_WIDTH;
		this.ctx.strokeStyle = this.config.colors.selected;
		this.ctx.stroke();
	}
	
	if (alive && unit.shooting_cooldown !== 0) {
		this.ctx.beginPath();
		this.ctx.lineWidth = COOLDOWN_WIDTH;
		this.ctx.strokeStyle = this.config.colors.cooldown;
		this.ctx.arc(x, y, COOLDOWN_RADIUS, -Math.PI/2, (unit.shooting_cooldown/SHOOTING_COOLDOWN)*Math.PI*2 - Math.PI/2 + 0.2, false);
		this.ctx.stroke();
	}
};

/*
   Draw an array of bullets to the canvas
 */
Ui.prototype.renderBullets = function(bullets) {
	this.ctx.strokeStyle = this.config.colors.bullet;
	this.ctx.lineWidth = BULLET_WIDTH;
	bullets.forEach(function(bullet) {
		this.ctx.beginPath();
		var x = bullet.position.x * UI_RENDER_FACTOR;
		var y = bullet.position.y * UI_RENDER_FACTOR;
		this.ctx.moveTo(x, y);
		var preX, preY;
		if (dist2(bullet.position, bullet.startPosition) < sq(BULLET_LENGTH / UI_RENDER_FACTOR)) {
			preX = bullet.startPosition.x * UI_RENDER_FACTOR;
			preY = bullet.startPosition.y * UI_RENDER_FACTOR;
		}
		else {
			preX = x - BULLET_LENGTH * bullet.direction.x,
			preY = y - BULLET_LENGTH * bullet.direction.y;
		}
		this.ctx.lineTo(preX, preY);
		this.ctx.stroke();
	}, this);
};

/*
	Part of renderUnit
 */
Ui.prototype.drawDots = function(x, y, n, radiusFromPlayer, dotRadius) {
	for (var i = 0; i < n; i++) {
		var angle = -Math.PI/2 - (n - 1 - i*2)*DOT_DISTANCE/2;
		this.ctx.beginPath();
		this.ctx.arc(x + radiusFromPlayer * Math.cos(angle),
		             y + radiusFromPlayer * Math.sin(angle),
		             dotRadius, 0, Math.PI*2, false);
		this.ctx.fill();
	}
};

Ui.prototype.renderShadows = function(units, shadingUnits) {
	// When dead, show everything.
	if (!units.length)
		return;

	this.ctx.save();
	for (var i = 0; i < units.length; ++i) {
		this.clipShadowsForUnit(units[i], shadingUnits);
	}
	this.ctx.fillStyle = this.config.colors.shadow;
	this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.restore();
};

Ui.prototype.blocksLOS = function(y, x) {
	if (y < 0 || y >= this.map.Tiles.length ||
		x < 0 || x >= this.map.Tiles[0].length) {
		return true;
	}
	return (this.map.Tiles[y][x] === 1);
};

Ui.prototype.clipShadowsForUnit = function(unit, shadingUnits) {
	var unitpos = {
		x: unit.position.x * UI_RENDER_FACTOR,
		y: unit.position.y * UI_RENDER_FACTOR
	};
	var sz = TILE_RENDER_SIZE;
	this.ctx.beginPath();
	for (var y = 0; y < this.map.Tiles.length; y++) {
		for (var x = 0; x < this.map.Tiles[0].length; x++) {
			var mx = x * sz;
			var my = y * sz;
			if (this.map.Tiles[y][x] === 1) {
				var points = [];
				var horiBlocks = [this.blocksLOS(y, x-1), this.blocksLOS(y, x+1)];
				var vertBlocks = [this.blocksLOS(y-1, x), this.blocksLOS(y+1, x)];

				for (var i = 0; i < 2; ++i) {
					for (var j = 0; j < 2; ++j) {
						var onOtherSide = {
							vert: (j === 0 && unitpos.y > my + sz) || (j === 1 && unitpos.y < my),
							hori: (i === 0 && unitpos.x > mx + sz) || (i === 1 && unitpos.x < mx),
						};
						if (onOtherSide.vert && onOtherSide.hori) continue;
						if (horiBlocks[i]) { //TODO: hide corners that are hidden but not inside a wall
							if (onOtherSide.vert) continue;
						}
						if (vertBlocks[j]) {
							if (onOtherSide.hori) continue;
						}
						points.push({x: mx + i*sz, y: my + j*sz});
					}
				}
				if (points.length < 2) continue;

				var bestangle = 0, besti = 0, bestj = 1;
				if (points.length > 2) {
					var angles = points.map(function(p) {
						return Math.atan2(p.y - unitpos.y, p.x - unitpos.x);
					});
					for (var i = 0; i < points.length; ++i) {
						for (var j = i+1; j < points.length; ++j) {
							var d = angles[i] - angles[j];
							if (d < 0) d = -d;
							d %= 2*Math.PI;
							if (d >= Math.PI) d = 2*Math.PI - d;
							if (d > bestangle) {
								bestangle = d;
								besti = i;
								bestj = j;
							}
						}
					}
				}

				this.pathShadowForUnit(unitpos, points[besti], points[bestj]);
			}
		}
	}

	shadingUnits.forEach(function(shadingUnit) {
		var shadepos = {
			x: shadingUnit.position.x * UI_RENDER_FACTOR,
			y: shadingUnit.position.y * UI_RENDER_FACTOR
		};
		var vec = {x: unitpos.y - shadepos.y, y: shadepos.x - unitpos.x};
		var len = Math.sqrt(sq(vec.x) + sq(vec.y));
		vec = {x: vec.x / len * PLAYER_RADIUS * UI_RENDER_FACTOR, y: vec.y / len * PLAYER_RADIUS * UI_RENDER_FACTOR};
		var a = {x: shadepos.x + vec.x, y: shadepos.y + vec.y};
		var b = {x: shadepos.x - vec.x, y: shadepos.y - vec.y};
		this.pathShadowForUnit(unitpos, a, b, shadepos);
	}, this);

	this.ctx.moveTo(0, 0);

	this.ctx.clip();
};

Ui.prototype.pathShadowForUnit = function(base, a, b, arcCenter) {
	if (dist2(base, a) < 1e-5 || dist2(base, b) < 1e-5)
		return;

	var ctx = this.ctx;
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;

	function side(point) {
		if (point.y === height) return 0;
		if (point.x === width) return 1;
		if (point.y === 0) return 2;
		if (point.x === 0) return 3;
		return 0; // this can't happen, but cope with it if it does
	}
	function project(from, against) {
		var scale = Infinity;
		if (against.x > from.x + 1e-5)
			scale = Math.min(scale, (width - from.x) / (against.x - from.x));
		if (against.x < from.x - 1e-5)
			scale = Math.min(scale, (from.x - 0) / (from.x - against.x));
		if (against.y > from.y + 1e-5)
			scale = Math.min(scale, (height - from.y) / (against.y - from.y));
		if (against.y < from.y - 1e-5)
			scale = Math.min(scale, (from.y - 0) / (from.y - against.y));
		// N.B.: We use Math.floor(x + 0.5) instead of Math.round(x) here, to
		// work around a Firefox JIT bug (870356).
		return {
			x: Math.floor(from.x + (against.x - from.x) * scale + 0.5),
			y: Math.floor(from.y + (against.y - from.y) * scale + 0.5)
		};
	}

	// Orientation bleh
	var a2 = {
		x: (a.x - base.x) * 2 + base.x,
		y: (a.y - base.y) * 2 + base.y,
	};
	var b2 = {
		x: (b.x - base.x) * 2 + base.x,
		y: (b.y - base.y) * 2 + base.y,
	};
	if ((b2.x-a2.x)*(b2.y+a2.y) +
		(b.x -b2.x)*(b.y +b2.y) +
		(a.x - b.x)*(a.y + b.y) +
		(a2.x- a.x)*(a2.y+ a.y) < 0)
	{
		var temp = b; b = a; a = temp;
	}

	a2 = project(base, a);
	b2 = project(base, b);
	var as = side(a2), bs = side(b2);

	ctx.moveTo(a2.x, a2.y);
	while (as !== bs) {
		var mid;
		if (as === 0) mid = {x: width, y: height};
		if (as === 1) mid = {x: width, y: 0};
		if (as === 2) mid = {x: 0, y: 0};
		if (as === 3) mid = {x: 0, y: height};
		ctx.lineTo(mid.x, mid.y);
		as = (as + 1) % 4;
	}

	ctx.lineTo(b2.x, b2.y);
	ctx.lineTo(b.x, b.y);
	if (arcCenter) {
		var angle = Math.atan2(arcCenter.y - a.y, arcCenter.x - a.x);
		ctx.arc(arcCenter.x, arcCenter.y, PLAYER_RADIUS * UI_RENDER_FACTOR, angle, angle + Math.PI, false);
	} else {
		ctx.lineTo(a.x, a.y);
	}
};

Ui.prototype.setBorder = function(borderStyle, force) {
	if (force || this.borderStyle !== borderStyle || this.borderWidth < BORDER_WIDTH_MID) {
		this.borderStyle = borderStyle;
		/*if (this.targetBorderWidth === BORDER_WIDTH_MID && Math.abs(this.borderWidth - this.targetBorderWidth) < BORDER_BREAK_POINT) {
			this.targetBorderWidth = BORDER_WIDTH_MID;
			this.borderWidth = BORDER_WIDTH_START;
		} else {*/
			this.targetBorderWidth = BORDER_WIDTH_START;
		//}
	}
};

Ui.prototype.clearBorder = function(borderStyle) {
	if (this.borderStyle === borderStyle)
		this.targetBorderWidth = 0;
};

Ui.prototype.updateBorder = function(deltatime) {
	if (this.borderStyle) {
		if (Math.abs(this.targetBorderWidth - this.borderWidth) < BORDER_BREAK_POINT)
			this.borderWidth = this.targetBorderWidth;

		if (this.targetBorderWidth === BORDER_WIDTH_START && this.targetBorderWidth === this.borderWidth)
			this.targetBorderWidth = BORDER_WIDTH_MID;

		if (this.targetBorderWidth === 0 && this.borderWidth === 0) {
			this.borderStyle = null;
			return;
		}
		this.borderWidth += BORDER_CHANGE_FACTOR * (this.targetBorderWidth - this.borderWidth);
	}
};

Ui.prototype.drawBorder = function() {
	if (this.borderStyle) {
		this.ctx.lineWidth = this.borderWidth;
		this.ctx.strokeStyle = this.borderStyle;
		this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
};

Ui.prototype.handleMousedown = function(x, y, button, nextFrame) {
	var type = this.config.buttons[button];
	if (type === "fire")
		this.triedToFireWith = this.selection;
	return {
		time: nextFrame,
		type: type,
		who: this.selection,
		towards: {
			x: (x / UI_RENDER_FACTOR) | 0,
			y: (y / UI_RENDER_FACTOR) | 0
		}
	};
};

Ui.prototype.handleKeyDown = function(keycode, nextFrame) {
	if (keycode >= 49 && keycode <= 57) { //1-9
		var index = keycode - 49;
		if (index < this.ownedUnits.length)
			this.selection = this.ownedUnits[index];
	}
	return null;
};

window.Ui = Ui;

})();
