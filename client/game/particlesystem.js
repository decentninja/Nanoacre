(function() {
"use strict";

var MAX_COUNT = 5000;
var DRAFT = 0.96;

function Particle(x, y, dx, dy, style, burntime) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.burntime = burntime;
	this.timeleft = burntime;
	this.style = style;
}

/*
	Moves particle
 */
Particle.prototype.update = function(deltatime) {
	this.timeleft -= deltatime;
	this.x += this.dx;
	this.y += this.dy;
	this.dx *= DRAFT;
	this.dy *= DRAFT;
};

/*
	Renders particle
 */
Particle.prototype.render = function(ctx) {
	ctx.fillStyle = this.style;
	ctx.globalAlpha = Math.abs(this.timeleft / this.burntime);
	ctx.fillRect(this.x, this.y, 1, 1);
};


function Particlesystem(ctx) {
	this.ctx = ctx;

	this.particles = []; // May need one array for each fillstyle, time bla
}

/*
	Updates particles
	Removes old particles
 */
Particlesystem.prototype.update = function(deltatime) {
	this.particles = this.particles.filter(function(particle) {
		if(particle.timeleft < 0) {
			return false;  // kill
		}
		particle.update(deltatime);
		return true;
	});
};

/*
	Renders all particles
	Resets alpha value
 */
Particlesystem.prototype.render = function() {
	var ctx = this.ctx;
	this.particles.forEach(function(particle) {
		particle.render(ctx);
	});
	ctx.globalAlpha = 1;
};

/*
	Creates a particle
	Limits particle count
 */
Particlesystem.prototype.add = function(x, y, dx, dy, style, burntime) {
	this.particles.push(new Particle(x, y, dx, dy, style, burntime));
	while (this.particles.length > MAX_COUNT) {
		this.particles.shift();
	}
};

/*
	Creates explotion
 */
Particlesystem.prototype.explosion = function(x, y, style, away, pushAwayFactor) {
	for (var i = 0; i < 100; i++) {
		var dir = randvector(randrange(0, 3));
		dir.x += away.x * pushAwayFactor;
		dir.y += away.y * pushAwayFactor;
		this.add(x, y, dir.x, dir.y, style, 500);
	}
};

window.Particlesystem = Particlesystem;

})();
