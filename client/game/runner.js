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

	this.ui = new Ui(canvas_context, config, samplemap)
	this.game = new Game(samplemap, config, this.ui)

	this.lasttime = Date.now()
}

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

Runner.prototype.loop = function() {
	var newtime = Date.now()
	var deltatime = newtime - this.lasttime
	this.lasttime = newtime
	this.game.step(deltatime)
	requestAnimFrame(this.loop)
}

var runner = new Runner(null, ".canvas", {
	colors: {
		player: "#7EA885",
		background: "#1D1D1D",
		bullet: "#C82257",
		selected: "#208BB5",
		enemies: "#ECC57C"
	},
	fullscreen: true,
})

runner.loop()