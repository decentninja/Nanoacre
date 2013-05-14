(function() {
"use strict";

/*
	The beginning of time
	Constants for color and buttons
	Query DOM
 */
function initialize() {
	var config = {
		colors: {
			teams: [
				"#7EA885",
				"#ECC57C",
				"#E1856C",
				"#872237",
				"#A1A1AA"
			],
			dead: "#262626",
			background: "#1D1D1D",
			shadow: "#000000",
			bullet: "#C82257",
			selected: "#208BB5",
			wallExplosion: "#333333",
			text: "#208BB5",
			map: "#434242",
			cooldown: "#C82257",
		},
		buttons: {
			0: "fire",
			2: "move",
		},
	};
	var container = document.querySelector(".content");
	var runner = new Runner(container, config);
	runner.start();

	// for debugging
	window.runner = runner;
}

function Runner(container, config) {
	this.canvas = container.querySelector("canvas");
	this.container = container;
	this.config = config;

	this.flashtext = container.querySelector(".flashtext");
}

/*
	Fullscreen button setup
	Custom game button
	Connects to server or debug mock data
 */
Runner.prototype.start = function() {
	var container = this.container;

	var fullscreenButton = this.container.querySelector(".fullscreen-button");
	fullscreenButton.addEventListener("click", function() {
		var el = container.querySelector(".fullscreen-container");
		if (el.requestFullscreen) {
			el.requestFullscreen();
		} else if (el.webkitRequestFullscreen) {
			el.webkitRequestFullscreen();
		} else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen();
		}
	}.bind(this));

	this.customGameButton = this.container.querySelector(".create-lobby");
	this.customGameButton.addEventListener("click", function() {
		var players = window.prompt("How many players?", 2); // XXX BAAAAD
		if (isNaN(players) || players < 2)
			return;
		players = Math.floor(players);
		var alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
		var id = "";
		for(var i = 0; i < 10; i++) {
			id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		}
		location.href = "?lobby=" + id + "&players=" + players;
	});

	var randomGameButton = this.container.querySelector(".randomgame-button");
	randomGameButton.addEventListener("click", function() {
		randomGameButton.style.display = "none";
		this.requestGame("default", 2);
	}.bind(this));

	if (debug) {
		var _ = 0;
		var loadData = {
			Id: 0,
			Field: {
				Tiles: [
					[_,_  ,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_  ,_],
					[_,_  ,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_  ,_],
					[_,_  ,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_  ,_],
					[_,_  ,_,1,_,_,_,_,_,_,_,_,_,1,1,1,1,_,_  ,_],
					[_,100,_,1,_,_,_,_,_,_,_,_,_,_,_,_,1,_,101,_],
					[_,100,_,1,_,_,_,_,_,_,_,_,_,_,_,_,1,_,101,_],
					[_,_  ,_,1,1,1,1,_,_,_,_,_,_,_,_,_,1,_,_  ,_],
					[_,_  ,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_  ,_],
					[_,_  ,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_  ,_],
					[_,_  ,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_  ,_],
				]
			}
		};
		this.showNonGameOptions(false);
		this.prepareGame(loadData);
	}
	else {
		if (GetParams["lobby"]) {
			var lobby = GetParams["lobby"] || "default";
			var players = GetParams["players"] || 2;
			this.requestGame(lobby, players);
			this.display("Share this url to play with friends", false);
			randomGameButton.style.display = "none";
		}
	}
};

Runner.prototype.waitForNewGame = function() {
	this.socket.onmessage = function(e) {
		if (this.gameRunner) {
			this.gameRunner.destroy();
			this.gameRunner = null;
		}
		this.socketOnMessageStartup(e);
	}.bind(this);
	this.showNonGameOptions(false);
};

Runner.prototype.requestGame = function(lobby, players) {
	var wsServer = GetParams["ws"] || location.host;
	if (this.socket)
		this.socket.close()
	this.socket = new WebSocket("ws://" + wsServer + "/ws?custom=" + lobby + "&players=" + players);
	this.display("Waiting for another player...", false);
	this.waitForNewGame();

	// for debugging
	window.socket = this.socket;
};

Runner.prototype.socketOnMessageStartup = function(e) {
	this.prepareGame(JSON.parse(e.data));
};

/*
	Creates GameRunner
 */
Runner.prototype.prepareGame = function(loadData) {
	this.container.querySelector(".game-container").classList.remove("screen-hidden");
	this.container.querySelector(".lobby-container").classList.add("screen-hidden");
	this.gameRunner = new GameRunner(loadData, this.socket, this.canvas, this.config,
			this.display.bind(this), this.endFunc.bind(this), this.waitForNewGame.bind(this));
	this.gameRunner.start();
};

/*
	Displays win or loss and disconnect
	Creates newgame and rematch buttons
 */
Runner.prototype.endFunc = function(condition) {
	var newgamebutton = '<input class="newgame" type="button" value="New game"> ';
	var rematchbutton = ' <input class="rematch" type="button" value="Rematch">';
	var str = "";
	switch (condition) {
		case "win":
			str = "You won!";
			break;

		case "loss":
			str = "You lost";
			break;

		case "draw":
			str = "Draw";
			break;

		case "disconnect":
			str = "Someone disconnected, this game has ended.";
			break;
	}
	this.display(newgamebutton + str + rematchbutton, false);
	var rematch = this.container.querySelector(".rematch");
	rematch.onclick = function() {
		this.gameRunner.requestRematch();
	}.bind(this);
	this.container.querySelector(".newgame").addEventListener("click", function() {
		// N.B.: This hides the button itself, so we don't need to unregister
		// event listeners or anything.
		this.requestGame("default", 2);
	}.bind(this));
	if (condition == "disconnect") {
		rematch.setAttribute("disabled", true);
	}
};

/*
	Kills gameRunner and restarts network
 */
Runner.prototype.rematchFunc = function() {
	this.socket.onmessage = function(e) {
		this.gameRunner.destroy();
		this.socketOnMessageStartup(e);
	}.bind(this);
};

/*
	Displays flashtext on above game
 */
Runner.prototype.display = function(text, fade) {
	var el = this.flashtext;
	el.style.transition = "none";
	el.style.opacity = 1;
	el.innerHTML = text;

	if (fade) {
		setTimeout(function() {
			el.style.transition = "";
			el.style.opacity = 0;
		}, 1000);
	}
};

/*
	Ctrl+A is annoying
 */
window.onkeydown = function(ev) {
	if (ev.keyCode === 65 && (ev.ctrlKey || ev.accelKey)) {
		ev.preventDefault();
		return;
	}
};

window.Runner = Runner;

initialize();

})();
