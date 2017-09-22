
function Mail(app, show) {
    page.call(this, app, "Mail", show)
}

Mail.prototype = new page();

Mail.GetMails = function () {
    return g_dat;
}

Mail.maillist = '<div class="item" ptype="list" v-for="item in lists"><div class="ml_id">{{ item.id }}</div><div class="ml_status">{{ item.status }}</div><div class="ml_title">{{ item.title }}</div><div class="ml_time">{{ item.time }}</div></div>';
Mail.mailcontent = '<div class="itemc" ptype="list" v-for="itemc in lists"><div class="ml_content">{{itemc.content}}</div></div>';

Mail.Create_first = function () {
    APP.get().APPGet("mail").firstarea_build();
}

Mail.Create_second = function (handle, dat) {
    APP.get().APPGet("mail").secondarea_build();
}

Mail.MLL = "mll";
Mail.MLA = "mla";

Mail.prototype.init = function () {
    this.first_sel = 0;
	this.first_status = 1;
	this.second_status = 0;
    this.dat = Mail.GetMails();
    this.addbg();
    this.fir_snd = new SND("asw_" + Mail.MLL + "_area", Mail.maillist, Mail.Create_first);
    this.fir_snd.refresh(this.dat);
    this.firstarea_build();
    this.sec_snd = new SND("asw_" + Mail.MLA + "_area", Mail.mailcontent, Mail.Create_second);
    this.sec_snd.refresh([{"content":str_epg_info_text}]);
	this.secondarea_build();
	$("#a_mla_area").hide();
	this.sethelp();
};

Mail.prototype.addbg = function () {
	var str = "";
    str = '<div id="mail_title" class="title">' + str_mail_title + '</div><div class="time"></div><div id="mail_help"><div class="help"></div></div>';
    $("#pbg_" + this.name).html(str);


	var mail_title_text = '<div class="ml_id">'+str_order_num+'</div><div class="ml_status">'+str_state+'</div><div class="ml_title">'+str_title+'</div><div class="ml_time">'+str_receipt_time+'</div>';
    var bg_str = '';
    for (var j = 0; j < 10; j++) { bg_str += '<div class="item_bg"></div>'; }
	str = '';
	str = '<div class="empty"></div>';
	str += '<div id="mail_title_dbg">'+mail_title_text+'</div><div id="mail_dbg">' + bg_str + '</div>'
	$("#abg_mll_area").html(str);

	str = '<div class="empty"></div>';
	str = '<div id="mail_content_title_dbg"><div class="ml_title"></div></div><div id="mail_content_dbg"><div id = "mail_content_time">2017-05-18 11:58</div></div>'
	$("#abg_mla_area").html(str);
}


Mail.prototype.appear = function () {
}
Mail.prototype.disappear = function () {
}

Mail.prototype.firstarea_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 10
    }
    this.first_area = new Area(this, "mll", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "value": 0
    }
    for (var i = 0; i < this.dat.length; i++) {
            new Button(this, Mail.MLL, Mail.MLL + "_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
    }
    this.first_area.AreaCreate()
}
Mail.prototype.secondarea_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 1
    }
    this.second_area = new Area(this, "mla", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "value": 0
    }
    new Button(this, Mail.MLA, Mail.MLA + "_" + 0, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
    this.second_area.AreaCreate()
}
Mail.prototype.ml_Focus = function (value) {
    if (value > 9) {
        var a = (0 - (value - 9)*50+52)+"px";
        var top_css = { "top": a };
        $("#asw_mll_area").css(top_css);
    }
    else {
        var top_css = {"top":"52px"};
        $("#asw_mll_area").css(top_css);
    }
    if (!isNaN(value)) {
        $("#asw_" + Mail.MLL + "_area").Normal(this.second_sel);
        this.second_sel = value;
        $("#asw_" + Mail.MLL + "_area").Select(this.second_sel);
    }
}

Mail.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {
        if (name == "mll") {
            if (kind == "DISPLAY_SELECT") {
                this.ml_Focus(value)
            }
        }
    }


    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
			if (name == Mail.MLL){
            this.PageExit(1);
        }
            else if (name == Mail.MLA) {
				this.second_area.obj_active();
				this.second_status = 0;
				this.first_area.obj_noactive();
				this.first_status = 1;
				$("#a_mla_area").hide();
				$("#a_mll_area").show();
				this.sethelp();
			}
        }
    }
}

Mail.prototype.item_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;

	if (cate == "OP_EVENT") {
		if (kind == "OP_DO") {
			var id = parseInt(name.split("_")[1]);
			var name = name.split("_")[0];
			if (name == Mail.MLL) {
				this.first_area.obj_active();
				this.first_status = 0;
				this.second_area.obj_noactive();
				this.second_status = 1;
				$("#a_mll_area").hide();
				$("#a_mla_area").show();
				this.sethelp();
			}
		}
	}
}

Mail.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.ZERO:
        case KEYS.ONE:
        case KEYS.TWO:
        case KEYS.THREE:
        case KEYS.FOUR:
        case KEYS.FIVE:
        case KEYS.SIX:
        case KEYS.SEVEN:
        case KEYS.EIGHT:
        case KEYS.NINE:
            {
                this.first_area.AreaSelect(code - KEYS.ZERO);
            }
            break
    }
}
Mail.prototype.sethelp = function() {
	var str = "";
	if(this.first_status ==1) {
		var str = '<img src="img/red.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_delete_all + '</span>'
					+'<img src="img/yellow.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_delete + '</span>'
					+'<img src="img/icon.gif"  class="help_icon_cir " /><span class="help_text"> ' + str_read + '</span>'
					+'<img src="img/pre_page.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_back + '</span>';
	}
	else if(this.second_status ==1){
		var str = '<img src="img/yellow.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_delete + '</span>'					
					+'<img src="img/pre_page.gif"  class="help_icon_rec" /><span class="help_text"> ' + str_back + '</span>';
	}
	$("#mail_help .help").html(str);
};

