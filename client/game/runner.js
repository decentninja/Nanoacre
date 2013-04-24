function Runner(socket, canvas_selector, config) {
	var canvas_element = document.querySelector(canvas_selector)
	var canvas_context = canvas_element.getContext('2d')
	if(config.fullscreen) {
		// DO fullscreen
	}

	var samplemap = {
		name: "Valley of Darkness",
		parts: [
			[1, 1, 1],
			[0, 0, 0],
			[1, 1, 1],
		],
	}

	this.eventqueue = new Array()

	this.ui = new Ui(canvas_context, config, samplemap)
	this.game = new Game(samplemap, config, this.ui)

	this.network = new Network(socket, this.eventqueue, 10)

	this.lasttime = performance.now()

	//TODO: when the client is ready to start, network.ready should be called
	//this.network.ready(startFunc)
	//where startFunc is a function that takes the time since the server
	//sent the start command and starts the gameloop with an adjusted
	//gameclock
}

Runner.prototype.loop = function() {
	var newtime = performance.now()
	var deltatime = newtime - this.lasttime
	this.lasttime = newtime
	this.game.step(deltatime, this.eventqueue)
	requestAnimationFrame(this.loop.bind(this))
}

var runner = new Runner(null, ".canvas", {
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
		selected: "#208BB5",
	},
	fullscreen: true,
})

runner.loop()