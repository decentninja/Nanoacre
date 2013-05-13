(function() {
"use strict";

function GameRunner(loadData, socket, canvas, config,
                             displayCallback, gameEndedCallback, rematchCallback) {
	this.loadData = loadData;
	this.socket = socket;
	this.canvas = canvas;
	this.config = config;
	this.display = displayCallback;
	this.gameEndedCallback = gameEndedCallback;
	this.rematchCallback = rematchCallback;
	this.destroyed = false;
}

GameRunner.prototype.destroy = function() {
	if (this.game)
		this.game.destroy();
	this.destroyed = true;
	this.deadAlready = true;
};

GameRunner.prototype.start = function() {
	this.loadData.Field.width = this.loadData.Field.Tiles[0].length;
	this.loadData.Field.height = this.loadData.Field.Tiles.length;

	this.resizeHandler = this.handleResize.bind(this);
	this.handleResize();
	window.addEventListener("resize", this.resizeHandler);

	this.eventqueue = [];
	this.playerId = this.loadData.Id;
	this.ui = new Ui(this.canvas, this.config, this.loadData);
	this.game = new Game(this.loadData.Field, this.config, this.ui);
	if (this.socket)
		this.network = new Network(this.socket, this.eventqueue);
	else
		this.network = new MockNetwork();

	this.ui.setupCanvas();

	this.network.takeOverSocket();
	this.network.ready(this.startFunc.bind(this), this.endFunc.bind(this), this.rematchCallback);
};

GameRunner.prototype.handleResize = function() {
	var canvas = this.canvas;
	var actualContainer = document.querySelector(".fullscreen-container");
	var widthScale = actualContainer.offsetWidth  / canvas.width;
	var heightScale = actualContainer.offsetHeight / canvas.height;
	if (widthScale < 1 && heightScale < 1) {
		var scaleWidth = (widthScale < heightScale);
		canvas.style.width = (scaleWidth ? "100%" : "");
		canvas.style.height = (!scaleWidth ? "100%" : "");
	}
	else {
		canvas.style.height = (heightScale < 1 ? "100%" : "");
		canvas.style.width = (widthScale < 1 ? "100%" : "");
	}
};

GameRunner.prototype.registerEventListeners = function() {
	var that = this;
	this.keyDownListener = function(ev) {
		var lineEvent = that.ui.handleKeyDown(ev.keyCode, that.game.getNextFrame());
		that.addLineEvent(lineEvent);
	};
	window.addEventListener("keydown", this.keyDownListener);

	this.mouseDownListener = function(ev) {
		// If we use jQuery, this is just (ev.pageX - $(ev).offset().left), etc.
		var docElem = document.documentElement;
		var bclr = that.canvas.getBoundingClientRect();
		var scale = bclr.width / that.canvas.width;
		var x = ev.pageX - (bclr.left + window.pageXOffset - docElem.clientTop);
		var y = ev.pageY - (bclr.top + window.pageYOffset - docElem.clientLeft);
		x = Math.round(x / scale);
		y = Math.round(y / scale);
		var lineEvent = that.ui.handleMousedown(x, y, ev.button, that.game.getNextFrame());
		that.addLineEvent(lineEvent);
	};
	this.canvas.addEventListener("mousedown", this.mouseDownListener);
};

GameRunner.prototype.startFunc = function(clockAdjustment) {
	this.display("Connected", true);
	if (debug) {
		this.prepareLoop(clockAdjustment);
	} else {
		this.game.step(0, []);
		this.countdown(function() {
			this.prepareLoop(clockAdjustment);
		}.bind(this));
	}
};

GameRunner.prototype.endFunc = function(condition) {
	// (If the listeners have not yet been registered, this is a no-op.)
	this.canvas.removeEventListener("mousedown", this.mouseDownListener);
	window.removeEventListener("keydown", this.keyDownListener);
	window.removeEventListener("resize", this.resizeHandler);

	this.gameEndedCallback(condition);
};

GameRunner.prototype.prepareLoop = function(clockAdjustment) {
	this.deadAlready = false;
	this.registerEventListeners();

	// XXX: This is apparently a bit of a hack.
	this.lasttime = performance.now() - clockAdjustment;

	if (this.looprunning)
		alert("looprunning FIXME");

	if (!this.looprunning) {
		this.loop();
	}
	this.looprunning = true;
};

GameRunner.prototype.countdown = function(callback) {
	// Not secure...
	this.display("Ready?", false);
	setTimeout(function() {
		this.display("Set...");
	}.bind(this), 1000);
	setTimeout(function() {
		this.display("Go!", true);
		callback();
	}.bind(this), 2000);
};

GameRunner.prototype.loop = function() {
	if (this.destroyed)
		return;
	var newtime = performance.now();
	var deltatime = newtime - this.lasttime;
	this.lasttime = newtime;
	this.game.step(deltatime, this.eventqueue);
	if (!this.deadAlready && this.game.getRemainingPlayers().indexOf(this.playerId) == -1) {
		setTimeout(function() { // XXX Hack...
			if (!this.deadAlready && this.game.getRemainingPlayers().indexOf(this.playerId) == -1) {
				this.deadAlready = true;
				this.network.send("dead");
				this.display("You're dead.", false);
			}
		}.bind(this), 300);
	}
	if (GetParams["noloop"])
		return;
	requestAnimationFrame(this.loop.bind(this));
};

GameRunner.prototype.addLineEvent = function(ev) {
	if (ev) {
		this.network.send(ev);
		this.eventqueue.push(ev);
	}
};

GameRunner.prototype.requestRematch = function() {
	this.network.send("rematch");
};

window.GameRunner = GameRunner;

})();
