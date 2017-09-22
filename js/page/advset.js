function AdvSet(app, show) {
    page.call(this, app, "advset", show)
}

AdvSet.prototype = new page();

AdvSet.ATC = "atc";
AdvSet.ATF = "atf";
AdvSet.ATD = "atd";
AdvSet.ATV = "atv";
AdvSet.ATW = "atw";
AdvSet.ATFD = "atfd";
AdvSet.ATN = "atn";
AdvSet.ATWF = "atwf";
AdvSet.ATCH = "atch";
AdvSet.ATOFF = "atoff";

AdvSet.Choose = '<div class="item" ptype="list" v-for="item in lists":id="item.id"><div class="item_text">{{ item.name }}</div></div>';
AdvSet.Channel = '<div class="item" ptype="list" v-for="item in lists":id="item.id"><div class="item_text">{{ item.name }}</div><div class="item_lock"></div><div class="item_fav"></div></div>';

AdvSet.Display = '<div class="item"  v-for="item in lists":id="item.id" :ptype="item.type">' +
    '<div v-if="item.type == \'select\'"  class="item_text">{{item.name}}</div>' +
    '<div v-else-if="item.type == \'input\'"  class="item_text">{{item.name}}</div>' +
    '<div v-else-if="item.type == \'button\'"  class="button_text">{{item.name}}</div>' +
    '<div v-if="item.type == \'select\'" class="item_area"><div class="sel_left"></div><div class="item_value"><div v-for="opt_item in item.options" class="opt">{{opt_item.value}}</div></div><div class="sel_right"></div></div>' +
    '<div v-else-if="item.type == \'input\'" class="item_area"><div class="item_ivalue">{{item.value}}</div>' +
    '</div>' +
    '</div>';

AdvSet.Create_choose = function () {
    APP.get().APPGet("advset").firstarea_build();
}
AdvSet.Create_Frq = function () {
    APP.get().APPGet("advset").area0_build();
}
AdvSet.Create_Display = function () {
    APP.get().APPGet("advset").area1_build();
}
AdvSet.Create_Video = function () {
    APP.get().APPGet("advset").area2_build();
}
AdvSet.Create_Watch = function () {
    APP.get().APPGet("advset").area3_build();
}

AdvSet.Create_Net = function () {
    APP.get().APPGet("advset").area5_build();
}

AdvSet.Create_Wifi = function () {
    APP.get().APPGet("advset").area6_build();
}

AdvSet.Create_Off = function () {
    APP.get().APPGet("advset").area8_build();
}




AdvSet.Create_chnannel = function () {
    APP.get().APPGet("advset").channnel_build();
}

AdvSet.GetChoose = function () {
    return str_adc_choose;
}

AdvSet.lang_cfg = { "id": "dislang", "type": "select", "name": "Language", "options": [{ "id": 0, "value": "Chinese" }, { "id": 1, "value": "Englist" }, { "id": 2, "value": "Janpanese" }] };
AdvSet.opa_cfg = { "id": "disopacity", "type": "select", "name": "Opactiy", "options": [{ "id": 0, "value": "10%" }, { "id": 1, "value": "50%" }, { "id": 2, "value": "30%" }] };
AdvSet.hide_cfg = { "id": "dishide", "type": "select", "name": "Hide", "options": [{ "id": 0, "value": "1s" }, { "id": 1, "value": "5s" }, { "id": 2, "value": "10s" }] };
AdvSet.confir_cfg = { "id": "discon", "type": "button", "name": "confirm" };

AdvSet.disset_cfg = [AdvSet.lang_cfg, AdvSet.opa_cfg, AdvSet.hide_cfg, AdvSet.confir_cfg];

AdvSet.frq_cfg = { "id": "mainfrq", "type": "input", "name": "FRQ" };
AdvSet.sym_cfg = { "id": "mainsym", "type": "input", "name": "SYM" };
AdvSet.qam_cfg = { "id": "mainqam", "type": "select", "name": "QAM", "options": qam_cfg };
AdvSet.mainfir_cfg = { "id": "maincon", "type": "button", "name": "confirm" };

AdvSet.mainset_cfg = [AdvSet.frq_cfg, AdvSet.sym_cfg, AdvSet.qam_cfg, AdvSet.mainfir_cfg];



AdvSet.decode_cfg = { "id": "vdecode", "type": "select", "name": "Video System", "options": qam_cfg };
AdvSet.size_cfg = { "id": "vsize", "type": "select", "name": "Video Size", "options": qam_cfg };
AdvSet.sound_cfg = { "id": "vsound", "type": "select", "name": "Video Sound", "options": qam_cfg };
AdvSet.format_cfg = { "id": "vormat", "type": "select", "name": "Video Format", "options": qam_cfg };
AdvSet.vfir_cfg = { "id": "vcon", "type": "button", "name": "confirm" };
AdvSet.videoset_cfg = [AdvSet.decode_cfg, AdvSet.size_cfg, AdvSet.sound_cfg, AdvSet.format_cfg, AdvSet.vfir_cfg];


AdvSet.wpincode_cfg = { "id": "wpincode", "name": "pincode" };
AdvSet.wlock_cfg = { "id": "wlock", "name": "Open Lokc" };
AdvSet.wparent_cfg = { "id": "wparent", "name": "Parent Control" };
AdvSet.wtime_cfg = { "id": "wtime","name": "Time control" };
AdvSet.watchset_cfg = [AdvSet.wpincode_cfg, AdvSet.wlock_cfg, AdvSet.wparent_cfg, AdvSet.wtime_cfg];



AdvSet.ndhcp_cfg = { "id": "ndhcp", "type": "input", "name": "DHCP" };
AdvSet.nip_cfg = { "id": "nip", "type": "input", "name": "IP" };
AdvSet.nmask_cfg = { "id": "nmask", "type": "input", "name": "MASK" };
AdvSet.ngate_cfg = { "id": "ngate", "type": "input", "name": "GATE" };
AdvSet.nfdns_cfg = { "id": "nfdns", "type": "input", "name": "DNS" };
AdvSet.nbdns_cfg = { "id": "nbdns", "type": "input", "name": "BAK DNS" };
AdvSet.nfir_cfg = { "id": "nfir", "type": "button", "name": "confirm" };

AdvSet.netset_cfg = [AdvSet.ndhcp_cfg, AdvSet.nip_cfg, AdvSet.nmask_cfg, AdvSet.ngate_cfg, AdvSet.nfdns_cfg, AdvSet.nbdns_cfg, AdvSet.nfir_cfg];


AdvSet.wfon_cfg = { "id": "wfon", "type": "select", "name": "WIFI ON/OFF", "options": [{ "id": 0, "value": "10%" }, { "id": 1, "value": "50%" }, { "id": 2, "value": "30%" }] };
AdvSet.wffir_cfg = { "id": "wffir", "type": "button", "name": "confirm" };
AdvSet.wfset_cfg = [AdvSet.wfon_cfg, AdvSet.wffir_cfg];

AdvSet.offchoose_cfg = { "id": "offchoose", "type": "select", "name": "Auto OFF", "options": [{ "id": 0, "value": "10%" }, { "id": 1, "value": "50%" }, { "id": 2, "value": "30%" }] };
AdvSet.offfir_cfg = { "id": "offfir", "type": "button", "name": "confirm" };
AdvSet.offset_cfg = [AdvSet.offchoose_cfg, AdvSet.offfir_cfg];

AdvSet.prototype.init = function () {

    this.dat = AdvSet.GetChoose();
    this.ch_dat = pdat;

    this.carea = [];
    this.first_sel = 0;

    this.carea[3] = undefined;
    this.carea[4] = undefined;
    this.carea[5] = undefined;
    this.carea[6] = undefined;



    this.frq_snd = new SND("asw_" + AdvSet.ATF + "_area", AdvSet.Display, AdvSet.Create_Frq);
    this.frq_snd.refresh(AdvSet.mainset_cfg);
    this.fir_snd = new SND("asw_" + AdvSet.ATD + "_area", AdvSet.Display, AdvSet.Create_Display);
    this.fir_snd.refresh(AdvSet.disset_cfg);


    this.video_snd = new SND("asw_" + AdvSet.ATV + "_area", AdvSet.Display, AdvSet.Create_Video);
    this.video_snd.refresh(AdvSet.videoset_cfg);

    this.watch_snd = new SND("asw_" + AdvSet.ATW + "_area", AdvSet.Choose, AdvSet.Create_Watch);
    this.watch_snd.refresh(AdvSet.watchset_cfg);


    this.net_snd = new SND("asw_" + AdvSet.ATN + "_area", AdvSet.Display, AdvSet.Create_Net);
    this.net_snd.refresh(AdvSet.netset_cfg);

    this.wifi_snd = new SND("asw_" + AdvSet.ATWF + "_area", AdvSet.Display, AdvSet.Create_Wifi);
    this.wifi_snd.refresh(AdvSet.wfset_cfg);


    

    this.chedit_snd = new SND("asw_" + AdvSet.ATCH + "_area", AdvSet.Channel, AdvSet.Create_chnannel);
    this.chedit_snd.refresh(this.ch_dat);

    this.wifi_snd = new SND("asw_" + AdvSet.ATOFF + "_area", AdvSet.Display, AdvSet.Create_Off);
    this.wifi_snd.refresh(AdvSet.offset_cfg);


    this.choose_snd = new SND("asw_" + AdvSet.ATC + "_area", AdvSet.Choose, AdvSet.Create_choose);
    this.choose_snd.refresh(this.dat);


    this.addbg();

};

AdvSet.prototype.addbg = function () {
    var bg_str = '';
    for (var j = 0; j < 10; j++) { bg_str += '<div class="item_bg"></div>'; }
    var str = '<div id="adt_title"  class="title">' + str_advset_title + '</div><div class="time"></div><div id="adt_dbg">' + bg_str + '</div></div>';
    $("#pbg_advset").html(str);
}

AdvSet.prototype.appear = function () { }
AdvSet.prototype.disappear = function () { }

AdvSet.prototype.firstarea_build = function () {
    var len = this.dat.length;
    var area_cfg = { "value": 0, "dx": 1, "dy": 10 }
    this.first_area = new Area(this, AdvSet.ATC, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = { "value": 0 }
    for (var i = 0; i < len; i++) {
        new Button(this, AdvSet.ATC, this.dat[i].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    }
    this.first_area.AreaCreate();
}

AdvSet.prototype.channnel_build = function () {
    if (this.carea[7])
        this.carea[7].obj_noselect();
    var len = this.ch_dat.length;
    var area_cfg = { "value": 0, "dx": 1, "dy": 10 }
    var second_area = new Area(this, AdvSet.ATCH, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_YES", area_cfg);
    for (var i = 0; i < len; i++) {
        new Button(this, AdvSet.ATCH, this.ch_dat[i].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    }
    this.carea[7] = second_area;
}


AdvSet.prototype.area0_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, AdvSet.ATF, "DISPLAY_SHOW", "CONTROL_DISABLE", "SELECT_NO", area_cfg);

    var second_cfg = { "format": "num", "value": 128, "len": 3, "min": 105, "max": 999 };
    new Input(this, AdvSet.ATF, AdvSet.mainset_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    var third_cfg = { "format": "num", "value": 6875, "len": 4 }
    new Input(this, AdvSet.ATF, AdvSet.mainset_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", third_cfg);
    var forth_cfg = { "value": 4, "total": 5, "direction": "hor" }
    new Select(this, AdvSet.ATF, AdvSet.mainset_cfg[2].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Button(this, AdvSet.ATF, AdvSet.mainset_cfg[3].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea[0] = second_area;
}

AdvSet.prototype.area1_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, AdvSet.ATD, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);
    var forth_cfg = { "value": 0, "total": 3, "direction": "hor" }
    new Select(this, AdvSet.ATD, AdvSet.disset_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Select(this, AdvSet.ATD, AdvSet.disset_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Select(this, AdvSet.ATD, AdvSet.disset_cfg[2].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Button(this, AdvSet.ATD, AdvSet.disset_cfg[3].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea[1] = second_area;

}

AdvSet.prototype.area2_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, AdvSet.ATV, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);
    var forth_cfg = { "value": 0, "total": 3, "direction": "hor" }
    new Select(this, AdvSet.ATV, AdvSet.videoset_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Select(this, AdvSet.ATV, AdvSet.videoset_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Select(this, AdvSet.ATV, AdvSet.videoset_cfg[2].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);    
    new Select(this, AdvSet.ATV, AdvSet.videoset_cfg[3].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Button(this, AdvSet.ATV, AdvSet.videoset_cfg[4].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea[2] = second_area;

}

AdvSet.prototype.area3_build = function () {
    var len = AdvSet.watchset_cfg.length;
    var area_cfg = { "value": 0, "dx": 1, "dy": 10 }
    var second_area = new Area(this, AdvSet.ATW, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_YES", area_cfg);
    for (var i = 0; i < len; i++) {
        new Button(this, AdvSet.ATW, AdvSet.watchset_cfg[i].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    }
    this.carea[3] = second_area;
}


AdvSet.prototype.area5_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, AdvSet.ATN, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);

    var second_cfg = { "format": "num", "value": 128, "len": 3, "min": 105, "max": 999 };
    new Input(this, AdvSet.ATN, AdvSet.netset_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    new Input(this, AdvSet.ATN, AdvSet.netset_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    new Input(this, AdvSet.ATN, AdvSet.netset_cfg[2].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    new Input(this, AdvSet.ATN, AdvSet.netset_cfg[3].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    new Input(this, AdvSet.ATN, AdvSet.netset_cfg[4].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    new Input(this, AdvSet.ATN, AdvSet.netset_cfg[5].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    new Button(this, AdvSet.ATN, AdvSet.netset_cfg[6].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea[5] = second_area;
}

AdvSet.prototype.area6_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, AdvSet.ATWF, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);

    var forth_cfg = { "value": 0, "total": 3, "direction": "hor" }
    new Select(this, AdvSet.ATWF, AdvSet.wfset_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Button(this, AdvSet.ATWF, AdvSet.wfset_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea[6] = second_area;
}

AdvSet.prototype.area8_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 5 }
    var second_area = new Area(this, AdvSet.ATOFF, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);

    var forth_cfg = { "value": 0, "total": 3, "direction": "hor" }
    new Select(this, AdvSet.ATOFF, AdvSet.offset_cfg[0].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", forth_cfg);
    new Button(this, AdvSet.ATOFF, AdvSet.offset_cfg[1].id, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO");
    this.carea[8] = second_area;
}





AdvSet.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {
        this.area_do(kind, name, value);
        if (kind == "DISPLAY_SELECT") {
            if (name == AdvSet.ATC) {
                this.first_sel = value;
                if (typeof this.carea[value] != 'undefined') {
                    this.carea[value].obj_show();
                }
            }
        }
        else if (kind == "DISPLAY_NOSELECT") {
            if (name == AdvSet.ATC) {
                if (typeof this.carea[value] != 'undefined') {
                    this.carea[value].obj_hide();
                }
            }
        }
    }

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            if (name == AdvSet.ATC) {
                this.PageExit(1);
            }
            else if (name != AdvSet.ATC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.first_area.obj_noactive();
                    this.carea[this.first_sel].obj_disable();
                    this.carea[this.first_sel].obj_noselect();
                }

            }
        }

        if (kind == "OP_OUT_RIGHT") {
            if (name == AdvSet.ATC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.first_area.obj_active();
                    this.carea[this.first_sel].obj_enable();
                    this.carea[this.first_sel].obj_doselect();
                }
            }
        }
        if (kind == "OP_OUT_LEFT") {
            if (name == AdvSet.ATC) {
                this.PageExit(1);
            }
            else {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.carea[this.first_sel].obj_disable();
                    this.carea[this.first_sel].obj_noselect();
                    this.first_area.obj_noactive();
                }
            }
        }
    }
}

AdvSet.prototype.area_do = function (kind, type, value) {
    if (!isNaN(value)) {
        switch (kind) {
            case "DISPLAY_SELECT":
                {
                    if (type == AdvSet.ATCH) {
                        if (value > 8) {
                            $("#asw_" + type + "_area").css({ "top": (0 - (value - 8) * 50) + "px" });
                        }
                        else {
                            $("#asw_" + type + "_area").css({ "top": "0px" });
                        }
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
                $("#a_" + type + "_area").show();
            } break;
            case "DISPLAY_HIDE": {
                $("#a_" + type + "_area").hide();
            } break;
        }

    }
}


AdvSet.prototype.item_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    var itype = event.itype;

    if (cate == "OP_EVENT") {
        if (kind == "OP_DO") {
            switch (name) {
                case "factory_default": {
                    this.PE_lock();
                } break;
                case "maincon": {
                    this.MB_Setting_Frq();
                } break;
            }
        }
    }
    if (cate == "DISPLAY") {
        if ((kind == "DISPLAY_SELECT") || (kind == "DISPLAY_SHOW")) {
            $("#" + name).SetValue(value);
        }
    }

}

AdvSet.prototype.onspecialkey = function (event) {
    var code = event.code;
}


AdvSet.prototype.MB_Setting_Frq = function () {
    var o = {};
    o.title_str = MB_SETTING_title_str;
    o.context_str = MB_SETTING_MAINFRQ_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(MB_SEARCH_TYPE0_str);
    o.choose.push(MB_SEARCH_TYPE1_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.mfrq_save);
    MessageBox.get().addEventListener(QEvent.MB_1, this, this.cancel);
    this.app.APPSelect("messagebox", 1)
}

AdvSet.prototype.mfrq_save = function () {
    var a = this.page_itemvalue_get("mainfrq");
    var b = this.page_itemvalue_get("mainsym");
    var c = this.page_itemvalue_get("mainqam");
    console.log("db_save", a, b, c);
}

AdvSet.prototype.cancel = function () {

}

AdvSet.prototype.MB_Setting_FactoryDef = function () {
    var o = {};
    o.title_str = MB_SETTING_title_str;
    o.context_str = MB_SETTING_FACTORYDEF_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(MB_SEARCH_TYPE0_str);
    o.choose.push(MB_SEARCH_TYPE1_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.facdef);
    MessageBox.get().addEventListener(QEvent.MB_1, this, this.cancel);
    this.app.APPSelect("messagebox", 1)
}

AdvSet.prototype.facdef = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.app_setdefault != 'undefined'))
        testObj.app_setdefault();
}

AdvSet.prototype.pe_correct = function () {
    this.MB_Setting_FactoryDef();

}

AdvSet.prototype.pe_error = function () {
    alert("pe_error");
}


AdvSet.prototype.PE_lock = function () {
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