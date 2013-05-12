(function() {
	"use strict";

	window.Network = function(websocket, eventqueue, pongCount) {
		this.websocket = websocket
		this.eventqueue = eventqueue
		this.pongCount = pongCount
		this.startFunc = null
	}

	Network.prototype.takeOverSocket = function() {
		this.websocket.onopen = this.onopen.bind(this)
		this.websocket.onmessage = this.onmessage.bind(this)
		this.websocket.onclose = this.onclose.bind(this)
		this.websocket.onerror = this.onerror.bind(this)
	}

	Network.prototype.send = function(message) {
		if (typeof message == "string") {
			this.websocket.send(message)
		} else {
			this.websocket.send(JSON.stringify(message))
		}
	}

	Network.prototype.ready = function(startFunction, endFunction, rematchFunc) {
		this.startFunc = startFunction
		this.endGameFunc = endFunction
		this.rematchFunc = rematchFunc
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
				this.startFunc(this.latency)
				break;

			case "disconnect":
			case "loss":
			case "win":
			case "draw":
				this.endGameFunc(message)
				break;

			case "rematchAccepted":
				this.rematchFunc()
				break;

			default:
				this.eventqueue.push(JSON.parse(message))
		}
	}
	
	Network.prototype.onclose = function(e) {}
	
	Network.prototype.onerror = function(e) {}

	Network.prototype.gotPing = function() {
		var now = performance.now()
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

	window.MockNetwork = function() {
		this.takeOverSocket = this.send = function() {};
		this.ready = function(callback) {
			setTimeout(function() {
				callback(0);
			}, 0);
		};
	};

})()
