function Runner(container, config) {
	var canvas = this.canvas = container.querySelector("canvas")
	this.container = container
	this.config = config

	this.flashtext = this.container.querySelector(".flashtext")
	
	var actualContainer = container.querySelector(".fullscreen-container")
	function mayresize() {
		var widthScale  = actualContainer.offsetWidth  / canvas.width
		var heightScale = actualContainer.offsetHeight / canvas.height
		if (widthScale < 1 && heightScale >= 1) {
			canvas.style.setProperty("width", "100%")
			canvas.style.setProperty("height", "")

		} else if (widthScale >= 1 && heightScale < 1) {
			canvas.style.setProperty("width", "")
			canvas.style.setProperty("height", "100%")

		} else if (widthScale < 1 && heightScale < 1) {
			if (widthScale < heightScale) {
				canvas.style.setProperty("width", "100%")
				canvas.style.setProperty("height", "")
			} else {
				canvas.style.setProperty("width", "")
				canvas.style.setProperty("height", "100%")
			}

		} else {
			canvas.style.setProperty("width", "")
			canvas.style.setProperty("height", "")
		}
	}
	mayresize()
	window.onresize = mayresize

	var fullscreenButton = container.querySelector(".fullscreen-button")
	fullscreenButton.addEventListener("click", function() {
		var el = container.querySelector(".fullscreen-container")
		if (el.requestFullscreen) {
			el.requestFullscreen()
		} else if (el.webkitRequestFullScreen) {
			el.webkitRequestFullScreen()
		} else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen()
		}
		mayresize()
	})

	var customgameButton = container.querySelector(".create-lobby")
	customgameButton.addEventListener("click", function() {
		var things = "abcdefghijklmnopqrstuvwxyz1234567890"
		var go = ""
		for(var i = 0; i < 10; i++) {
			go += things.charAt(Math.floor(Math.random() * things.length))
		}
		window.location = "?lobby=" + go
	})

	this.eventqueue = []
}

Runner.prototype.run = function() {
	if(debug) {
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
		if(lobby != "default") {
			this.display("Share this url to play with friends", false)
		}
		socket = this.socket = new WebSocket("ws://" + wsServer + "/ws?custom=" + lobby)
		var that = this
		this.socket.onmessage = this.socketOnMessageStartup.bind(this)
	}
}

Runner.prototype.socketOnMessageStartup = function(e) {
	this.preparemap(JSON.parse(e.data))
}

Runner.prototype.addLineEvents = function(lineevents) {
	if (lineevents) {
		lineevents.forEach(function(lineevent) {
			this.network.send(lineevent)
			this.eventqueue.push(lineevent)
		}, this)
	}
}

Runner.prototype.display = function(text, fade) {
	this.flashtext.style.transition = "none"
	this.flashtext.style.opacity = 1
	this.flashtext.innerHTML = text

	var that = this
	if(fade) {
		setTimeout(function() {
			that.flashtext.style.transition = ""
			that.flashtext.style.opacity = 0
		}, 1000)
	}
}

Runner.prototype.preparemap = function(loadData) {
	this.playerId = loadData.Id
	var canvas_context = this.canvas.getContext('2d')
	loadData.Field.width = loadData.Field.Tiles[0].length
	loadData.Field.height = loadData.Field.Tiles.length
	this.canvas.width = loadData.Field.width * TILE_RENDER_SIZE
	this.canvas.height = loadData.Field.height * TILE_RENDER_SIZE
	window.onresize()

	this.ui = new Ui(canvas_context, this.config, loadData)
	this.game = new Game(loadData.Field, this.config, this.ui)
	if (socket)
		this.network = new Network(this.socket, this.eventqueue, 10)
	else
		this.network = new MockNetwork();

	this.real_map_width = this.canvas.width
	var that = this
	this.network.takeOverSocket()
	var startFunc = function(clockAdjustment) {
		that.display("Connected", true)
		if(debug) {
			that.prepareloop(clockAdjustment)
		} else {
			that.game.step(0, [])
			that.countdown(function() {
				that.prepareloop(clockAdjustment)
			})
		}
	}
	var endFunc = function(condition) {
		that.canvas.onmousedown = null
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

			case "disconnect":
				str = 'Someone disconnected, this game has ended.'
				break
		}
		that.display(newgamebutton + str + rematchbutton, false)
		var rematch = that.container.querySelector(".rematch")
		rematch.onclick = function() {
			that.network.send("rematch")
		}
		that.container.querySelector(".newgame").onclick = function() {
			document.location.reload(false)
		}
		if (condition == "disconnect") {
			rematch.setAttribute("disabled", true)
		}
	}
	var rematchFunc = function() {
		that.socket.onmessage = that.socketOnMessageStartup.bind(that)
	}
	this.network.ready(startFunc, endFunc, rematchFunc)
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
		lineevents = that.ui.handleMousedown(x, y, ev.button, that.game.getNextFrame())
		that.addLineEvents(lineevents)
	}

	window.onkeydown = function(ev) {
		lineevents = that.ui.handleKeyDown(ev.keyCode, ev.shiftKey, that.game.getNextFrame())
		that.addLineEvents(lineevents)
	}
	window.onkeyup = function(ev) {
		lineevents = that.ui.handleKeyUp(ev.keyCode, ev.shiftKey, that.game.getNextFrame())
		that.addLineEvents(lineevents)
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
	requestAnimationFrame(this.loop.bind(this))
}

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
			dead: "#262626", 	// TODO: check color
			background: "#1D1D1D",
			shadow: "#000000", //TODO: check color
			bullet: "#C82257",
			selected: "#208BB5",
			text: "#208BB5",
			map: "#262626",
			cooldown: "#C82257",
		},
		buttons: {
			0: "fire",
			2: "move"
		},
	}
	var container = document.querySelector(".everything-container");
	runner = new Runner(container, config)
	runner.run()
}
initialize()
