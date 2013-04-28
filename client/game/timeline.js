;(function() {
"use strict";

// Because of performance/memory concerns, we only keep the 512 previous states.
// This should be more than enough in practice (~10 seconds back).
var BUFFER_SIZE = 512;
var MASK = BUFFER_SIZE - 1;

window.Timeline = function(map, initialState) {
	this.curTime = 0;
	this.map = map;
	this.logic = new Logic(map);
	this.events = [];
	this.states = new Array(BUFFER_SIZE);
	this.states[0] = initialState;
};

Timeline.prototype.destroy = function() {
	this.logic.destroy();
};

Timeline.prototype.step = function() {
	this._progress(this.curTime);
	++this.curTime;
};

Timeline.prototype._progress = function(prevT) {
	var newState = this.logic.step(this.states[prevT & MASK], this.events[prevT + 1] || []);
	this.states[(prevT + 1) & MASK] = newState;
}

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
}

Timeline.prototype.getCurrentState = function() {
	return this.states[this.curTime & MASK];
};

Timeline.prototype.getNextFrame = function() {
	return this.curTime + 1;
};

// Compare two JavaScript values in some arbitrary but transitive way.
// Objects are compared by their properties (recursively), and object
// enumeration order is ignored.
function deepArbitraryCompare(a, b) {
	if (typeof a !== typeof b)
		return (typeof a < typeof b ? 1 : -1);
	if (typeof a === "string") {
		return (a < b ? 1 : (a == b ? 0 : -1));
	}
	if (typeof a === "number") {
		if (isNaN(a) || isNaN(b))
			return (isNaN(a) - isNaN(b));
		return a - b;
	}
	if (a === undefined)
		return 0;
	if (typeof a === "boolean")
		return a - b;

	if (a === null)
		return (b === null ? 0 : 1);

	var keysa = Object.keys(a).sort(), keysb = Object.keys(b).sort();
	if (keysa.length !== keysb.length)
		return keysa.length - keysb.length;
	for (var i = 0; i < keysa.length; ++i) {
		if (keysa[i] !== keysb[i])
			return (keysa[i] < keysb[i] ? 1 : -1);
		var cmp = deepArbitraryCompare(a[keysa[i]], b[keysb[i]]);
		if (cmp)
			return cmp;
	}
	return 0;
}

})();
