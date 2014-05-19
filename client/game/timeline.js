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
	this.uiEvents = [];
	this.states = new Array(BUFFER_SIZE);
	this.states[0] = this.logic.initialState();
}

Timeline.prototype.destroy = function() {
	this.logic.destroy();
};

Timeline.prototype.step = function() {
	this._progress(this.curTime);
	this.curTime++;
};

Timeline.prototype._progress = function(prevT) {
	var addUIEvent = function(ev) {
		ev.time = prevT + 1;
		this.uiEvents.push(ev);
	}.bind(this);
	this.states[(prevT + 1) & MASK] = this.logic.step(
		this.states[prevT & MASK],
		this.events[prevT + 1] || [],
		addUIEvent);
};

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

	while (this.uiEvents.length > 0 &&
			this.uiEvents[this.uiEvents.length-1].time >= time) {
		this.uiEvents.pop();
	}

	if (time <= this.curTime) {
		for (var t = time; t <= this.curTime; ++t)
			this._progress(t-1);
	}
};

/*
   Get and clear the current queue of UI events. Note that due to rewinds,
   events will often occur several times.
 */
Timeline.prototype.fetchUIEvents = function() {
	var ret = this.uiEvents;
	if (debug) {
		// Duplicated events should be no-ops, so in debug mode we force that
		// to happen to make breakage more obvious.
		ret = ret.concat(ret);
	}
	this.uiEvents = [];
	return ret;
};

/*
   Get current state
 */
Timeline.prototype.getCurrentState = function() {
	return this.states[this.curTime & MASK];
};

Timeline.prototype.getNextFrame = function() {
	return this.curTime + 1;
};

window.Timeline = Timeline;

})();
