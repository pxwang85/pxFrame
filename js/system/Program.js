Program.instance = null;

Program.CHANNEL_UP        = 0;
Program.CHANNEL_DOWN      = 1;
Program.CHANNEL_FAV_UP    = 3;
Program.CHANNEL_FAV_DOWN  = 4;
Program.CHANNEL_SET       = 5;
Program.CHANNEL_BROWSE    = 6;
Program.CHANNEL_BACK      = 7;
Program.CHANNEL_SWITCH    = 8;
Program.CHANNEL_LAST      = 10;

Program.get = function () {
	if(Program.instance == null)
		Program.instance = new Program();
    return Program.instance;
};

function Program() {
	this.init();
}

Program.prototype = new Object();
Program.prototype.init = function () {
	
    this.plugin = Plugin.get();
	this.cur_channel = null;
};

function getTimeStr(t) {
	return (t.hour < 10 ? "0" : "") + t.hour + ":" + (t.minute < 10 ? "0" : "") + t.minute;
}

Program.prototype._getCurChannel = function() {
	console.log("=====  _getCurChannel ");
    this.cur_channel = this.GetLastChannel();
	this.RefreshStatus();
};

Program.prototype.RefreshStatus = function() {
	console.log("=====  RefreshStatus ");
	Gstatus.clearChannel();
    if(this.cur_channel) {
		//console.log("=====  _getCurChannel cur_channel:" + JSON.stringify(this.cur_channel));
		Gstate.channelid = this.cur_channel.logical_number;
	    Gstate.channelname = this.cur_channel.channel_name;

		var event;
		event = this.plugin.app_get_pf_event(this.cur_channel.channel_number, this.cur_channel.service_type, 0);
		if(event) {
			Gstate.pevent.name = event.event_name || "";
		    Gstate.pevent.start_time = getTimeStr(event.start_time);
			Gstate.pevent.end_time = getTimeStr(event.end_time);
		}
		event = this.plugin.app_get_pf_event(this.cur_channel.channel_number, this.cur_channel.service_type, 1);
		if(event) {
			Gstate.fevent.name = event.event_name || "";
		}
	}
};

Program.prototype.zapping = function(type, ch_num, service_type) {
	console.log("=====  zapping ");
    this.plugin.app_zapping_signal(type, ch_num, service_type);
	this._getCurChannel();
};

Program.prototype.ChannelUp = function () {
	console.log("=====  debug ChannelUp");
	this.zapping(Program.CHANNEL_UP, 0, 0);
};

Program.prototype.ChannelDown = function () {
	console.log("=====  debug ChannelDown");
	this.zapping(Program.CHANNEL_DOWN, 0, 0);
};

Program.prototype.ChannelFavUp = function () {
	console.log("=====  debug ChannelFavUp");
	this.zapping(Program.CHANNEL_FAV_UP, 0, 0);
};

Program.prototype.ChannelFavDown = function () {
	console.log("=====  debug ChannelFavDown");
	this.zapping(Program.CHANNEL_FAV_DOWN, 0, 0);
};

Program.prototype.ChannelBack = function () {
	console.log("=====  debug ChannelBack");
	this.zapping(Program.CHANNEL_BACK, 0, 0);
};

Program.prototype.ChannelSwitch = function (logic_num) {
	console.log("=====  debug ChannelSwitch");
	var channel = this.plugin.db_get_serv_by_logicnum(logic_num);
	if(channel) {

		this.zapping(Program.CHANNEL_SET, channel.channel_number, channel.service_type);
		return true;
	}
	return false;
};

Program.prototype.ChannelDefault = function () {
	console.log("=====  debug ChannelSwitch");

	var channel_list = this.GetAllChannel();
	if(channel_list && channel_list.length > 0) {
		this.zapping(Program.CHANNEL_SET, channel_list[0].channel_number, channel_list[0].service_type);
		return true;
	}
	return false;
};

Program.prototype.GetAllChannel = function () {
	console.log("=====  debug ChannelSwitch");
	return this.plugin.db_get_all_serv();
};

Program.prototype.GetLastChannel = function () {
	console.log("=====  debug GetLastChannel");
	return this.plugin.get_last_channel_service();
};

Program.prototype.GetChannelTotal = function () {
	console.log("=====  debug GetChannelTotal");
	return this.plugin.db_get_serv_totalnum();
};

Program.prototype.SwitchTvRadio = function () {
	console.log("=====  debug SwitchTvRadio");
	this.zapping(Program.CHANNEL_SWITCH, 0, 0);
};

Program.prototype.PlayLastChannel = function () {
	var ret;
	console.log("=====  debug PlayLastChannel");
	ret = this.plugin.play_last_channel();
	if(ret == 0)
		this._getCurChannel();
	return ret;
};