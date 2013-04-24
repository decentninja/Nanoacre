;(function() {
"use strict";

var BULLET_SPEED = 10;

function step(state, events) {
	state = deepCopy(state);
	events.forEach(function(ev) {
		if (ev.type === "move") {
			state.units.forEach(function(u) {
				if (u.id === ev.who)
					u.target = ev.towards;
			});
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
