;(function() {
"use strict";

// Because of performance/memory concerns, we only keep the 512 previous states.
// This should be more than enough in practice (~10 seconds back).
var BUFFER_SIZE = 512;
var MASK = BUFFER_SIZE - 1;

function Timeline(map) {
	this.curTime = 0;
	this.map = map;
	this.logic = new Logic(map);
	this.events = [];
	this.states = new Array(BUFFER_SIZE);
	this.states[0] = this.logic.initialState();
}

/*
	Run logics C++ destructor
 */
Timeline.prototype.destroy = function() {
	this.logic.destroy();
};

/*
	Moves time forward one step
 */
Timeline.prototype.step = function() {
	this._progress(this.curTime);
	++this.curTime;
};

/*
	Simulates one step
 */
Timeline.prototype._progress = function(prevT) {
	var newState = this.logic.step(this.states[prevT & MASK], this.events[prevT + 1] || []);
	this.states[(prevT + 1) & MASK] = newState;
};

/*
	Inserts event into timeline
	Reruns simulation of steps after the event
 */
Timeline.prototype.insert = function(event) {
	var time = event.time;
	if (time <= 0) {
		throw new Error("Timeline tried to insert something before the initial state.");
	}

	if (this.curTime - time >= BUFFER_SIZE - 1) {
		throw new Error("Event was too long ago.");
	}

	if (this.events.length <= time)
		this.events.length = time;
	if (!this.events[time])
		this.events[time] = [];

	this.events[time].push(event);
	if (this.events[time].length > 1)
		this.events[time].sort(deepArbitraryCompare);

	if (time <= this.curTime) {
		for (var t = time; t <= this.curTime; ++t)
			this._progress(t-1);
	}
};

Timeline.prototype.getCurrentState = function() {
	return this.states[this.curTime & MASK];
};

/*
	Get current frame index
 */
Timeline.prototype.getNextFrame = function() {
	return this.curTime + 1;
};

window.Timeline = Timeline;

})();
