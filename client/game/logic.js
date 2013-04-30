var TILE_SIZE = 1024;
var PLAYER_RADIUS = 256;

var SHOOTING_COOLDOWN = 1 * 60;

;(function() {
"use strict";

var BULLET_SPEED = 175;

var PLAYER_SPEED = 50;

window.Logic = function(map) {
	this.map = map;
	this.setupPathfinding();
};

Logic.prototype.destroy = function() {
	this.clearPathfinding();
};

Logic.prototype.initialState = function() {
	var state = {
		nbullet: 0,
		bullets: [],
		nunits: 0,
		units: [],
	};
	for(var i = 0; i < this.map.height; i++) {
		for(var j = 0; j < this.map.width; j++) {
			var possibleteam = this.map.Tiles[i][j] - 100;
			if (possibleteam >= 0) {
				var position = {
					x: (j + 1/2) * TILE_SIZE,
					y: (i + 1/2) * TILE_SIZE
				};
				state.units.push({
					id: state.nunits,
					owning_player: possibleteam,
					position: position,
					target: position,
					shooting_cooldown: 0
				})
				state.nunits++;
			}
		}
	}
	return state;
}

Logic.prototype.moveOutFromWalls = function(pos) {
	pos = deepCopy(pos);
	function min2(a, b) {
		if (a * b < 0)
			return 0;
		return Math.min(a*a, b*b);
	}

	var map = this.map;
	var ph = map.Tiles.length, pw = map.Tiles[0].length;
	var opx = Math.floor(pos.x / TILE_SIZE), opy = Math.floor(pos.y / TILE_SIZE);
	opx = Math.min(Math.max(opx, 0), pw-1);
	opy = Math.min(Math.max(opy, 0), ph-1);
	var px = opx, py = opy;
	if (map.Tiles[py][px] == 1) {
		var available = [];
		for (var i = 0; i < ph; ++i) {
			for (var j = 0; j < pw; ++j) {
				if (map.Tiles[i][j] != 1) {
					var d2 = min2(pos.x - TILE_SIZE * j, pos.x - TILE_SIZE * (j+1)) +
						min2(pos.y - TILE_SIZE * i, pos.y - TILE_SIZE * (i+1));
					available.push([d2, i, j]);
				}
			}
		}
		available.sort(function(a, b) {
			return a[0] - b[0];
		});
		var best = available[0];
		py = best[1];
		px = best[2];
	}
	if (!py || map.Tiles[py-1][px] == 1) pos.y = Math.max(pos.y, py * TILE_SIZE + PLAYER_RADIUS);
	if (!px || map.Tiles[py][px-1] == 1) pos.x = Math.max(pos.x, px * TILE_SIZE + PLAYER_RADIUS);
	if (py+1 === ph || map.Tiles[py+1][px] == 1) pos.y = Math.min(pos.y, (py+1) * TILE_SIZE - PLAYER_RADIUS);
	if (px+1 === pw || map.Tiles[py][px+1] == 1) pos.x = Math.min(pos.x, (px+1) * TILE_SIZE - PLAYER_RADIUS);

	// The above handles 99% of all cases, but not corners. The logic for that
	// is awful, so just hack around it.
	if (!this.freespace(pos, PLAYER_RADIUS))
		pos = {x: (px+1/2) * TILE_SIZE, y: (py+1/2) * TILE_SIZE};

	return pos;
}

// Check whether a position is free from wall collisions, in the most
// inefficient possible way.
Logic.prototype.freespace = function(pos, radius) {
	var map = this.map;
	var ph = map.Tiles.length, pw = map.Tiles[0].length;
	for (var i = 0; i < ph; ++i) {
		for (var j = 0; j < pw; ++j) {
			if (map.Tiles[i][j] == 1) {
				if (i * TILE_SIZE - radius < pos.y && (i + 1) * TILE_SIZE + radius > pos.y &&
					j * TILE_SIZE - radius < pos.x && (j + 1) * TILE_SIZE + radius > pos.x)
				{
					return false;
				}
			}
		}
	}
	return true;
};

Logic.prototype.moveUnit = function(u) {
	var dirs = ['x', 'y'];
	if (!u.path)
		return;

	// TODO: We might want to do some collision testing here. Currently it works
	// because the path-finding always gives us perfect paths, but that might be
	// a bad thing to rely upon (and if we change it or add new types of
	// collisions it might become necessary).
	var target = u.path[0];
	var dist = 0;
	dirs.forEach(function(dir) {
		var d = (target[dir] - u.position[dir]);
		dist += d*d;
	});
	dist = Math.sqrt(dist);
	if (dist < PLAYER_SPEED) {
		u.position = target;
		u.path.shift();
		if (!u.path.length)
			delete u.path;
		return;
	}

	var npos = {};
	dirs.forEach(function(dir) {
		var d = target[dir] - u.position[dir];
		npos[dir] = u.position[dir] + d / dist * PLAYER_SPEED;
	});
	u.position = npos;
};

Logic.prototype.step = function(state, events) {
	var map = this.map, self = this;
	state = deepCopy(state);
	events.forEach(function(ev) {
		switch(ev.type) {
			case "move":
				state.units.forEach(function(u) {
					if (u.id === ev.who) {
						u.position = self.moveOutFromWalls(u.position);
						var target = self.moveOutFromWalls(ev.towards);
						u.path = self.pathfind(u.position, target);
					}
				});
				break;

			case "fire":
				var owning_player, pos, dir, x, y, l;
				state.units.forEach(function(u) {
					if (u.id === ev.who && u.shooting_cooldown == 0) {
						owning_player = u.owning_player;
						pos = deepCopy(u.position);
						u.shooting_cooldown = SHOOTING_COOLDOWN;
						x = ev.towards.x - pos.x;
						y = ev.towards.y - pos.y;
						l = Math.sqrt(x*x + y*y)
						state.nbullets++;
						state.bullets.push({
							id: state.nbullets,
							owning_player: owning_player,
							position: pos,
							direction: {
								x: x / l,
								y: y / l
							}
						});
					}
				});
				break;
		}
	});
	state.bullets = state.bullets.filter(function(b) {
		var die = false;
		b.position.x += b.direction.x * BULLET_SPEED;
		b.position.y += b.direction.y * BULLET_SPEED;
		state.units = state.units.filter(function(u) {
			var distance = Math.sqrt(Math.pow(b.position.x - u.position.x, 2) + Math.pow(b.position.y - u.position.y, 2))
			if((b.owning_player != u.owning_player) && distance <= PLAYER_RADIUS) {
				die = true;
				return false;
			} else {
				return true;
			}
		});
		if(b.position.x < 0 || b.position.x > map.width* TILE_SIZE || b.position.y < 0 || b.position.y > map.height*TILE_SIZE) {
			die = true;
		}
		if(!self.freespace(b.position, 0)) {
			die = true
		}
		return !die;
	});
	state.units.forEach(this.moveUnit.bind(this));
	state.units.forEach(function(u) {
		if(u.shooting_cooldown) 
			--u.shooting_cooldown;
	});
	return state;
}


// Path finding; talks to compiled code. Beware of dragons.

Logic.prototype.pathfindingComputePointsAndRects = function(points, rects) {
	var map = this.map;
	var ph = map.Tiles.length, pw = map.Tiles[0].length;
	for (var y = 0; y < ph; ++y) {
		for (var x = 0; x < pw; ++x) {
			if (map.Tiles[y][x] == 1) {
				// Always push a rect.
				var x1 = TILE_SIZE * x - PLAYER_RADIUS;
				var x2 = TILE_SIZE * (x + 1) + PLAYER_RADIUS;
				var y1 = TILE_SIZE * y - PLAYER_RADIUS;
				var y2 = TILE_SIZE * (y + 1) + PLAYER_RADIUS;
				rects.push([
					{x: x1, y: y1},
					{x: x2, y: y1},
					{x: x1, y: y2},
					{x: x2, y: y2}
				]);

				// And push points for all corners.
				for (var dx = -1; dx <= 1; dx += 2) {
					for (var dy = -1; dy <= 1; dy += 2) {
						var nx = x + dx, ny = y + dy;
						if (nx < 0 || ny < 0 || nx >= pw || ny >= ph)
							continue;
						if (map.Tiles[ny][nx] == 1 || map.Tiles[ny][x] == 1 || map.Tiles[y][nx] == 1)
							continue;
						var realx = (x + (dx+1)/2) * TILE_SIZE + dx * PLAYER_RADIUS;
						var realy = (y + (dy+1)/2) * TILE_SIZE + dy * PLAYER_RADIUS;
						points.push({x: realx, y: realy});
					}
				}
			}
		}
	}
};

function pushArrayToStack(obj) {
	var mem = Runtime.stackAlloc(obj.length * 4);
	for (var i = 0; i < obj.length; ++i)
		setValue(mem + i*4, obj[i], 'i32');
	return mem;
}

Logic.prototype.pathfind = function(from, to) {
	var startStack = Runtime.stackSave();
	try {
		var ptrOutLen = Runtime.stackAlloc(4);
		var ptrPtrOut = Runtime.stackAlloc(4);
		var ret = Module.ccall('pathfind',
			'number',
			['number', 'number', 'number', 'number', 'number', 'number', 'number'],
			[this.ptrMap, from.x, from.y, to.x, to.y, ptrOutLen, ptrPtrOut]);
		if (ret) {
			var len = getValue(ptrOutLen, 'i32');
			var ptrOut = getValue(ptrPtrOut, 'i32');
			var path = [];
			for (var i = 0, ind = 0; i < len; ++i) {
				path.push({
					x: getValue(ptrOut + 4 * (ind++), 'i32'),
					y: getValue(ptrOut + 4 * (ind++), 'i32')
				});
			}
			Module.ccall('free_path', 'number', ['number'], [ptrOut]);
			return path;
		}
		else {
			console.error("No path found", from, to);
		}
	}
	finally {
		Runtime.stackRestore(startStack);
	}
};

Logic.prototype.setupPathfinding = function() {
	var points = [], rects = [];
	this.pathfindingComputePointsAndRects(points, rects);

	var flatPoints = [], flatRects = [];
	points.forEach(function(p) {
		flatPoints.push(p.x);
		flatPoints.push(p.y);
	});
	rects.forEach(function(corners) {
		for (var i = 0; i < 4; ++i) {
			flatRects.push(corners[i].x);
			flatRects.push(corners[i].y);
		}
	});

	var startStack = Runtime.stackSave();
	var ptrPoints = pushArrayToStack(flatPoints);
	var ptrRects = pushArrayToStack(flatRects);
	var ptrMap = Module.ccall('setup_pathfinding',
		'number',
		['number', 'number', 'number', 'number'],
		[points.length, ptrPoints, rects.length, ptrRects]
	);
	Runtime.stackRestore(startStack);

	this.ptrMap = ptrMap;
};

Logic.prototype.clearPathfinding = function() {
	Module.ccall('clear_pathfinding',
		'number',
		['number'],
		[this.ptrMap]
	);
	this.ptrMap = null;
};

})();
