function Runner(socket, canvas, fullscreen, config) {
	this.canvas = canvas
	var canvas_context = canvas.getContext('2d')
	this.config = config

	var samplemap = {
		name: "Valley of Darkness",
		parts: [
			[1, 1, 1],
			[0, 0, 0],
			[1, 1, 1],
		],
	}

	var that = this
	fullscreen.addEventListener("click", function() {
		var el = that.canvas.parentElement
		if(el.requestFullscreen) {
			el.requestFullscreen()
		} else if(el.webkitRequestFullScreen) {
			el.webkitRequestFullScreen()
		} else {
			el.mozRequestFullScreen()
		}
	})

	this.eventqueue = []

	this.ui = new Ui(canvas_context, config, samplemap)
	this.game = new Game(samplemap, config, this.ui)
	this.network = new Network(socket, this.eventqueue, 10)

	//TODO: when the client is ready to start, network.ready should be called
	this.network.ready(function(clockAdjustment) {
		that.start(clockAdjustment)
	})
	//where startFunc is a function that takes the time since the server
	//sent the start command and starts the gameloop with an adjusted
	//gameclock
}

Runner.prototype.start = function(clockAdjustment) {
	var that = this
	var canvas = this.canvas
	this.canvas.onmousedown = function(ev) {
		// If we use jQuery, this is just (ev.pageX - $(ev).offset().left), etc.
		var docElem = document.documentElement
		var bclr = that.canvas.getBoundingClientRect()
		var x = ev.pageX - Math.round(bclr.left + window.pageXOffset - docElem.clientTop)
		var y = ev.pageY - Math.round(bclr.top + window.pageYOffset - docElem.clientLeft)
		that.ui.handleMousedown(x, y, that.game)
	}
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

var socket = new WebSocket("ws://localhost:9000/ws")
socket.onmessage = function(e) {
	if (e.data === "load") {
		var runner = new Runner(
			socket, 
			document.querySelector(".canvas"), 
			document.querySelector(".fullscreen"), 
			{
				colors: {
					teams: [
						"#7EA885",
						"#ECC57C",
						"#E1856C",
						"#872237",
						"#A1A1AA"
					],
					background: "#1D1D1D",
					bullet: "#C82257",
					selected: "#208BB5"
				},
			})
	}
}
