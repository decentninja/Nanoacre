"use strict";

function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

window.requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
