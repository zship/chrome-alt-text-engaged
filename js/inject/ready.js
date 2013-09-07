window.altTextEngaged = window.altTextEngaged || {};
window.altTextEngaged.ready = (function() {

	var ready = function(callback) {
		var completed = function() {
			document.removeEventListener( 'DOMContentLoaded', completed, false );
			window.removeEventListener( 'load', completed, false );
			callback();
		};

		if ( document.readyState === 'complete' ) {
			completed();
		}
		else {
			document.addEventListener('DOMContentLoaded', completed, false);
			window.addEventListener('load', completed, false);
		}
	};

	return ready;

})();
