
function QEvent(type) {
	this.type = type;
}

QEvent.KEYPRESS = "KEYPRESS";

function EventDispatcher() {
	this.listenerRepository = new Object();
}
EventDispatcher.instance = null;
EventDispatcher.QUEUE_PATTERN = '@_@';
EventDispatcher.REFERENCE_NAME = '__eventDispatcher';
EventDispatcher.prototype.listenerRepository = null;
EventDispatcher.getInstance = function() {
	if (EventDispatcher.instance == null) EventDispatcher.instance = new EventDispatcher();
	return EventDispatcher.instance;
};
EventDispatcher.initialize = function(target) {
	var eventDispatcher = new EventDispatcher;
	target[EventDispatcher.REFERENCE_NAME] = eventDispatcher;
	target.dispatchEvent = eventDispatcher.dispatchEvent;
	target.addEventListener = eventDispatcher.addEventListener;
	target.removeEventListener = eventDispatcher.removeEventListener;
};
EventDispatcher.prototype.dispatchEvent = function(event) {
	if (typeof event == 'undefined') return;
	if (typeof event.type == 'undefined') return;
	var queue;
	try {
		queue = this[EventDispatcher.REFERENCE_NAME].listenerRepository[EventDispatcher.QUEUE_PATTERN + event.type].slice(0);
	}
	catch(e) {
		return;
	};
	var len = queue.length;
	for (var i = 0; i < len; i++) {
		var listener = queue[i][0];
		var method = queue[i][1];
		if (typeof event.target == 'undefined') event.target = this;
		event.currentTarget = this;
		if (typeof listener == 'object' && typeof method == 'function') method.call(listener, event);
	}
};
EventDispatcher.prototype.addEventListener = function(type, listener, method) {
	var queue;
	try {
		queue = this[EventDispatcher.REFERENCE_NAME].listenerRepository[EventDispatcher.QUEUE_PATTERN + type]
	} catch(e) {};
	if (typeof queue == 'undefined') queue = this[EventDispatcher.REFERENCE_NAME].listenerRepository[EventDispatcher.QUEUE_PATTERN + type] = new Array();
	var len = queue.length;
	for (var i = 0; i < len; i++)
	if (queue[i][0] == listener && queue[i][1] == method) return;
	queue.push([listener, method]);
};
EventDispatcher.prototype.removeEventListener = function(type, listener, method) {
	var queue;
	try {
		queue = this[EventDispatcher.REFERENCE_NAME].listenerRepository[EventDispatcher.QUEUE_PATTERN + type]
	} catch(e) {};
	if (typeof queue == 'undefined') return;
	var len = queue.length;
	for (var i = 0; i < len; i++)
	if (queue[i][0] == listener && queue[i][1] == method) {
		queue.splice(i, 1);
		return;
	}
};

