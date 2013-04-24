function Network(websocket, eventqueue, pongCount) {
	this.websocket = websocket
	this.pongCount = pongCount

	websocket.onopen = this.onopen
	websocket.onmessage = this.onmessage
	websocket.onclose = this.onclose
	websocket.onerror = this.onerror
}

Network.prototype.send = function(message) {
	if (typeof message == "string" || message instanceof String) {
		websocket.send(message)
	} else {
		websocket.send(JSON.stringify(message))
	}
}

Network.prototype.ready = function(startFunc) {
	this.startFunc = startFunc //TODO: what is 'this' bound to when calling startFunc?
	this.latency = new Array()
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

		default:
			eventqueue.push(JSON.parse(message))
	}
}

Network.prototype.onclose = function(e) {}

Network.prototype.onerror = function(e) {}

Notwork.prototype.gotPing = function() {
	now = performance.now()
	var done = this.latency.length + 1 >= pongCount
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

