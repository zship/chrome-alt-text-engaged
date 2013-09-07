window.altTextEngaged = window.altTextEngaged || {};
window.altTextEngaged.hub = (function() {

	var pathId = window.altTextEngaged.pathId;


	var _hubEvents = {};
	var _guid = 0;

	var hub = {
		dispatch: function(type, msg) {
			window.top.postMessage(JSON.stringify({
				altTextEngaged: true,
				type: type,
				msg: msg
			}), '*');
		},
		on: function(type, callback) {
			_hubEvents[type] = _hubEvents[type] || [];
			if (_hubEvents[type].indexOf(callback) === -1) {
				_hubEvents[type].push(callback);
			}
		},
		off: function(type, callback) {
			if (!callback) {
				_hubEvents[type] = [];
			}
			var index;
			if ((index = _hubEvents[type].indexOf(callback)) !== -1) {
				_hubEvents[type].splice(index, 1);
			}
		},

		request: function(method, callback) {
			var id = _guid++;
			hub.dispatch('request:' + method, {id: id});
			hub.on('response:' + method, function(data) {
				if (data.id === id) {
					callback(data.response, data.meta);
				}
			});
			setTimeout(function() {
				hub.off('response:' + method);
			}, 1000);
		},
		handle: function(method, callback) {
			hub.on('request:' + method, function(data, meta) {
				hub.dispatch('response:' + method, {
					id: data.id,
					meta: meta,
					response: callback()
				});
			});
		}
	};

	var select = function(selector) {
		return Array.prototype.slice.call(document.body.querySelectorAll(selector));
	};

	window.addEventListener('message', function(event) {
		var data;
		try {
			data = JSON.parse(event.data);
		}
		catch (e) {
			return;
		}

		if (!data.altTextEngaged) {
			return;
		}

		if (!data.type) {
			return;
		}

		var callbacks;
		if ((callbacks = _hubEvents[data.type])) {
			for (var i = 0; i < callbacks.length; i++) {
				callbacks[i](data.msg, data);
			}
		}

		// once a message reaches the top window, relay to iframes (now that we have access)
		if (window.top === window) {
			select('iframe').forEach(function(frame) {
				data.frame = pathId(frame);
				frame.contentWindow.postMessage(JSON.stringify(data), '*');
			});
		}
	});

	return hub;

})();
