
ProSearch.instance;
ProSearch.get = function () {
    return ProSearch.instance
};

function ProSearch(app, show) {
    page.call(this, app, "prosearch", show)
}


ProSearch.prototype = new page();
ProSearch.PSC = "psc";
ProSearch.PSA = "psa";
ProSearch.PSM = "psm";
ProSearch.PSR = "psr";

ProSearch.Choose = '<div class="item" ptype="list" v-for="item in lists":id="item.id"><div class="item_text">{{ item.name }}</div></div>';


ProSearch.Display = '<div class="item"  v-for="item in lists":id="item.id" :ptype="item.type">' +
    '<div v-if="item.type == \'select\'"  class="item_text">{{item.name}}</div>' +
    '<div v-else-if="item.type == \'input\'"  class="item_text">{{item.name}}</div>' +
    '<div v-else-if="item.type == \'button\'"  class="button_text">{{item.name}}</div>' +
    '<div v-if="item.type == \'select\'" class="item_area"><div class="sel_left"></div><div class="item_value"><div v-for="opt_item in item.options" class="opt">{{opt_item.value}}</div></div><div class="sel_right"></div></div>' +
    '<div v-else-if="item.type == \'input\'" class="item_area"><div class="item_ivalue">{{item.value}}</div>' +
    '</div>' +
    '</div>';

ProSearch.frq_cfg = { "id": "manufrq", "type": "input", "name": "ManualFRQ" };
ProSearch.sym_cfg = { "id": "manusym", "type": "input", "name": "ManualSYM" };
ProSearch.qam_cfg = { "id": "manuqam", "type": "select", "name": "ManualQAM", "options": qam_cfg };
ProSearch.manufir_cfg = { "id": "manucon", "type": "button", "name": "confirm" };

ProSearch.manualfrq_cfg = [ProSearch.frq_cfg, ProSearch.sym_cfg, ProSearch.qam_cfg, ProSearch.manufir_cfg];

ProSearch.Create_choose = function () {
    APP.get().APPGet("prosearch").firstarea_build();
}

ProSearch.Create_Frq = function () {
    APP.get().APPGet("prosearch").area1_build();
}

ProSearch.GetChoose = function () {
    return str_ps_choose;
}

ProSearch.prototype.init = function () {
    ProSearch.instance = this;

    this.dat = ProSearch.GetChoose();

    this.first_sel = 0;
    this.searching = 0;
    this.carea = [];

    this.all = 0;
    this.tv = 0;
    this.radio = 0;

    this.addbg();
    this.carea[0] = undefined;

    this.frq_snd = new SND("asw_" + ProSearch.PSM + "_area", ProSearch.Display, ProSearch.Create_Frq);
    this.frq_snd.refresh(ProSearch.manualfrq_cfg);
    this.area2_build();

    this.choose_snd = new SND("asw_" + ProSearch.PSC + "_area", ProSearch.Choose, ProSearch.Create_choose);
    this.choose_snd.refresh(this.dat);

};

ProSearch.prototype.refresh = function () {

}

ProSearch.prototype.addbg = function () {
    var bg_str = '';
    for (var j = 0; j < 10; j++) {
        bg_str += '<div class="item_bg"></div>';
    }
    var str = '<div id="ps_title"  class="title"></div><div class="time"></div><div id="ps_dbg">' + bg_str + '</div></div>';
    $("#pbg_prosearch").html(str);
    $("#ps_title").html(str_ps_title);

    str = '<div id="search_ret"><div id="search_up">' +
        '<div id="search_title">' +
        '<div class="search_tit"></div>' +
        '<div class="search_tit"><div class="search_text0">' + ALL_PROGRAM_str + ':</div><div id="s_all" class="search_text1">0</div></div>' +
        '<div class="search_tit"><div class="search_text0">' + TV_str + ':</div><div id="s_tv" class="search_text1">0</div></div>' +
        '<div class="search_tit"><div class="search_text0">' + RADIO_str + ':</div><div id="s_radio"  class="search_text1">0</div></div>' +
        '<div class="search_tit"><div class="search_text0">' + INPUT_FRQ_str + ':</div><div id="s_frq" class="search_text1">405</div></div>' +
        '<div class="search_tit"><div class="search_text0">' + SQMBL_str + ':</div><div id="s_smb" class="search_text1">5217</div></div>' +
        '<div class="search_tit"><div class="search_text0">' + QAM_str + ':</div><div id="s_qam" class="search_text1">256QAM</div></div>' +
        '</div>' +
        '<div id="search_tv"><div class=".search_tv_title">' + TV_str + '</div><div id="search_tv_title_area"><div id="search_tv_title_area_sw"></div></div></div>' +
        '<div id="search_radio"><div class=".search_radio_title">' + RADIO_str + '</div><div id="search_radio_title_area"><div id="search_radio_title_area_sw"></div></div></div>' +
        '</div><div id="search_down">' +
        '<div class="search_do"><div class="search_pr">' + SEARCH_PROGRESS_str + '</div><div id="ps_pro" class="ps_progress"><div class="progr_bg"><div class="progr_show"></div></div><div class="progr_val">50%</div></div></div>' +
        '<div class="search_do"><div class="search_pr">' + SINGAL_STRENG + '</div><div id="ps_streng" class="ps_progress"><div class="progr_bg"><div class="progr_show"></div></div><div class="progr_val">50%</div></div></div>' +
        '<div class="search_do"><div class="search_pr">' + SINGAL_QUITY + '</div><div id="ps_qua" class="ps_progress"><div class="progr_bg"><div class="progr_show"></div></div><div class="progr_val">50%</div></div></div>' +
        '</div>' +
        '</div>';
    $("#asw_psr_area").html(str);

}

ProSearch.prototype.appear = function () {
    DvbPlayer.get().stop_play_dvb();
    DvbPlayer.get().blank_window();
}
ProSearch.prototype.disappear = function () {
}

ProSearch.prototype.firstarea_build = function () {
    var len = this.dat.length;
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 };
    this.first_area = new Area(this, ProSearch.PSC, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    for (var i = 0; i < str_ps_choose.length; i++) {
        new Button(this, ProSearch.PSC, this.dat[i].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    }
    this.first_area.AreaCreate()
}


ProSearch.prototype.area1_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, ProSearch.PSM, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);
    var second_cfg = { "format": "num", "value": 714, "len": 3, "min": 105, "max": 999 }
    new Input(this, ProSearch.PSM, ProSearch.manualfrq_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    var third_cfg = { "format": "num", "value": 6875, "len": 4 }
    new Input(this, ProSearch.PSM, ProSearch.manualfrq_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", third_cfg);

    var forth_cfg = { "value": 0, "total": qam_cfg.length, "direction": "hor" }
    new Select(this, ProSearch.PSM, ProSearch.manualfrq_cfg[2].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Button(this, ProSearch.PSM, ProSearch.manualfrq_cfg[3].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea.push(second_area);
}

ProSearch.prototype.area2_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, ProSearch.PSR, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);
    new Button(this, ProSearch.PSR, ProSearch.PSR + "_button_0", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_NO");
    this.thirdarea = second_area;
    second_area.AreaCreate();
}





ProSearch.prototype.item_create = function (handle, kind, type, id, value) {
}


ProSearch.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {

        this.area_do(kind, name, value);
        if (kind == "DISPLAY_SELECT") {
            if (name == ProSearch.PSC) {
                this.first_sel = value;
                if (typeof this.carea[value] != 'undefined') {
                    this.carea[value].obj_show();
                }
            }
        }
        else if (kind == "DISPLAY_NOSELECT") {
            if (name == ProSearch.PSC) {
                if (typeof this.carea[value] != 'undefined') {
                    this.carea[value].obj_hide();
                }

            }
        }

    }

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            if (name == ProSearch.PSC) {
                this.PageExit(1);
            }
        }

        if (kind == "OP_OUT_RIGHT") {
            if (name == ProSearch.PSC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.first_area.obj_active();
                    this.carea[this.first_sel].obj_enable();
                    this.carea[this.first_sel].obj_doselect();
                }
            }
        }
        if (kind == "OP_OUT_LEFT") {
            if (name != ProSearch.PSC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.carea[this.first_sel].obj_disable();
                    this.carea[this.first_sel].obj_noselect();
                    this.first_area.obj_noactive();
                }

            }
        }
        if (kind == "OP_OUT") {
            if (name != ProSearch.PSC) {
                if (this.searching != 0) {
                    this.MB_Interput();
                    return;
                }
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.first_area.obj_noactive();
                    this.carea[this.first_sel].obj_disable();
                    this.carea[this.first_sel].obj_noselect();
                }

            }
        }
    }
}

ProSearch.prototype.area_do = function (kind, type, value) {
    if (!isNaN(value)) {
        switch (kind) {
            case "DISPLAY_SELECT": {
                $("#asw_" + type + "_area").Select(value);
            } break;
            case "DISPLAY_NOSELECT": {
                $("#asw_" + type + "_area").Normal(value);
            } break;
            case "DISPLAY_ACTIVE": {
                $("#asw_" + type + "_area").Active(value);
            } break;
            case "DISPLAY_SHOW": {
                $("#a_" + type + "_area").show();
            } break;
            case "DISPLAY_HIDE": {
                $("#a_" + type + "_area").hide();
            } break;
        }

    }
}


ProSearch.prototype.item_specialevent = function (event) {
    var itype = event.itype;
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            this.PageExit(1);
        }

        if (kind == "OP_DO") {
            var id = parseInt(name.split("_")[1]);
            var type = name.split("_")[0];

            if (name == "auto_search") {
                this.searching = 2;
                this.first_area.obj_active();
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.carea[this.first_sel].obj_active();
                    this.carea[this.first_sel].obj_hide();
                }
                this.thirdarea.obj_show();
                this.thirdarea.obj_noactive();

                this.all = 0;
                this.tv = 0;
                this.radio = 0;

                $("#s_all").html(this.all);
                $("#s_tv").html(this.tv);
                $("#s_radio").html(this.radio);

                $("#search_tv_title_area_sw").html("");
                $("#search_radio_title_area_sw").html("");
                var dat = { "type": "auto" };
                Installation.get().search(dat);
            }

            if (name == "manucon") {
                var a = this.page_itemvalue_get("manufrq");
                var b = this.page_itemvalue_get("manusym");
                var c = this.page_itemvalue_get("manuqam");
                this.searching = 1;
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.carea[this.first_sel].obj_active();
                    this.carea[this.first_sel].obj_hide();
                }
                this.thirdarea.obj_show();
                this.thirdarea.obj_noactive();

                this.all = 0;
                this.tv = 0;
                this.radio = 0;

                $("#s_all").html(this.all);
                $("#s_tv").html(this.tv);
                $("#s_radio").html(this.radio);

                $("#search_tv_title_area_sw").html("");
                $("#search_radio_title_area_sw").html("");

                var dat = { "type": "tp", "freq": a * 1000, "symbol": parseInt(b), "qam": c };
                Installation.get().search(dat);
            }

        }
    }

    if (cate == "DISPLAY") {
        if ((kind == "DISPLAY_SELECT") || (kind == "DISPLAY_SHOW")) {
            $("#" + name).SetValue(value);
        }
    }

}

ProSearch.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.NUM8: {
            Installation.search_cb(2)
        }
            break;
    }
}

ProSearch.Finish = function (data) {
    ProSearch.get().MB_Save();
}

ProSearch.Filed = function (data) {
    ProSearch.get().MB_Search_Failed();
}

ProSearch.SetTp = function (data) {
    $("#s_frq").html(data.freq);
    $("#s_smb").html(data.smybol);
    $("#s_qam").html(qam_cfg[data.qam].name);
}

ProSearch.SetProgress = function (val) {
    $("#ps_pro").pxSetProgress(val, 500);
}

ProSearch.SetStrength = function (val) {
    $("#ps_streng").pxSetProgress(val, 500);
}

ProSearch.SetQulity = function (val) {
    $("#ps_qua").pxSetProgress(val, 500);
}

ProSearch.retFresh = function (data) {
    var all_len = data.length;
    ProSearch.get().all += all_len;
    $("#s_all").html(ProSearch.get().all);
    var tv_len = 0;
    var radio_len = 0;

    var tv_str = '', radio_str = '';
    for (var i = 0; i < all_len; i++) {
        if (data[i]["service_type"] == 1) {
            tv_len++;
            tv_str += '<div class="search_program">' + data[i]["channel_name"] + '</div>';
        }
        else {
            radio_str++;
            radio_str += '<div class="search_program">' + data[i]["channel_name"] + '</div>';
        }
    }


    ProSearch.get().tv += tv_len;
    ProSearch.get().radio += radio_len;

    $("#s_tv").html(ProSearch.get().tv);
    $("#s_radio").html(ProSearch.get().radio);

    $("#search_tv_title_area_sw").append(tv_str);
    $("#search_radio_title_area_sw").append(radio_str);

    if (ProSearch.get().tv > 6) {
        var a = (0 - (ProSearch.get().tv - 6) * 50) + "px";
        var top_css = { "top": a };
        $("#search_tv_title_area_sw").css(top_css);
    }
    else {
        var top_css = { "top": "0px" };
        $("#search_tv_title_area_sw").css(top_css);
    }

    if (ProSearch.get().radio > 6) {
        var a = (0 - (ProSearch.get().radio - 6) * 50) + "px";
        var top_css = { "top": a };
        $("#search_radio_title_area_sw").css(top_css);
    }
    else {
        var top_css = { "top": "0px" };
        $("#search_radio_title_area_sw").css(top_css);
    }
}



ProSearch.prototype.MB_Save = function () {
    var o = {};
    o.title_str = MB_SEARCH_title_str;
    o.context_str = MB_SEARCH_Save_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(MB_SEARCH_TYPE0_str);
    o.choose.push(MB_SEARCH_TYPE1_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.Order0);
    MessageBox.get().addEventListener(QEvent.MB_1, this, this.Order1);
    this.app.APPSelect("messagebox", 1)
}


ProSearch.prototype.Order0 = function () {
    this.cancel0();
    Installation.get().save();
    GetAllChannel();
    this.app.APPGet("epg").setchannel(chnanel_info);
}
ProSearch.prototype.Order1 = function () {
    this.thirdarea.obj_active();
    if (typeof this.carea[this.first_sel] != 'undefined') {
        this.carea[this.first_sel].obj_noactive();
        this.carea[this.first_sel].obj_show();
    }
    if (this.searching == 2) {
        if (typeof this.carea[this.first_sel] != 'undefined') {

            this.carea[this.first_sel].obj_active();
        }
        this.first_area.obj_noactive();
    }
    this.searching = 0;
    this.thirdarea.obj_hide();
}

ProSearch.prototype.MB_Search_Failed = function () {
    var o = {};
    o.title_str = MB_SEARCH_title_str;
    o.context_str = MB_SEARCH_FAILED_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(MB_SEARCH_TYPE0_str);
    o.choose.push(MB_SEARCH_TYPE1_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.cancel0);
    MessageBox.get().addEventListener(QEvent.MB_1, this, this.cancel1);
    this.app.APPSelect("messagebox", 1)
}

ProSearch.prototype.MB_Interput = function () {
    var o = {};
    o.title_str = MB_SEARCH_title_str;
    o.context_str = MB_SEARCH_TYPE_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(MB_SEARCH_TYPE0_str);
    o.choose.push(MB_SEARCH_TYPE1_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.cancel0);
    MessageBox.get().addEventListener(QEvent.MB_1, this, this.cancel1);
    this.app.APPSelect("messagebox", 1)
}
ProSearch.prototype.cancel0 = function () {
    Installation.get().stop();
    this.Order1();
}
ProSearch.prototype.cancel1 = function () {

}

