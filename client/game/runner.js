// For debug
var runner
var socket = null

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
			text: "#208BB5",
			map: "#434242",
			cooldown: "#C82257",
		},
		buttons: {
			0: "fire",
			2: "move"
		},
	}
	var container = document.querySelector(".content");
	runner = new Runner(container, config)
	runner.run()
}

function Runner(container, config) {
	var canvas = this.canvas = container.querySelector("canvas")
	this.container = container
	this.config = config

	this.flashtext = container.querySelector(".flashtext")
	
	this.actualContainer = container.querySelector(".fullscreen-container")

	this.eventqueue = []
}

Runner.prototype.run = function() {
	var container = this.container
	var canvas = this.canvas;
	var actualContainer = this.actualContainer;
	this.resizeHandler = function() {
		var widthScale = actualContainer.offsetWidth  / canvas.width
		var heightScale = actualContainer.offsetHeight / canvas.height
		if (widthScale < 1 && heightScale >= 1) {
			canvas.style.width = "100%"
			canvas.style.height = ""
		}
		else if (widthScale >= 1 && heightScale < 1) {
			canvas.style.width = ""
			canvas.style.height = "100%"
		}
		else if (widthScale < 1 && heightScale < 1) {
			if (widthScale < heightScale) {
				canvas.style.width = "100%"
				canvas.style.height = ""
			}
			else {
				canvas.style.width = ""
				canvas.style.height = "100%"
			}
		}
		else {
			canvas.style.width = ""
			canvas.style.height = ""
		}
	}
	this.resizeHandler();
	window.addEventListener("resize", this.resizeHandler);

	var fullscreenButton = this.container.querySelector(".fullscreen-button")
	fullscreenButton.addEventListener("click", function() {
		var el = container.querySelector(".fullscreen-container")
		if (el.requestFullscreen) {
			el.requestFullscreen()
		} else if (el.webkitRequestFullscreen) {
			el.webkitRequestFullscreen()
		} else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen()
		}
	}.bind(this))

	var customgameButton = this.container.querySelector(".create-lobby")
	customgameButton.addEventListener("click", function() {
		var players = window.prompt("How many players?", 2) // XXX BAAAAD
		if (isNaN(players) || players < 2)
			return
		players = Math.floor(players)
		var alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"
		var id = ""
		for(var i = 0; i < 10; i++) {
			id += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
		}
		location.href = "?lobby=" + id + "&players=" + players
	})

	if (debug) {
		var loadData = {
			Id: 0,
			Field: {
				Tiles: [
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0],
					[0,100,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,101,0],
					[0,100,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,101,0],
					[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				]
			}
		}
		this.preparemap(loadData);
	}
	else {
		var wsServer = GetParams["ws"] || location.host
		var lobby = GetParams["lobby"] || "default"
		var players = GetParams["players"] || 2
		if(lobby != "default") {
			this.display("Share this url to play with friends", false) // lolwat this will go away right after...
		}
		socket = this.socket = new WebSocket("ws://" + wsServer + "/ws?custom=" + lobby + "&players=" + players)
		this.display("Waiting for another player...", false)
		var that = this
		this.socket.onmessage = this.socketOnMessageStartup.bind(this)
	}
}

Runner.prototype.destroy = function() {
	window.removeEventListener("resize", this.resizeHandler, false);
};

Runner.prototype.socketOnMessageStartup = function(e) {
	this.preparemap(JSON.parse(e.data))
}

Runner.prototype.preparemap = function(loadData) {
	this.playerId = loadData.Id
	var canvas_context = this.canvas.getContext('2d')
	loadData.Field.width = loadData.Field.Tiles[0].length
	loadData.Field.height = loadData.Field.Tiles.length
	this.canvas.width = loadData.Field.width * TILE_RENDER_SIZE
	this.canvas.height = loadData.Field.height * TILE_RENDER_SIZE
	this.resizeHandler();

	this.ui = new Ui(canvas_context, this.config, loadData)
	this.game = new Game(loadData.Field, this.config, this.ui)
	if (socket)
		this.network = new Network(this.socket, this.eventqueue, 10)
	else
		this.network = new MockNetwork();

	this.real_map_width = this.canvas.width
	var that = this
	var rematchFunc = function() {
		that.socket.onmessage = that.socketOnMessageStartup.bind(that)
	}
	this.network.takeOverSocket()
	this.network.ready(this.startFunc.bind(this), this.endFunc.bind(this), rematchFunc)
}

Runner.prototype.startFunc = function(clockAdjustment) {
	this.display("Connected", true)
	if(debug) {
		this.prepareloop(clockAdjustment)
	} else {
		this.game.step(0, [])
		this.countdown(function() {
			this.prepareloop(clockAdjustment)
		}.bind(this))
	}
}

Runner.prototype.countdown = function(callback) {
	// Not secure...
	this.display("Ready?", false)
	setTimeout(function() {
		this.display("Set...")
	}.bind(this), 1000)
	setTimeout(function() {
		this.display("Go!", true)
		callback()
	}.bind(this), 2000)
}

Runner.prototype.prepareloop = function(clockAdjustment) {
	this.deadAlready = false
	var that = this
	var canvas = this.canvas
	this.canvas.onmousedown = function(ev) {
		// If we use jQuery, this is just (ev.pageX - $(ev).offset().left), etc.
		var docElem = document.documentElement
		var bclr = that.canvas.getBoundingClientRect()
		var scale = bclr.width / that.real_map_width 
		var x = ev.pageX - Math.round(bclr.left + window.pageXOffset - docElem.clientTop)
		var y = ev.pageY - Math.round(bclr.top + window.pageYOffset - docElem.clientLeft)
		x /= scale
		y /= scale
		lineevent = that.ui.handleMousedown(x, y, ev.button, that.game.getNextFrame())
		that.addLineEvent(lineevent)
	}

	window.onkeydown = function(ev) {
		if (ev.keyCode === 65 && (ev.ctrlKey || ev.accelKey)) {
			ev.preventDefault();
			return;
		}
		lineevent = that.ui.handleKeyDown(ev.keyCode, that.game.getNextFrame())
		that.addLineEvent(lineevent)
	}
	window.onkeyup = function(ev) {
		lineevent = that.ui.handleKeyUp(ev.keyCode, that.game.getNextFrame())
		that.addLineEvent(lineevent)
	}

	// XXX: This is apparently a bit of a hack.
	this.lasttime = performance.now() - clockAdjustment
	if(!this.looprunning) {
		this.loop()
	}
	this.looprunning = true
}

Runner.prototype.loop = function() {
	var newtime = performance.now()
	var deltatime = newtime - this.lasttime
	this.lasttime = newtime
	this.game.step(deltatime, this.eventqueue)
	if (!this.deadAlready && this.game.getRemainingPlayers().indexOf(this.playerId) == -1) {
		setTimeout(function() { // XXX Hack...
			if (!this.deadAlready && this.game.getRemainingPlayers().indexOf(this.playerId) == -1) {
				this.deadAlready = true
				this.network.send("dead")
				this.display("You're dead.", false)
			}
		}.bind(this), 1000)
	}
	if (GetParams["noloop"])
		return;
	requestAnimationFrame(this.loop.bind(this))
}

Runner.prototype.endFunc = function(condition) {
	this.canvas.onmousedown = null
	window.onkeydown = null
	window.onkeyup = null

	var newgamebutton = '<input class="newgame" type="button" value="New game"> '
	var rematchbutton = ' <input class="rematch" type="button" value="Rematch">'
	var str
	switch (condition) {
		case "win":
			str = "You won!"
			break

		case "loss":
			str = "You lost"
			break

		case "draw":
			str = "Draw"
			break

		case "disconnect":
			str = 'Someone disconnected, this game has ended.'
			break
	}
	this.display(newgamebutton + str + rematchbutton, false)
	var rematch = this.container.querySelector(".rematch")
	rematch.onclick = function() {
		this.network.send("rematch")
	}.bind(this)
	this.container.querySelector(".newgame").onclick = function() {
		location.reload()
	}
	if (condition == "disconnect") {
		rematch.setAttribute("disabled", true)
	}
}

Runner.prototype.display = function(text, fade) {
	var el = this.flashtext
	el.style.transition = "none"
	el.style.opacity = 1
	el.innerHTML = text

	if (fade) {
		setTimeout(function() {
			el.style.transition = ""
			el.style.opacity = 0
		}, 1000)
	}
}

Runner.prototype.addLineEvent = function(lineevent) {
	if (lineevent) {
		this.network.send(lineevent)
		this.eventqueue.push(lineevent)
	}
}

initialize()
