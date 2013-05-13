"use strict";

function deepCopy(obj) {
	if (typeof obj !== "object" || obj === null)
		return obj;
	if (obj instanceof Array) {
		var ret = [];
		ret.length = obj.length;
		for (var i = 0; i < obj.length; ++i)
			ret[i] = deepCopy(obj[i]);
		return ret;
	}
	var ret = {};
	for (var a in obj)
		ret[a] = deepCopy(obj[a]);
	return ret;
}

window.requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

window.cancelAnimationFrame =
	window.cancelAnimationFrame ||
	window.webkitCancelAnimationFrame ||
	window.webkitCancelRequestAnimationFrame ||
	window.mozCancelAnimationFrame;

var GetParams = (function(searchstr) {
	if (searchstr.charAt(0) == "?")
		searchstr = searchstr.substr(1);
	var parts = searchstr.split("&");
	var ret = Object.create(null);
	parts.forEach(function(part) {
		var p = part.split("=");
		ret[p[0]] = decodeURIComponent(p[1]);
	});
	return ret;
})(location.search);

var debug = GetParams["debug"] || 0;

function dist2(a, b) {
	var dx = a.x - b.x, dy = a.y - b.y;
	return dx*dx + dy*dy;
}

function randrange(a, b) {
	return Math.random() * (b - a) + a;
}

function randvector(l) {
	var v = 2 * Math.PI * Math.random()
	return {
		x: l * Math.cos(v),
		y: l * Math.sin(v)
	}
}
