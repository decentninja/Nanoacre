"use strict";

function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

window.requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

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
