var TILE_SIZE = 1024;

;(function() {
"use strict";

var BULLET_SPEED = 200;
var SHOOTING_COOLDOWN = 0.5 * 60;

var PLAYER_SPEED = 100;
var PLAYER_RADIUS = 200;

var TEST_DIST = 100;

function moveOutFromWalls(map, pos) {
	function min2(a, b) {
		if (a * b < 0)
			return 0;
		return Math.min(a*a, b*b);
	}

	var ph = map.parts.length, pw = map.parts[0].length;
	var px = Math.floor(pos.x / TILE_SIZE), py = Math.floor(pos.y / TILE_SIZE);
	px = Math.min(Math.max(px, 0), pw-1);
	py = Math.min(Math.max(py, 0), ph-1);
	if (map.parts[py][px]) {
		var available = [];
		for (var i = 0; i < ph; ++i) {
			for (var j = 0; j < pw; ++j) {
				if (!map.parts[i][j]) {
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
	// XXX: We shouldn't center this...
	return {x: (px + 1/2) * TILE_SIZE, y: (py + 1/2) * TILE_SIZE};
}

// Check whether a position is free from wall collisions, in the most
// inefficient possible way.
function freespace(map, pos) {
	var ph = map.parts.length, pw = map.parts[0].length;
	for (var i = 0; i < ph; ++i) {
		for (var j = 0; j < pw; ++j) {
			if (map.parts[i][j]) {
				if (i * TILE_SIZE - PLAYER_RADIUS <= pos.y && (i + 1) * TILE_SIZE + PLAYER_RADIUS >= pos.y &&
					j * TILE_SIZE - PLAYER_RADIUS <= pos.x && (j + 1) * TILE_SIZE + PLAYER_RADIUS >= pos.x)
				{
					return false;
				}
			}
		}
	}
	return true;
}

function moveUnit(map, u) {
	var dirs = ['x', 'y'];
	if (!("wallmove" in u.position)) {
		var dist = 0;
		dirs.forEach(function(dir) {
			var d = (u.target[dir] - u.position[dir]);
			dist += d*d;
		});
		dist = Math.sqrt(dist);

		var npos = {}, done = (dist < PLAYER_SPEED);
		if (done) {
			if (dist === 0)
				return;
			if (freespace(map, u.target))
				u.position = u.target;
			else
				u.target = u.position;
			return;
		}
		dirs.forEach(function(dir) {
			var d = u.target[dir] - u.position[dir];
			npos[dir] = u.position[dir] + d / dist * PLAYER_SPEED;
		});
		// XXX: What about collisions with units? Just stop moving?
		if (freespace(map, npos)) {
			u.position = npos;
		}
		else {
			var rel = {};
			dirs.forEach(function(dir) {
				var d = u.target[dir] - u.position[dir];
				rel[dir] = (d > 0 ? 1 : -1);
			});

			npos = deepCopy(u.position);
			var dx = u.target.x - u.position.x;
			npos.x += dx / dist * PLAYER_SPEED;
			rel.dir = (freespace(map, npos) ? "x" : "y");
			u.position.wallmove = rel;
			console.log("Setting wallmove in " + rel.dir);
		}
	}

	if ("wallmove" in u.position) {
		var rel = u.position.wallmove;
		var testPos = {x: u.position.x, y: u.position.y};
		dirs.forEach(function(dir) {
			if (dir !== rel.dir)
				testPos[dir] += rel[dir] * TEST_DIST;
		});
		if (freespace(map, testPos)) {
			console.log("Unset wallmove");
			u.position = testPos;
		}
		else {
			var npos = deepCopy(u.position);
			npos[rel.dir] += rel[rel.dir] * PLAYER_SPEED;
			if (freespace(map, npos)) {
				u.position = npos;
			}
			else {
				console.log("Unable to move anywhere, resetting wallmove");
				delete u.position.wallmove;
				u.target = u.position;
			}
		}
	}
}

function step(map, state, events) {
	state = deepCopy(state);
	events.forEach(function(ev) {
		switch(ev.type) {
			case "move":
				state.units.forEach(function(u) {
					if (u.id === ev.who) {
						delete u.position.wallmove;
						u.target = moveOutFromWalls(map, ev.towards);
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
	state.bullets.forEach(function(b) {
		b.position.x += b.direction.x * BULLET_SPEED;
		b.position.y += b.direction.y * BULLET_SPEED;
	});
	state.units.forEach(moveUnit.bind(this, map));
	state.units.forEach(function(u) {
		if(u.shooting_cooldown) 
			--u.shooting_cooldown;
	});
	return state;
}

window.Logic = {
	step: step,
};
})();
