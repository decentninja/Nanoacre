;(function() {
"use strict";

window.Timeline = function(initialState) {
	this.curTime = 0;
	this.events = [];
	this.states = [initialState];
}

Timeline.prototype.step = function() {
	var newState = Logic.step(this.states[this.curTime], this.events[this.curTime + 1] || []);
	this.states.push(newState);
	++this.curTime;
};

Timeline.prototype.insert = function(event) {
	var time = event.time;
	if (time <= 0) {
		throw new Error("Timeline tried to insert something before the initial state.");
	}

	if (this.events.length <= time)
		this.events.length = time;
	if (!this.events[time])
		this.events[time] = [];

	this.events[time].push(event);
	if (this.events[time].length > 1)
		this.events[time].sort(deepArbitraryCompare);

	if (time > this.curTime)
		return;

	for (var t = time; t <= this.curTime; ++t) {
		this.states[t] = Logic.step(this.states[t-1], this.events[t] || []);
	}
}

Timeline.prototype.getCurrentState = function() {
	return this.states[this.curTime];
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
