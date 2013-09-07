var inject = [
	'js/lib/mutation_summary.js',
	'js/inject/pathId.js',
	'js/inject/hub.js',
	'js/inject/ready.js',
	'js/inject/master.js',
	'js/inject/slave.js'
];

inject.forEach(function(url) {
	var node = document.createElement('script');
	node.type = 'text/javascript';
	node.charset = 'utf-8';
	node.async = false;
	node.src = chrome.extension.getURL(url);
	(document.head||document.documentElement).insertBefore(node);
});
