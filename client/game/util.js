"use strict";

function deepCopy(obj) {
	if (typeof obj !== "object" || obj === null)
		return obj;
	if (obj instanceof Array)
		return obj.map(deepCopy);
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

/*
	Compare two JavaScript values in some arbitrary but transitive way.
	Objects are compared by their properties (recursively), and object enumeration order is ignored.
*/
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

var debug = GetParams["debug"] || 0;

function sq(x) {
	return x*x;
}

function dist2(a, b) {
	return sq(a.x - b.x) + sq(a.y - b.y);
}

function randrange(a, b) {
	return Math.random() * (b - a) + a;
}

function randvector(len) {
	var v = 2 * Math.PI * Math.random();
	return {
		x: len * Math.cos(v),
		y: len * Math.sin(v)
	};
}
