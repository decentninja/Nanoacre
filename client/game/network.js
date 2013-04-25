function Network(websocket, eventqueue, pongCount) {
	this.websocket  = websocket
	this.eventqueue = eventqueue
	this.pongCount  = pongCount

	websocket.onopen    = this.onopen.bind(this)
	websocket.onmessage = this.onmessage.bind(this)
	websocket.onclose   = this.onclose.bind(this)
	websocket.onerror   = this.onerror.bind(this)
}

(function() {
	var startFunc

	Network.prototype.send = function(message) {
		if (typeof message == "string") {
			this.websocket.send(message)
		} else {
			this.websocket.send(JSON.stringify(message))
		}
	}

	Network.prototype.ready = function(startFunction) {
		startFunc = startFunction
		this.latency = []
		this.send("ready")
	}

	Network.prototype.onopen = function(e) {}

	Network.prototype.onmessage = function(e) {
		var message = e.data
		switch (message) {
			case "ping":
				this.gotPing()
				break;

			case "start":
				startFunc(this.latency)
				startFunc = undefined
				break;

			default:
				this.eventqueue.push(JSON.parse(message))
		}
	}
	
	Network.prototype.onclose = function(e) {}
	
	Network.prototype.onerror = function(e) {}

	Network.prototype.gotPing = function() {
		now = performance.now()
		var done = this.latency.length + 1 >= this.pongCount
		if (!done) {
			this.send("pong")
		} else {
			this.send("lastpong")
		}

		if (this.lastPing)
			this.latency.push(now - this.lastPing)
		this.lastPing = now

		if (done) {
			var avgLat = 0
			this.latency.forEach(function(lat) {
				avgLat += lat
			})
			avgLat /= this.latency.length
			this.latency = avgLat
			delete this.lastPing
		}
	}

})()
