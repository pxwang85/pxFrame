Plugin.instance = null;
Plugin.APIObject = null;

Plugin.get = function () {
	if(Plugin.instance == null) {
		Plugin.instance = new Plugin();
	}
    return Plugin.instance;
};

function Plugin() {
	
}

Plugin.prototype = new Object();
Plugin.prototype.init = function () {
	this.APIObject = testObj;
    this.hasPlugin = (typeof this.APIObject != 'undefined');

	if(this.hasPlugin) {
		this.dvb_init();
		//Database.get().Init();
		Installation.get().SearchInit();
		DvbPlayer.get().DvbInit();
		Program.get().init();
		Gstatus.Init();
		
		if(this.CheckAPI("callback_message_notify")) {
			this.APIObject.callback_message_notify = Plugin.PluginCallback;
		}
	}

};

Plugin.CallbackMsg = null;
Plugin.TUNERSIGNAL_NOTIFY   = 0;
Plugin.APP_NOTIFY           = 1;
Plugin.CA_NOTIFY            = 2;
Plugin.EPG_NOTIFY           = 3;
Plugin.USB_CHECK_NOTIFY     = 4;
Plugin.PVR_START_NOTIFY     = 5;
Plugin.PVR_END_NOTIFY       = 6;
Plugin.PVR_CB_NOTIFY        = 7;
Plugin.MAX_NOTIFY           = 8;

Plugin.PluginCallback = function(obj) {
	obj = JSON.parse(obj);
	if((typeof obj != 'undefined') && (typeof obj.message_type != 'undefined')) {

		console.log("=====  debug MsgCallback message_type:" + obj.message_type);
		if(Plugin.CallbackMsg && Plugin.CallbackMsg[parseInt(obj.message_type)]) {

			for(var i in Plugin.CallbackMsg[parseInt(obj.message_type)]) {
				try {
					Plugin.CallbackMsg[parseInt(obj.message_type)][i](obj);
				}
				catch(err) {

				}
			}
		}
	}
}

Plugin.prototype.addCallbackListener = function (type, func) {

	if(!Plugin.CallbackMsg)
		Plugin.CallbackMsg = new Array();

	if(!Plugin.CallbackMsg[type])
		Plugin.CallbackMsg[type] = new Array();

	if(typeof func == 'function') {
		Plugin.CallbackMsg[type].push(func);
	}
};

Plugin.prototype.CheckAPI = function (name) {
	if(this.hasPlugin) {
		if(name in this.APIObject) {
			return true;
		}
		else {
			console.log("The Plugin no find [" + name +"] function!!!");
		}
	}
	else {
		console.log("No The Plugin API!!!");
	}
	return false;
};

Plugin.prototype.dvb_init = function () {
	if(this.CheckAPI("dvb_init")) {
		this.APIObject.dvb_init();
	}
};

Plugin.prototype.play_last_channel = function () {
	if(this.CheckAPI("play_last_channel")) {
		return this.APIObject.play_last_channel();
	}
	return 0;
};

Plugin.prototype.app_zapping_signal = function (type, ch_num, service_type) {
	if(this.CheckAPI("app_zapping_signal")) {
		this.APIObject.app_zapping_signal(type, ch_num, service_type);
	}
};

Plugin.prototype.get_last_channel_service = function () {
	if(this.CheckAPI("get_last_channel_service")) {
		var json = this.APIObject.get_last_channel_service();
		if(json) {
			return JSON.parse(json);
		}
	}
	return null;
};

Plugin.prototype.db_get_serv_totalnum = function () {
	if(this.CheckAPI("db_get_serv_totalnum")) {
		return this.APIObject.db_get_serv_totalnum();
	}
	return 0;
};

Plugin.prototype.db_get_all_serv = function () {
	if(this.CheckAPI("db_get_all_serv")) {
		var json = this.APIObject.db_get_all_serv();
		if(json) {
			return JSON.parse(json);
		}
	}
	return null;
};

Plugin.prototype.db_get_last_ch = function () {
	if(this.CheckAPI("db_get_last_ch")) {
		return this.APIObject.db_get_last_ch();
	}
	return null;
};

Plugin.prototype.db_get_serv_by_logicnum = function (logicnum) {
	if(this.CheckAPI("db_get_serv_by_logicnum")) {
		var json = this.APIObject.db_get_serv_by_logicnum(parseInt(logicnum));
		if(json) {
			return JSON.parse(json);
		}
	}
	return null;
};

Plugin.prototype.db_get_last_mute_state = function () {
	if(this.CheckAPI("db_get_last_mute_state")) {
		return this.APIObject.db_get_last_mute_state();
	}
	return 0;
};

Plugin.prototype.app_get_pf_info_for_dialog = function (ch_num, type, flag) {
	if(this.CheckAPI("app_get_pf_info_for_dialog")) {
		var json = this.APIObject.app_get_pf_info_for_dialog(parseInt(ch_num), parseInt(type), parseInt(flag));
		if(json) {
			return JSON.parse(json);
		}
	}
	return null;
};

Plugin.prototype.app_get_pf_event = function (ch_num, type, flag) {
	if(this.CheckAPI("app_get_pf_event")) {
		var json = this.APIObject.app_get_pf_event(parseInt(ch_num), parseInt(type), parseInt(flag));
		if(json) {
			return JSON.parse(json);
		}
	}
	return null;
};

