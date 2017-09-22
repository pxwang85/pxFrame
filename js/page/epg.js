function EPG(app, show) {
	page.call(this, app, "epg", show)
}
EPG.prototype = new page();
EPG.EC = "egc";
EPG.ED = "egd";
EPG.EE = "ege";
EPG.PAGE_MAX = 5;

var epg_week = [];
EPG.prototype.init = function () {
	this.first_sel = 0;
	this.second_sel = 0;
	this.third_sel = 0;

	this.first_status = 1;
	this.second_status = 0;
	this.third_status = 0;
	this.addbg();
	this.addinfo();
	this.setdate();
	var a = GetChannelTotal();
	if (a > 0) {
		GetAllChannel();
		play_last_channel();
	}
	this.setchannel(chnanel_info, this.second_status);
	//this.setevent("init",this.third_status)

	this.help();
};

EPG.prototype.setdate = function () {
	for (var i = 0, timestamp = new Date().getTime(); i < 7; i++ , timestamp += 24 * 60 * 60 * 1000) {
		var myDate = new Date(timestamp);
		var y = myDate.getUTCFullYear();
		var m = myDate.getUTCMonth() + 1;
		var d = myDate.getUTCDate();
		var day = myDate.getDay();

		var extra = 100.0 * y + m - 190002.5;
		var rjd = 367.0 * y;
		rjd -= Math.floor(7.0 * (y + Math.floor((m + 9.0) / 12.0)) / 4.0);
		rjd += Math.floor(275.0 * m / 9.0);
		rjd += d;

		rjd += 1721013.5;
		rjd -= 0.5 * extra / Math.abs(extra);
		rjd += 0.5;
		rjd -= 2400000.5;
		epg_week[i] = ("00" + m).slice(- 2) + "/" + ("00" + d).slice(- 2) + " " + str_epg_day[day];
		//epg_week[i]=("00" + m).slice( - 2)+"/"+("00" + d).slice( - 2)+" "+rjd;
	}
	$("#asw_" + EPG.ED + "_area").html("");
	this.date_dat = epg_week;
	this.firstarea_build(this.date_dat, this.first_status);
};

EPG.prototype.refresh_date = function () {
	for (var i = 0, timestamp = new Date().getTime(); i < 7; i++ , timestamp += 24 * 60 * 60 * 1000) {
		var myDate = new Date(timestamp);
		var y = myDate.getUTCFullYear();
		var m = myDate.getUTCMonth() + 1;
		var d = myDate.getUTCDate();
		var day = myDate.getDay();

		epg_week[i] = ("00" + m).slice(- 2) + "/" + ("00" + d).slice(- 2) + " " + str_epg_day[day];
		$(".egd_text:eq(" + i + ")").html(epg_week[i]);
	}
	this.date_dat = epg_week;
	this.setevent("refresh_date")
}

EPG.prototype.setchannel = function (data) {

	$("#asw_" + EPG.EC + "_area").html("");
	this.channel_dat = data;
	this.secondarea_build(data, this.second_status);
};
EPG.prototype.setevent = function (data) {
	//printf_toDebug(data);
	{
		var c = this.second_sel + 1;
		var eve;
		if ((typeof testObj != 'undefined') && (typeof testObj.app_get_event_list_info != 'undefined')) {
			if (typeof testObj.app_get_event_list_info == "function") {
				//printf_toDebug("channel = " + c);
				eve = testObj.app_get_event_list_info(c, 1, this.first_sel, 1, 1000);
				if (typeof eve != 'undefined') {
					console.log("123");
					if (eve == null) {
						$("#asw_" + EPG.EE + "_area").html("");
						return;
					}
					else {
						eve = JSON.parse(eve);
					}
				}
				printf_toDebug("dat.length = " + eve.length);
			}
		}
		else
			eve = [{ "start_time": { "mjd_date": 57782, "bcd_time": 0 }, "duration": [0, 85, 0], "event_name": "name1" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 65536 }, "duration": [0, 85, 0], "event_name": "name2" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 86016 }, "duration": [0, 85, 0], "event_name": "name3" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 147456 }, "duration": [1, 0, 0], "event_name": "name4" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 208896 }, "duration": [1, 0, 0], "event_name": "name5" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 229376 }, "duration": [0, 85, 0], "event_name": "name6" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 249856 }, "duration": [0, 85, 0], "event_name": "name7" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 270336 }, "duration": [0, 85, 0], "event_name": "name8" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 290816 }, "duration": [0, 85, 0], "event_name": "name9" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 311296 }, "duration": [0, 85, 0], "event_name": "name10" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 331776 }, "duration": [0, 85, 0], "event_name": "name11" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 208896 }, "duration": [0, 85, 0], "event_name": "name12" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 352256 }, "duration": [0, 85, 0], "event_name": "name13" },
			{ "start_time": { "mjd_date": 57782, "bcd_time": 372736 }, "duration": [0, 85, 0], "event_name": "name14" }];
	}

	$("#asw_" + EPG.EE + "_area").html("");
	this.event_dat = eve;
	this.thirdarea_build(eve, this.third_status);
	if (this.third_status == 0)
		this.refresh()
};

EPG.prototype.help = function () {
	var str = '<img src="img/red.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_record + '</span>'
		+ '<img src="img/blue.gif"  class="help_icon_rec" /><span class="help_text"> ' + MB_ORDER_title_str + '</span>'
		+ '<img src="img/pre_page.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_back + '</span>'
		+ '<img src="img/icon.gif"  class="help_icon_cir " /><span class="help_text"> ' + str_confirm + '</span>';
	$("#asw_egh_area").html(str);
};

EPG.prototype.refresh = function () {
	if ((this.date_dat) && (this.channel_dat))
		//var str = "D:" + this.date_dat[this.first_sel] + "C:" + this.channel_dat[this.second_sel] + "E:" + this.third_sel;
		$("#egi_title").html(this.event_dat[this.third_sel]["event_name"]);

	var t = get_event_time(this.event_dat[this.third_sel]["start_time"], this.event_dat[this.third_sel]["duration"]);
	EPG.SetProgress(t);

	if (typeof this.event_dat[this.third_sel]["short_event"] == "string")
		$("#egi_text").html(this.event_dat[this.third_sel]["short_event"]);
}
EPG.prototype.addbg = function () {
	var str = '<div id="epg_title"  class="title"></div><div class="time"></div><div id="epg_dbg"></div>';
	$("#pbg_epg").html(str);
	$("#epg_title").html(str_epg_title);

	str = "";
	for (var i = 0; i < 5; i++) {
		str += '<div class="egc_bg"></div>';
	}
	$("#abg_egc_area").html(str);

	str = "";
	for (var i = 0; i < 5; i++) {
		str += '<div class="ege_bg"></div>';
	}
	$("#abg_ege_area").html(str);


}
EPG.prototype.addinfo = function () {
	var str = '<div id="egi_head">'
		+ '<div id="egi_icon"></div>'
		+ '<div id="egi_title"></div>'
		+ '<div id="epg_event_progress">'
		+ ' <div id="epg_pevent_stime"></div>'
		+ ' <div id="epg_pevent_ctime"></div>'
		+ ' <div id="epg_pevent_etime"></div>'
		+ ' <div id="epg_progress_bg">'
		+ '<div id="epg_progress_show"></div></div>'
		+ '</div></div>';
	str += '<div id="egi_text"></div>';
	$("#asw_egi_area").html(str);
	//$("#egi_title").html(str_epg_info_title);
	//$("#egi_text").html(str_epg_info_text)
}
EPG.prototype.appear = function () {
	$(".bg4").hide();
	$(".bg5").hide();
	if ((typeof testObj != 'undefined')&&(typeof testObj.set_video_window != 'undefined'))
    	testObj.set_video_window(2,125,155,687,387);
}
EPG.prototype.disappear = function () {
	$(".bg4").show();
	$(".bg5").show();
	if ((typeof testObj != 'undefined')&&(typeof testObj.set_video_window != 'undefined'))
    	testObj.set_video_window(0,0,0,1920,1080);
}
EPG.prototype.firstarea_build = function (data, flag) {
	var area_cfg = {
		"value": 0,
		"dx": 1,
		"dy": 5
	}
	var en_str = "CONTROL_ENABLE";
	if (flag == 1) {
		en_str = "CONTROL_ENABLE";
	}
	else {
		en_str = "CONTROL_DISABLE";
	}
	this.first_area = new Area(this, EPG.ED, "DISPLAY_SHOW", en_str, "SELECT_YES", area_cfg);
	var second_cfg = {
		"value": 0
	}
	for (var i = 0; i < data.length; i++) {
		if (i == 0) new Button(this, EPG.ED, EPG.ED + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
		else new Button(this, EPG.ED, EPG.ED + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
	}
	if (flag == 1) {
		this.first_area.AreaCreate()
	}
	else {
		this.first_area.obj_active()
	}

}
EPG.prototype.secondarea_build = function (data, flag) {
	var area_cfg = {
		"value": 0,
		"dx": 1,
		"dy": 5
	}
	var en_str = "CONTROL_ENABLE";
	if (flag == 1) {
		en_str = "CONTROL_ENABLE";
	}
	else {
		en_str = "CONTROL_DISABLE";
	}

	this.second_area = new Area(this, EPG.EC, "DISPLAY_SHOW", en_str, "SELECT_YES", area_cfg);
	var second_cfg = {
		"value": 0
	}

	if ((typeof data != 'undefined') && (data) && (data.length > 0)) {
		for (var i = 0; i < data.length; i++) {
			if (i == 0) new Button(this, EPG.EC, EPG.EC + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
			else new Button(this, EPG.EC, EPG.EC + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
		}
	}

	if (flag == 1) {
		this.second_area.AreaCreate()
	}
	else {
		this.second_area.obj_active()
	}
}
EPG.prototype.thirdarea_build = function (data, flag) {
	var area_cfg = {
		"value": 0,
		"dx": 1,
		"dy": 5
	}
	var en_str = "CONTROL_ENABLE";
	if (flag == 1) {
		en_str = "CONTROL_ENABLE";
	}
	else {
		en_str = "CONTROL_DISABLE";
	}

	this.third_area = new Area(this, EPG.EE, "DISPLAY_SHOW", en_str, "SELECT_YES", area_cfg);
	var second_cfg = {
		"value": 0
	}

	var str = "";
	for (var i = 0; i < 5; i++) {
		str += '<div class="ege_bg"></div>';
	}
	$("#abg_ege_area").html(str);

	if ((typeof data != 'undefined') && (data) && (data.length > 0)) {
		for (var i = 0; i < data.length; i++) {
			if (i == 0) new Button(this, EPG.EE, EPG.EE + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
			else new Button(this, EPG.EE, EPG.EE + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
		}

		if (flag == 1) {
			this.third_area.AreaCreate()
		}
		else {
			this.third_area.obj_active()
		}
	}
}

EPG.prototype.item_create = function (type, id) {
	var name = id;
	if (type == EPG.ED) {
		name = this.date_dat[id]
	}
	if (type == EPG.EC) {
		if (this.channel_dat[id]["channel_name"])
			name = this.channel_dat[id]["channel_name"];
		else
			name = this.channel_dat[id];
	}

	if (type == EPG.EE) {
		//var start_time = Time_Convert_Orig_to_Td(this.event_dat[id]["start_time"]);
		var t = get_event_time(this.event_dat[id]["start_time"], this.event_dat[id]["duration"]);
		var stime = ("00" + t.start.hour).slice(- 2) + ":";
		stime += ("00" + t.start.min).slice(- 2);
		var etime = ("00" + t.end.hour).slice(- 2) + ":";
		etime += ("00" + t.end.min).slice(- 2);
		var time_str = stime + "-" + etime;
		name = time_str + "  " + this.event_dat[id]["event_name"];
		var str = '<div class="' + type + '_item"><div class="' + type + '_text">' + name + '</div>' + '<img src="img/icon_none.gif" class="ege_book_icon"></img>';
		$("#asw_" + type + "_area").append(str);
		//var t = get_event_time(this.event_dat[id]["start_time"],this.event_dat[id]["duration"]);
		return;
	}

	var str = '<div class="' + type + '_item"><div class="' + type + '_text">' + name + '</div>';
	$("#asw_" + type + "_area").append(str)
}
EPG.prototype.area_specialevent = function (event) {
	var cate = event.cate;
	var kind = event.kind;
	var value = event.value;
	var name = event.name;
	if (cate == "DISPLAY") {
		this.area_do(kind, name, value)
	}
	if (cate == "OP_EVENT") {
		if (kind == "OP_OUT") {
			this.PageExit(1)
		}
		if (kind == "OP_OUT_RIGHT") {
			if (name == EPG.ED) {
				if (this.second_area._items.length <= 0)
					return;
				this.first_area.obj_active();
				this.first_status = 0;
				this.second_area.obj_noactive();
				this.second_status = 1;
			}
			if (name == EPG.EC) {
				this.second_area.obj_active();
				this.second_status = 0;
				this.third_area.obj_noactive();
				this.third_status = 1;
			}
		}
		if (kind == "OP_OUT_LEFT") {
			if (name == EPG.EC) {
				this.second_area.obj_active();
				this.second_status = 0;
				this.first_area.obj_noactive();
				this.first_status = 0;
			}
			if (name == EPG.EE) {
				this.third_area.obj_active();
				this.third_status = 0;
				this.second_area.obj_noactive();
				this.second_status = 1;
			}
		}
	}
}
EPG.prototype.area_do = function (kind, type, value) {
	var n = value;
	var i = 0,
		key = '',
		css_val = '';
	var focus_text = {
		"color": "white",
		"background-color": "#e46900"
	};
	var act_text = {
		"color": "white",
		"background-color": "#0177bf"
	};
	var normal_text = {
		"color": "#002740",
		"background-color": "#9da0a5"
	}
	if (kind == "DISPLAY_SELECT") {
		css_val = focus_text
	}
	if (kind == "DISPLAY_NOSELECT") {
		css_val = normal_text
	}
	if (kind == "DISPLAY_ACTIVE") {
		css_val = act_text
	}
	if (!isNaN(n)) {
		if (type == EPG.ED) {
			i = this.first_sel;
			key = type + "_item";
			if (kind == "DISPLAY_SELECT") {
				this.first_sel = value;
				//this.refresh();

				var cur = APP.get().APPCur();
				if (cur && cur.name == "epg")
					this.setevent("area_do");
			}
		}
		if (type == EPG.EC) {
			i = this.second_sel;
			key = type + "_item";
			if (kind == "DISPLAY_SELECT") {
				this.second_sel = value;
				//this.refresh()
				if ((typeof testObj != 'undefined') && (typeof testObj.app_zapping_signal != 'undefined'))
					testObj.app_zapping_signal(5, this.second_sel + 1, 1);

				var cur = APP.get().APPCur();
				if (cur && cur.name == "epg")
					this.setevent("area_do");
			}

			if (kind == "DISPLAY_ACTIVE") {
				this.setevent("DISPLAY_ACTIVE area_do");
			}
		}
		if (type == EPG.EE) {
			i = this.third_sel;
			key = type + "_item";
			if (kind == "DISPLAY_SELECT") {
				this.third_sel = value;
				this.refresh()
			}

			if (kind == "DISPLAY_ACTIVE") {
				//printf_toDebug("DISPLAY_ACTIVE third_sel = " + this.third_sel);
				var t = get_event_time(this.event_dat[this.third_sel]["start_time"], this.event_dat[this.third_sel]["duration"]);
				EPG.SetProgress(t);
			}
		}
		$("." + key + ":eq(" + n + ")").css(css_val);
		if (value > 4) {
			var a = (0 - (value - 4) * 50) + "px";
			var top_css = {
				"top": a
			};
			$("#asw_" + type + "_area").css(top_css)
		} else {
			var top_css = {
				"top": "0px"
			};
			$("#asw_" + type + "_area").css(top_css)
		}
	}
}
EPG.prototype.item_specialevent = function (event) {
	var cate = event.cate;
	var kind = event.kind;
	var value = event.value;
	var name = event.name;
	if (cate == "OP_EVENT") {
		if (kind == "OP_DO") {
			var id = parseInt(name.split("_")[1]);
			var name = name.split("_")[0];
			if (name == EPG.EE) {
				this.Order()
			}
			if (name == EPG.EC) {
				var select = this.second_sel;
				$("#egi_text").html("Channel change:" + select)
			}
		}
	}
	if (cate == "DOM") {
		if (kind == "DOM_BUILD") {
			var id = parseInt(name.split("_")[1]);
			var name = name.split("_")[0];
			this.item_create(name, id)
		}
	}
}
EPG.prototype.onspecialkey = function (event) {
	var code = event.code
	switch (code) {
		case KEYS.ZERO: {
			APP.get().BackToPlayer();
		}
			break;

		case KEYS.ONE:
			{
				empty_Debug();
			}
			break;

		case KEYS.TWO:
			var a = GetChannelTotal();
			if (a > 0) {
				GetAllChannel();
				play_last_channel();
			}
			break;
		case KEYS.THREE:
		case KEYS.FOUR:
		case KEYS.FIVE:
		case KEYS.SIX:
		case KEYS.SEVEN:
		case KEYS.EIGHT:
			this.third_area.AreaSelect(code - KEYS.ZERO);
			break;

		case KEYS.NINE:
			{
				printf_toDebug("app_get_pf_event");
				var dat = '';
				if ((typeof testObj != 'undefined') && (typeof testObj.app_get_pf_event != 'undefined')) {
					dat = JSON.parse(testObj.app_get_pf_event(1, 1, 0));
					printf_toDebug(typeof dat);
					printf_toDebug(dat);
				}
				else
					dat = '';
				printf_toDebug(JSON.stringify(dat));
			}
			break;


		case KEYS.PAGE_UP:
			var sel = 0;
			if (this.third_status == 1)
				sel = this.third_sel;
			if (!isNaN(this.third_sel))
				sel -= EPG.PAGE_MAX;
			if (sel < 0)
				this.third_sel = 0;
			this.third_area.AreaSelect(sel);
			break;

		case KEYS.PAGE_DOWN:
			var sel = 0;
			if (this.third_status == 1)
				sel = this.third_sel;
			if (!isNaN(this.third_sel))
				sel += EPG.PAGE_MAX;
			if (sel > this.event_dat.lenth)
				this.third_sel = this.event_dat.lenth;
			this.third_area.AreaSelect(sel);
			break;


	}

}
EPG.prototype.Order = function (id) {
	var o = {};
	o.title_str = MB_ORDER_title_str;
	o.context_str = MB_ORDER_TYPE_str;
	o.defchoose = 0;
	o.dispear = 0;
	o.choose = new Array();
	o.choose.push(MB_ORDER_TYPE0_str);
	o.choose.push(MB_ORDER_TYPE1_str);
	var select = "Date:" + this.first_sel + " Channel: " + this.second_sel + ' Event: ' + this.third_sel;
	$("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_event">' + select + '</div><div id="msg_context">' + o.context_str + '</div></div></div>');
	MessageBox.get().set(o);
	MessageBox.get().addEventListener(QEvent.MB_0, this, this.Order0);
	MessageBox.get().addEventListener(QEvent.MB_1, this, this.Order1);
	this.app.APPSelect("messagebox", 1)
}
EPG.prototype.Order0 = function () {
	var select = this.first_sel + "/" + this.second_sel + '/' + this.third_sel;
	$("#egi_text").html("Book One:" + select)
}
EPG.prototype.Order1 = function () {
	var select = this.first_sel + "/" + this.second_sel + '/' + this.third_sel;
	$("#egi_text").html("Book All:" + select)
}

EPG.SetProgress = function (time, startstr, endstr) {
	var start = time.start;
	var end = time.end;
	var curstamp = Date.parse(cur = new Date());
	var startstamp = Date.parse(new Date(start.year, start.month - 1, start.date, start.hour, start.min, start.sec));
	var endstamp = Date.parse(new Date(end.year, end.month - 1, end.date, end.hour, end.min, end.sec));
	//curstamp = startstamp + 2000000; //for test
	//cur = new Date(curstamp);//for test
	var progress = 0;
	var ctime = "";
	if (curstamp > startstamp && curstamp <= endstamp) {
		progress = parseInt((curstamp - startstamp) / (endstamp - startstamp) * 100);
		var ctime = ("00" + cur.getHours()).slice(- 2) + ":";
		ctime += ("00" + cur.getMinutes()).slice(- 2);
	}
	var num = parseInt(656 * progress / 100);
	var ml = 0;
	if (num > 80)
		ml = num - 80;

	if ((60 * 3 + ml) > 656)
		ml = 476;

	$("#epg_progress_show").css({ "width": num + "px" });
	$("#epg_pevent_ctime").css({ "margin-left": ml + "px" });
	if (arguments.length < 3) {
		var t = time;
		var stime = ("00" + t.start.hour).slice(- 2) + ":";
		stime += ("00" + t.start.min).slice(- 2);
		var etime = ("00" + t.end.hour).slice(- 2) + ":";
		etime += ("00" + t.end.min).slice(- 2);
		$("#epg_pevent_stime").html(stime);
		$("#epg_pevent_etime").html(etime);
	}
	else {
		$("#epg_pevent_stime").html(startstr);
		$("#epg_pevent_etime").html(endstr);
	}
	$("#epg_pevent_ctime").html(ctime);
}

function printf_toDebug(mes) {
	if (!($("#debug").is(':hidden'))) {
		var ss = $("#debug").html();
		$("#debug").html(ss + "<br>" + mes);
	}
}

function empty_Debug() {
	if (!($("#debug").is(':hidden')))
		$("#debug").html("");
}

