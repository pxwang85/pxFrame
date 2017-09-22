
Player.instance;


Player.OKLIST_TEMPLATE = '<div class="item" v-for="item in lists":id="item.name" ptype="chlist"><div class="item_text">{{ item.name }}</div></div>';
Player.CHOOSE_TEMPLATE = '<div class="item" v-for="item in lists":id="item.id" ptype="chlist"><div class="item_text">{{ item.name }}</div></div>';

Player.eMUTE_STATE_OFF = 0;
Player.eMUTE_STATE_ON = 1;

Player.GetOkList = function () {
	
	return [{"id":1,"name":"aaa", "num": 1},
		{"id":2,"name":"bbb", "num": 2}];//Program.get().GetAllChannel(0);
}

Player.GetFavOkList = function () {
	
	return [{"id":1,"name":"ccc", "num": 1},
		{"id":2,"name":"ddd", "num": 2}];
}


Player.Oklist_refresh = function () {
    Player.get().channellist_build();
}

Player.choose_refresh = function () {
    Player.get().secondarea_build();
}


var favdat = [
    { "id": "tvlist", "name": "TV LIST" },
    { "id": "favlist", "name": "FAV LIST" }
];


Player.setoklist = function () {
    this.ol_snd.refresh(gst);
}

Player.get = function () {
    return Player.instance
};

function Player(app, show) {
    page.call(this, app, "Player", show)
}

Player.prototype = new page();

Player.prototype.init = function () {
    Player.instance = this;

    this.program = Program.get();

    this.ol_snd = new SND("asw_pll_area", Player.OKLIST_TEMPLATE, Player.Oklist_refresh);
    this.RefreshOKList(0);
    this.oc_snd = new SND("asw_plc_area", Player.CHOOSE_TEMPLATE, Player.choose_refresh);
    this.oc_snd.refresh(favdat);


    this.addbg();
    this.firstarea_build();

	this.app_msg_status = 0;
    this.list_show = 0;
	this.list_type = 0;
    this.switch_num = -1;
    this.isMute = Plugin.get().db_get_last_mute_state();
    this.channel_total = this.program.GetChannelTotal();

    if (this.channel_total && this.program.PlayLastChannel() != 0) {
        this.program.ChannelDefault();
    }
    Plugin.get().addCallbackListener(Plugin.APP_NOTIFY, Player.APP_Callback);
    Plugin.get().addCallbackListener(Plugin.CA_NOTIFY, Player.CA_Callback);
    Plugin.get().addCallbackListener(Plugin.EPG_NOTIFY, Player.EPG_Callback);
};

Player.prototype.firstarea_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 1
    }
    this.channel_num = new Area(this, "plv", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "format": "num",
        "value": 0,
        "len": 3
    }
    this.input_channel = new ChannelNum(this, "plv", "player_id", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    this.channel_num.AreaCreate()
}


Player.prototype.addbg = function () {
    var bg_str = '<div id="oklist_bg"><div id="oklist_upicon"></div><div id="oklist_downicon"></div></div>';
    $("#pbg_player").html(bg_str);
}




Player.prototype.secondarea_build = function () {
    if (this.choose_list)
        this.choose_list.obj_noselect();

    var len = favdat.length;
    var area_cfg = { "value": 0, "dx": 1, "dy": 10 }
    this.choose_list = new Area(this, "plc", "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_YES", area_cfg);
    for (var i = 0; i < len; i++) {
        new Button(this, "plc", favdat[i].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO")
    }
    this.choose_list.obj_active();
}


Player.prototype.channellist_build = function () {

    if (this.channel_list)
        this.channel_list.obj_noselect();

    var len = Gstate.channellist.length;
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 10
    };
    this.channel_list = new Area(this, "pll", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "value": 0
    };

	if(this.dat && this.dat.length > 0) {
	    for (var i = 0; i < this.dat.length; i++) {
	        new Button(this, "pll", "pl_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
	    }
    }
	else {
		new Button(this, "pll", "pl_null", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
	}
    
	if(this.choose_list && this.choose_list.obj_is_enable()) {
		this.channel_list.obj_active();
    }
	else {
    this.channel_list.AreaCreate();
}
}


Player.prototype.appear = function () {
    Player.Hide_oklist();
    this.channel_total = this.program.GetChannelTotal();
    if (this.channel_total <= 0) {
        //this.app.APPSelect("mainmenu", 0);
        return;
    }
    Player.Show_ban_info();

}
Player.prototype.disappear = function () {
    Player.Hide_ban_info();
    Player.Hide_oklist();
}

Player.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;

    if (cate == "DISPLAY") {
        this.area_do(kind, name, value);
    }

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            if (name == "plc" || name == "pll") {
                
                Player.Hide_oklist();
                Player.Show_ban_info();
            }
            else if (name == "plv") {
                this.app.APPSelect("mainmenu", 0);
            }

        }

        if (kind == "OP_OUT_RIGHT") {
            if (name == "plc" && this.dat && this.dat.length > 0) {
                this.choose_list.obj_active();
                this.choose_list.obj_disable();
                this.channel_list.obj_noactive();
                this.channel_list.obj_enable();
            }
        }
        if (kind == "OP_OUT_LEFT") {
            if (name == "pll") {
                this.choose_list.obj_enable();
                this.choose_list.obj_noactive();
                this.channel_list.obj_active();
                this.channel_list.obj_disable();
            }
        }
    }
}

Player.prototype.area_do = function (kind, type, value) {
    if (!isNaN(value)) {
        switch (kind) {
            case "DISPLAY_SELECT":
                {
				if(this.list_show) {
                    clearTimeout(this.oklisthandle);
                    this.oklisthandle = setTimeout(Player.Hide_oklist, 5 * 1000);
				}
				
                    if (value > 9) {
                        var a = (0 - (value - 9) * 50) + "px";
                        var top_css = { "top": a };
                        $("#asw_" + type + "_area").css(top_css);
                    }
                    else {
                        var top_css = { "top": "0px" };
                        $("#asw_" + type + "_area").css(top_css);
                    }
				if(type == "plc") {
					this.RefreshOKList(value);
				}
                    $("#asw_" + type + "_area").Select(value);
                } break;
            case "DISPLAY_NOSELECT": {
                $("#asw_" + type + "_area").Normal(value);
            } break;
            case "DISPLAY_ACTIVE": {
                $("#asw_" + type + "_area").Active(value);
            } break;
            case "DISPLAY_SHOW": {
                if (type == "pll") {
                    this.list_show = 1;
                }
                $("#a_" + type + "_area").show();
            } break;
            case "DISPLAY_HIDE": {
                if (type == "pll") {
                    this.list_show = 0;
                }
                $("#a_" + type + "_area").hide();
            } break;
        }

    }
}

Player.prototype.item_specialevent = function (event) {
    var itype = event.itype;
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DOM") {
        if (kind == "DOM_BUILD") {
            if (name == "player_id") {
                //this.showchannel_num(value);
            }
        }
    }

    if (cate == "DISPLAY") {
        if (kind == "DISPLAY_SELECT") {
            if (name == "player_id") {
                this.showchannel_num(value);
            }
        }
    }

    if (cate == "OP_EVENT") {
        if (name == "player_id") {
            if (kind == "OP_DO") {
                if (this.channel_num)
                    this.channel_num.obj_disable();

                if (this.channel_list)
                    this.channel_list.obj_enable();

                Player.Hide_ban_info();
                this.show_oklist();
            }
            else if (kind == "OP_CHANEL_CHANGE") {
                Player.ChannelNum_change();                
            }
            else if (kind == "OP_CHANEL_NOCHANGE") {
                Player.ChannelNum_nochange();                
            }
        }
        if (kind == "OP_DO") {

			if(this.list_show != 0 && name.substring(0, 3) == "pl_") {
				
				var index = parseInt(name.substring(3));
				if(!isNaN(index) && this.dat && this.dat.length > index) {
					this.ChannelSwitch(this.dat[index].id);
					Player.Hide_oklist();
				}
			}
        }
    }
}

Player.prototype.showchannel_num = function (num) {
    $("#player_number").show();
    clearTimeout(this.numberhandle);
    this.switch_num = num;
    this.numberhandle = setTimeout(Player.ChannelNum_timeout, 5 * 1000);
    $("#player_number").html(num);
}

Player.ChannelNum_timeout = function(){    
    var player = Player.get();
    player.input_channel.obj_out_type("OP_EXIT");			
    player.input_channel.obj_out_type("OP_CHANEL_CHANGE");
}

Player.ChannelNum_nochange = function(){    
    var player = Player.get();

    clearTimeout(player.numberhandle);
    player.input_channel.obj_clean();
    $("#player_number").hide();
    $("#player_number").html("");
}

Player.ChannelNum_change = function () {
    var player = Player.get();        
    var change_num = parseInt($("#player_number").html());

    clearTimeout(player.numberhandle);    
    player.input_channel.obj_clean();
    $("#player_number").hide();
    $("#player_number").html("");   

    console.log("change",change_num);
    player.ChannelSwitch(change_num);
}

Player.prototype.show_oklist = function () {
    $("#a_plc_area").show();
    $("#a_pll_area").show();
    $("#oklist_bg").show();

    clearTimeout(this.oklisthandle);
    this.oklisthandle = setTimeout(Player.Hide_oklist, 5 * 1000);
}

Player.Hide_oklist = function () {
	var player = Player.get();
	
    $("#a_plc_area").hide();
    $("#a_pll_area").hide();
    $("#oklist_bg").hide();
    player.list_show = 0;

    if (Player.get().channel_num)
        Player.get().channel_num.obj_enable();

    if(player.choose_list) {

		if(player.choose_list.obj_value_get() != player.list_type) {
			player.choose_list.obj_noactive();
			player.choose_list.obj_value_set(player.list_type);
			player.RefreshOKList(player.list_type);
		}
		
		player.choose_list.obj_active();
	    player.choose_list.obj_disable();
	    player.channel_list.obj_noactive();
	    player.channel_list.obj_enable();
	}
	
    if (player.channel_list)
    	player.channel_list.obj_disable();
	
    clearTimeout(player.oklisthandle);
}



Player.prototype.show_eventinfo = function () {
    $("#player_banner").show();
    $("#player_info").show();
    clearTimeout(this.timehandle);
    this.timehandle = setTimeout(Player.Hide_ban_info, 5 * 1000);
}

Player.Show_ban_info = function () {
    Player.get().program.RefreshStatus();
    $("#player_banner").show();
    clearTimeout(Player.get().timehandle);
    Player.get().timehandle = setTimeout(Player.Hide_ban_info, 5 * 1000);
}

Player.Hide_ban_info = function () {
    clearTimeout(this.timehandle);
    $("#player_banner").hide();
    $("#player_info").hide();

}

Player.prototype.ChannelSwitch = function (num) {
    this.program.ChannelSwitch(num);
    Player.Show_ban_info();
}

Player.prototype.onspecialkey = function (event) {
    if (this.list_show == 0) {
        this.normal_key(event);
    }
}

Player.prototype.normal_key = function (event) {
    var code = event.code;

    switch (code) {

        case KEYS.NUM0:
            {
                Player.Show_ban_info();
            }
            break;
            case KEYS.NUM2:
            {
                this.app.view_show();
                this.app.APPSelect("epg", 0);
            }
            break;
        case KEYS.NUM1:
            {
                this.show_eventinfo();
            }
            break;
			
		case KEYS.NUM4:Player.get().APP_MsgCtrl
			Player.get().APP_MsgCtrl(Player.AP_TUNER_LOCK);
            break;
		case KEYS.NUM5:
			Player.get().APP_MsgCtrl(Player.AP_TUNER_UNLOCK);
            break;
		case KEYS.NUM6:
			Player.get().APP_MsgCtrl(Player.AP_PROGRAM_INTERRUPT);
            break;
		case KEYS.NUM7:
			Player.get().APP_MsgCtrl(Player.AP_PROGRAM_NORMAL);
            break;
		
        case KEYS.NUM8: {
            this.PE_lock();
        }
            break;
        case KEYS.NUM9: {
            this.MB_Nofity();
        }
            break;

        case KEYS.UP:
            {
                this.program.ChannelUp();
                Player.Show_ban_info();
            }
            break;

        case KEYS.DOWN:
            {
                this.program.ChannelDown();
                Player.Show_ban_info();
            }
            break;

		case KEYS.LEFT:
        {
            this.volume_set(2);
        }
        break;

        case KEYS.RIGHT:
        {
            this.volume_set(1);
        }
        break;

        case KEYS.MUTE:
            {
                this.isMute = DvbPlayer.get().volume_mute();
            }
            break;
    }
}

Plugin.prototype.volume_up;

Player.volume_show = function (str) {
    $("#player_volume").show();
	clearTimeout(Player.get().volhandle);
    Player.get().volhandle = setTimeout(Player.volume_hide, 2 * 1000);
}

Player.volume_hide = function () {
	clearTimeout(Player.get().volhandle);
    $("#player_volume").hide();
}

Player.prototype.volume_pro = function (val) {
	var max = 31;
	if(val > max) {
		val = max;
	}
	$("#volume_pro").pxSetProgress(parseInt(parseInt(val)*100 / 31), 600);
}

Player.prototype.volume_set = function (type) {
    var volume;

	if(type == 1)
		volume = Plugin.get().volume_up();
	else if(type == 2)
		volume = Plugin.get().volume_down();
	else
		return;
	this.volume_pro(volume);
	Player.volume_show();
}

Player.prototype.notify_str = function (str) {
    $("#player_notify_context").html(str);
    $("#player_notify").show();
}

Player.prototype.notify_hide = function () {
    $("#player_notify_context").html('');
    $("#player_notify").hide();
}

Player.TUNER_UNLOCK_STR       = "&#x7121;&#x4FE1;&#x865F;";
Player.PROGRAM_INTERRUPT_STR  = "&#x7BC0;&#x76EE;&#x4E2D;&#x65B7;";
Player.CA_MSG_STR             = "CA MSG";
Player.prototype.APP_MsgCtrl = function (type) {
	
    if(Player.AP_PROGRAM_NORMAL == type) {
		this.app_msg_status = 0;
	}
	else if(Player.AP_TUNER_LOCK == type) {
		this.app_msg_status = (this.app_msg_status & ~(1 << 3));
	}
	else if(Player.AP_TUNER_UNLOCK == type) {
		this.app_msg_status = (this.app_msg_status | (1 << 3));
	}
	else if(Player.AP_PROGRAM_INTERRUPT == type) {
		this.app_msg_status = (this.app_msg_status | (1 << 2));
	}

	if(this.app_msg_status & (1 << 3)) {
		this.notify_str(Player.TUNER_UNLOCK_STR);
	}
	else if(this.app_msg_status & (1 << 2)) {
		this.notify_str(Player.PROGRAM_INTERRUPT_STR);
	}
	else if(this.app_msg_status & (1 << 1)) {
		this.notify_str(Player.CA_MSG_STR);
	}
	else {
		this.notify_hide();
	}
}

Player.prototype.notify_hide = function () {
    $("#player_notify_context").html('');
    $("#player_notify").hide();
}

Player.prototype.pe_correct = function () {
    alert("pe_correct");

}

Player.prototype.pe_error = function () {
    alert("pe_error");
}


Player.prototype.PE_lock = function () {
    var o = {};
    o.title_str = PE_ENTER_PINCODE_str;
    o.pin_val = "1234";
    o.try_times = 3;
    $("#pbg_pincode").html('<div id="pincode_bg"><div id="pe_order"><div id="pe_order_head"><div id="pe_title">' + o.title_str + '</div></div><div id="pe_context">' + '' + '</div></div></div>');
    Pincode.get().set(o);
    Pincode.get().addEventListener(QEvent.PE_ERROR, this, this.pe_error);
    Pincode.get().addEventListener(QEvent.PE_CORRECT, this, this.pe_correct);
    this.app.APPSelect("pincode", 1)
}

Player.prototype.MB_Nofity = function () {
    var o = {};
    o.title_str = MB_ERROR_MESSAGE_str;
    o.context_str = MB_ERROR_CONTEXT_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(CONFIRM_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_error">' + "Error:#1678" + '</div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.notify);
    this.app.APPSelect("messagebox", 1)
}

Player.prototype.notify = function () {

}

Player.prototype.RefreshOKList = function (type) {

	if(type == 0)
		this.dat = Player.GetOkList();
	else if(type == 1)
		this.dat = Player.GetFavOkList();
	else
		this.dat = new Array();
    this.ol_snd.refresh(this.dat);
}

Player.prototype.SelectOKList = function () {

	if(this.channel_list) {
		var sel = 0;
		var channel = this.program.GetCurChannel();
		if(channel) {
			for(var i in this.dat) {
				if(this.dat[i].id == channel.id) {
					sel = i;
				}
			}
		}
		this.channel_list.AreaSelect(sel);
	}
}


Player.AP_PARENT_LOCK = 1;
Player.AP_CHANNEL_LOCK = 2;
Player.AP_TUNER_UNLOCK = 4;
Player.AP_PROGRAM_INTERRUPT = 5;
Player.AP_TUNER_LOCK = 7;
Player.AP_PROGRAM_NORMAL = 9;
Player.AP_PARENT_UNLOCK = 13;
Player.AP_CHANNEL_UNLOCK = 14;
Player.AP_NIBBLE_LOCK = 15;
Player.AP_NIBBLE_UNLOCK = 16;

Player.APP_Callback = function (obj) {
    switch (obj.app_message_type) {
        case Player.AP_PARENT_LOCK:
            this.PE_lock();
            break;
        case Player.AP_CHANNEL_LOCK:
            this.PE_lock();
            break;
        case Player.AP_TUNER_UNLOCK:
        case Player.AP_PROGRAM_INTERRUPT:
        case Player.AP_TUNER_LOCK:
        case Player.AP_PROGRAM_NORMAL:
			Player.get().APP_MsgCtrl(obj.app_message_type);
            break;
        case Player.AP_PARENT_UNLOCK:
            break;
        case Player.AP_CHANNEL_UNLOCK:
            break;
        case Player.AP_NIBBLE_LOCK:
            this.PE_lock();
            break;
        case Player.AP_NIBBLE_UNLOCK:
            break;
    }
}

Player.CA_Callback = function (obj) {
    console.log("CA_Callback !!!trca_errmsg:" + obj.trca_errmsg);
}

Player.EPG_Callback = function (obj) {


}



