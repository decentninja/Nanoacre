function Runner(socket, container, config, loadData) {
	var canvas = this.canvas = container.querySelector("canvas")
	this.container = container
	var canvas_context = canvas.getContext('2d')
	this.config = config

	loadData.Field.width = loadData.Field.Tiles[0].length
	loadData.Field.height = loadData.Field.Tiles.length
	canvas.width = loadData.Field.width * TILE_RENDER_SIZE
	canvas.height = loadData.Field.height * TILE_RENDER_SIZE
	this.real_map_width = canvas.width
	
	var actualContainer = container.querySelector(".fullscreen-container")
	function mayresize() {
		var widthScale  = actualContainer.offsetWidth  / canvas.width
		var heightScale = actualContainer.offsetHeight / canvas.height
		if (widthScale < 1 && heightScale >= 1) {
			canvas.style.setProperty("width", "100%")
			canvas.style.setProperty("height", "")
			console.log("width")

		} else if (widthScale >= 1 && heightScale < 1) {
			canvas.style.setProperty("width", "")
			canvas.style.setProperty("height", "100%")
			console.log("height")

		} else if (widthScale < 1 && heightScale < 1) {
			if (widthScale < heightScale) {
				canvas.style.setProperty("width", "100%")
				canvas.style.setProperty("height", "")
				console.log("fancy width")
			} else {
				canvas.style.setProperty("width", "")
				canvas.style.setProperty("height", "100%")
				console.log("fancy height")
			}

		} else {
			console.log("nothing")
			canvas.style.setProperty("width", "")
			canvas.style.setProperty("height", "")
		}
	}
	mayresize()
	window.onresize = mayresize

	this.eventqueue = []

	this.ui = new Ui(canvas_context, config, loadData)
	this.game = new Game(loadData.Field, config, this.ui)
	if (socket)
		this.network = new Network(socket, this.eventqueue, 10)
	else
		this.network = new MockNetwork();
}

Runner.prototype.run = function() {
	var that = this
	var fullscreenButton = this.container.querySelector(".fullscreen-button")
	fullscreenButton.addEventListener("click", function() {
		var el = that.container.querySelector(".fullscreen-container")
		if (el.requestFullscreen) {
			el.requestFullscreen()
		} else if (el.webkitRequestFullScreen) {
			el.webkitRequestFullScreen()
		} else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen()
		}
	})

	this.network.takeOverSocket()
	this.network.ready(function(clockAdjustment) {
		that.startLoop(clockAdjustment)
	})
}

Runner.prototype.addLineEvents = function(lineevents) {
	if (lineevents) {
		lineevents.forEach(function(lineevent) {
			this.network.send(lineevent)
			this.eventqueue.push(lineevent)
		}, this)
	}
}

Runner.prototype.startLoop = function(clockAdjustment) {
	var lobby = this.container.querySelector(".lobby")
	lobby.style.setProperty("opacity", "0")
	lobby.innerHTML = "Connected"
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
	this.loop();
}

Runner.prototype.loop = function() {
	var newtime = performance.now()
	var deltatime = newtime - this.lasttime
	this.lasttime = newtime
	this.game.step(deltatime, this.eventqueue)
	requestAnimationFrame(this.loop.bind(this))
}

var runner; // for debugging

function initializeGame(loadData) {
	var config = {
		colors: {
			teams: [
				"#7EA885",
				"#ECC57C",
				"#E1856C",
				"#872237",
				"#A1A1AA"
			],
			dead: "#262626", //TODO: check color
			background: "#1D1D1D",
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
	var container = document.querySelector(".game-container");
	runner = new Runner(socket, container, config, loadData)
	runner.run()
}

var socket = null;
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
	initializeGame(loadData);
}
else {
	var wsServer = GetParams["ws"] || location.host;
	socket = new WebSocket("ws://" + wsServer + "/ws")
	socket.onmessage = function(e) {
		var loadData = JSON.parse(e.data)
		console.log(loadData)
		initializeGame(loadData)
	}
}
