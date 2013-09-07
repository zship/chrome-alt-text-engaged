window.altTextEngaged = window.altTextEngaged || {};
window.altTextEngaged.pathId = (function() {

	var pathId = function(el) {
		var path = [];
		var node = el;
		while (node && node !== document) {
			var name = node.nodeName;
			if (node.id) {
				name += '#' + node.id;
			}
			if (node.className) {
				name += '.' + node.className.split(' ').join('.');
			}
			path.unshift(name);
			node = node.parentNode;
		}
		return path.join(' > ');
	};

	return pathId;

})();
