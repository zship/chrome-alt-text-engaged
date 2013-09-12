window.altTextEngaged = window.altTextEngaged || {};
window.altTextEngaged.slave = (function() {

	var hub = window.altTextEngaged.hub;
	var ready = window.altTextEngaged.ready;


	var altKeyDown = false;


	var select = function(selector) {
		return Array.prototype.slice.call(document.body.querySelectorAll(selector));
	};


	var disableAlt = function(el) {
		var title = el.getAttribute('title');
		var alt = el.getAttribute('alt');
		var display = title || alt;

		if (display) {
			el.setAttribute('data-alt-text-engaged-title', display);
		}

		el.removeAttribute('title');

		// allow downstream JavaScript access to the original title
		// property (JIRA depends on them to pass state from the server, for
		// one)
		Object.defineProperty(el, 'title', {
			get: function() {
				return title;
			},
			set: function(val) {
				this.setAttribute('data-alt-text-engaged-title', val);
			}
		});
	};


	hub.handle('getTitleRects', function() {
		var scroll = {
			top: window.pageYOffset,
			left: window.pageXOffset
		};

		return select('[data-alt-text-engaged-title]').map(function(el) {
			var rect = el.getBoundingClientRect();
			rect = {
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
				title: el.getAttribute('data-alt-text-engaged-title')
			};
			rect.top += scroll.top;
			rect.left += scroll.left;
			return rect;
		});
	});


	ready(function() {

		select('[title], [alt]').forEach(function(el) {
			disableAlt(el);
		});

		window.MutationSummary({
			rootNode: document.body,
			callback: function(summaries) {
				summaries[0].added.forEach(function(el) {
					disableAlt(el);
				});
			},
			queries: [{
				element: '[title], [alt]'
			}]
		});

		document.addEventListener('keydown', function(e) {
			if (e.keyCode !== 18) {
				return;
			}

			altKeyDown = true;
			hub.dispatch('altKeyDown');
		}, false);

		document.addEventListener('keyup', function(e) {
			if (altKeyDown && e.keyCode === 18) {
				altKeyDown = false;
				hub.dispatch('altKeyUp');
			}
		}, false);

	});

})();
