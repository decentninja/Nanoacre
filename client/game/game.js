(function() {
"use strict";

var TIME_STEP = 16;

function Game(map, config, ui) {
	this.map = map;
	this.config = config;
	this.ui = ui;
	this.timeline = new Timeline(map);
	this.ui.registerInitialUnits(this.timeline.getCurrentState().units);
	this.timeBehind = 0;
}

Game.prototype.destroy = function() {
	this.timeline.destroy();
};

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

Game.prototype.getNextFrame = function() {
	return this.timeline.getNextFrame();
};

Game.prototype.getRemainingPlayers = function() {
	return this.timeline.getCurrentState().getRemainingPlayers();
};

window.Game = Game;

})();
