function Runner(socket, canvas_selector, config) {
	var canvas_element = document.querySelector(canvas_selector)
	var canvas_context = canvas_element.getContext('2d')
	if(config.fullscreen)
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