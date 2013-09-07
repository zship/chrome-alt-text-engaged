window.altTextEngaged = window.altTextEngaged || {};
window.altTextEngaged.master = (function() {

	if (window.top !== window) {
		return;
	}

	var hub = window.altTextEngaged.hub;
	var pathId = window.altTextEngaged.pathId;
	var ready = window.altTextEngaged.ready;


	var mode = 'normal';

	var mainTitleEl;
	var overlay;

	var select = function(selector) {
		return Array.prototype.slice.call(document.body.querySelectorAll(selector));
	};


	var x = 0;
	var y = 0;


	var showOverlay = function() {
		var body = document.body;
		var html = document.documentElement;
		var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		var width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

		var rect = body.getBoundingClientRect();
		var offset = {
			top: rect.top,
			left: rect.left
		};
		offset.top += window.scrollY;
		offset.left += window.scrollX;
		overlay.style.top = (-1 * offset.top) + 'px';
		overlay.style.left = (-1 * offset.left) + 'px';
		overlay.style.width = width + 'px';
		overlay.style.height = height + 'px';
		overlay.style.display = 'block';
	};


	var drawSpot = function(rect) {
		var spot = document.createElement('div');
		spot.className = 'alt-text-engaged-spot';
		var style = '';
		style += 'left: ' + rect.left + 'px; ';
		style += 'top: ' + rect.top + 'px; ';
		style += 'width: ' + rect.width + 'px; ';
		style += 'height: ' + rect.height + 'px; ';
		style += 'display: block;';
		spot.style.cssText = style;
		spot.setAttribute('data-alt-text-engaged-title', rect.title);
		overlay.appendChild(spot);
	};


	var manualHover = function() {
		var el = document.elementFromPoint(x, y);
		var node = el;
		var title;

		while (node && node !== document) {
			if ((title = node.getAttribute('data-alt-text-engaged-title'))) {
				mainTitleEl.style.display = 'block';
				mainTitleEl.textContent = title;
				break;
			}
			node = node.parentNode;
		}
	};


	var engage = function() {
		mode = 'alt';
		showOverlay();

		hub.request('getTitleRects', function(rects, meta) {
			var frame;
			if (meta.frame) {
				select('iframe').every(function(el) {
					if (pathId(el) === meta.frame) {
						frame = el;
						return false;
					}
					return true;
				});
			}

			if (frame) {
				var offset = frame.getBoundingClientRect();
				offset = {
					top: offset.top + window.pageYOffset,
					left: offset.left + window.pageXOffset
				};

				rects.forEach(function(rect) {
					rect.top += offset.top;
					rect.left += offset.left;
					drawSpot(rect);
				});
			}
			else {
				rects.forEach(function(rect) {
					drawSpot(rect);
				});
			}

			manualHover();
		});
	};


	var disengage = function() {
		mode = 'normal';
		select('.alt-text-engaged-spot').forEach(function(el) {
			overlay.removeChild(el);
		});
		overlay.style.display = 'none';
		mainTitleEl.style.display = 'none';
	};


	hub.on('altKeyDown', engage);
	hub.on('altKeyUp', disengage);


	ready(function() {

		mainTitleEl = document.createElement('div');
		mainTitleEl.id = 'alt-text-engaged-title';
		document.body.appendChild(mainTitleEl);

		overlay = document.createElement('div');
		overlay.id = 'alt-text-engaged-overlay';
		document.body.appendChild(overlay);

		document.addEventListener('mousemove', function(e) {
			x = e.clientX;
			y = e.clientY;

			if (mode === 'alt') {
				if (e.target.className === 'alt-text-engaged-spot') {
					manualHover();
				}
				else {
					mainTitleEl.style.display = 'none';
				}
			}
		}, false);

		window.onblur = disengage;

	});

})();
