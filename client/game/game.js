(function() {
"use strict";

var TIME_STEP = 16;

/*
	Creates creates new Timeline
	Gives ui some basic information
 */
function Game(map, config, ui) {
	this.map = map;
	this.config = config;
	this.ui = ui;
	this.timeline = new Timeline(map);
	this.ui.registerInitialUnits(this.timeline.getCurrentState().units);
	this.timeBehind = 0;
}

/*
	Destructor for C++ stuff in timeline.logic.
 */
Game.prototype.destroy = function() {
	this.timeline.destroy();
};

/*
	Part of gameloop
	Inserts events into timeline and moves time forward.
 */
Game.prototype.step = function(deltatime, eventqueue) {
	while (eventqueue.length > 0) {
		this.timeline.insert(eventqueue.pop());
	}

	this.timeBehind += deltatime;
	while (this.timeBehind >= TIME_STEP) {
		this.timeBehind -= TIME_STEP;
		this.timeline.step();
	}
	var state = this.timeline.getCurrentState();
	var uiEvents = this.timeline.fetchUIEvents();
	this.ui.render(deltatime, state, uiEvents);
};

/*
	Get the next frame number
 */
Game.prototype.getNextFrame = function() {
	return this.timeline.getNextFrame();
};

/*
	Return living players
 */
Game.prototype.getRemainingPlayers = function() {
	return this.timeline.getCurrentState().getRemainingPlayers();
};

window.Game = Game;

})();
