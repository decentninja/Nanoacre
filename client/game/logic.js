;(function() {
"use strict";

var BULLET_SPEED = 10;
var SHOOTING_COOLDOWN = 3;

function step(state, events) {
	state = deepCopy(state);
	events.forEach(function(ev) {
		switch(ev.type) {
			case "move":
				state.units.forEach(function(u) {
					if (u.id === ev.who)
						u.target = ev.towards;
				});
				break;

			case "fire":
				var owning_player, pos, dir, x, y, l;
				state.units.forEach(function(u) {
					if (u.id === ev.who && u.shooting_cooldown == 0) {
						owning_player = u.owning_player;
						pos = u.position;
						// u.shooting_cooldown = SHOOTING_COOLDOWN;
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
	state.units.forEach(function(u) {
		var dirs = ['x', 'y'], d2 = 0, threshold = 6 * 6, mult = 1, exp = 0.025;
		dirs.forEach(function(dir) {
			var d = (u.target[dir] - u.position[dir]);
			d2 += d*d;
		});
		var d2e = d2 * exp * exp;
		if (d2e < threshold) {
			if (d2 <= threshold) {
				u.position = u.target;
				return;
			}
			mult = Math.sqrt(threshold / d2e);
		}
		dirs.forEach(function(dir) {
			var d = (u.target[dir] - u.position[dir]) * exp;
			u.position[dir] += d * mult;
		});
	});
	return state;
}

window.Logic = {
	step: step,
};
})();
