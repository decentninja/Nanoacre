"use strict";

function Timeline(initialState) {
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
