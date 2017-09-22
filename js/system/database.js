


QLoadEvent = function (type) {
	QEvent.call(this, type);
};

QLoadEvent.prototype = QEvent.prototype;

QLoadEvent.prototype.httpRequest = null;
QLoadEvent.prototype.req = null;
QLoadEvent.prototype.errorStatus = null;

QLoadEvent.LOAD_FAILED = "LOAD_FAILED";
QLoadEvent.LOAD_SUCCESS = "LOAD_SUCCESS";

QLoader = function () {
	EventDispatcher.initialize(this);
};

QLoader.TEXT_TYPE = "text";
QLoader.XML_TYPE = "xml";
QLoader.JSON_TYPE = "json";
QLoader.SCRIPT_TYPE = "script";

QLoader.LOAD_SUCCESS = "LOAD_SUCCESS";
QLoader.LOAD_FAILED = "LOAD_FAILED";

QLoader.prototype.name = 'QLoader';
QLoader.prototype.debug = true;
QLoader.prototype.noready = 0;

QLoader.prototype.eventinit = function () {
	EventDispatcher.initialize(this);
};

QLoader.prototype.load = function (path, dataType, label) {
	var path_val = '';
	this.label = label;
	if (path == "" || typeof path == 'undefined') {
		this.loadError("xhr error. No path defined.");
	}
	else {
		var $this = this;
		if (dataType == undefined) dataType = QLoader.TEXT_TYPE;

		if ((this.req != null) && (this.noready == 1)) {
			System_Debug("  QLOAD Req   Abort");
			this.req.abort();
			this.noready = 0;
		}

		 {
			path_val = path;
		}

		this.req = $.ajax({
			url: path_val,
			type: "GET",
			dataType: dataType,
			success: function (data) {
				$this.loadSuccess(data, $this.label);
			},
			error: function (httpRequest, textStatus) {
				$this.loadError(path, textStatus);
			}

		});
		this.noready = 1;
	}

};

QLoader.prototype.loadSuccess = function (data, label) {
	this.noready = 0;
	var event = new QLoadEvent(QLoadEvent.LOAD_SUCCESS);
	event.data = data;
	event.label = label;
	this.dispatchEvent(event);
};

QLoader.prototype.loadError = function (httpRequestUrl, textStatus) {
	this.noready = 0;

	var event = new QLoadEvent(QLoadEvent.LOAD_FAILED);
	event.errorStatus = textStatus;
	event.httpRequest = httpRequestUrl;
	this.dispatchEvent(event);
};

Database.instance = null;

function Database() {
    if (typeof EventDispatcher == 'undefined') 
        throw new Error("EventDispatcher class is missing.");
    EventDispatcher.initialize(this)
}
Database.get = function () {
    if (!Database.instance)
        Database.instance = new Database();
    return Database.instance
};

Database.prototype.sat = null;
Database.prototype.tp = null;
Database.prototype.tv = null;
Database.prototype.radio = null;
Database.prototype.cfg = null;
Database.prototype.tv_fav = null;
Database.prototype.radio_fav = null;

Database.prototype.Init = function () {
    this.cfg = new Array();
    this.cfg.push("sat");
    this.cfg.push("tp");
    this.cfg.push("tv");
    this.cfg_init();
    this.tv.loader.load('dat/tv.json', QLoader.JSON_TYPE, 'tv');
};

Database.prototype.cfg_init = function (event) {
    var len = this.cfg.length;
    for(var i=0;i<len;i++) {
        var name = this.cfg[i];
        this[name]={};
        this[name].dat = null;
        this[name].loader = new QLoader();
        this[name].loader.addEventListener(QLoadEvent.LOAD_SUCCESS, this, this.success);
        this[name].loader.addEventListener(QLoadEvent.LOAD_FAILED, this, this.error);
    }

};

var pdat = [
	{"id":0,"name":"CCTV-1"},
	{"id":1,"name":"CCTV-2"},
	{"id":2,"name":"CCTV-3"},
	{"id":3,"name":"CCTV-4"},
	{"id":4,"name":"CCTV-5"},
	{"id":5,"name":"CCTV-6"},
	{"id":6,"name":"CCTV-7"},
	{"id":7,"name":"CCTV-8"},
	{"id":8,"name":"CCTV-9"},
	{"id":9,"name":"CCTV-10"},
	{"id":10,"name":"CCTV-11"}

];

Database.prototype.success = function (event) {


	  

};
Database.prototype.error = function (event) {

};
