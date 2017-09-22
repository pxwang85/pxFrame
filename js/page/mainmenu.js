MainMenu.MAX_SHOW = 7;
MainMenu.FOCUS_POS = 5;

MainMenu.MU = "mu";
MainMenu.MUL = "mul";

function MainMenu(app, show) {
    page.call(this, app, "mainmenu", show)
}
MainMenu.prototype = new page();

MainMenu.mainmenu_fir = '<div v-for="(item, index) in lists"><div v-if="index !== 5" class="common"><div class="common_text">{{ item.name }}</div></div><div v-else class="focus"><div class="focus_text">{{ item.name }}</div></div></div>';
MainMenu.mainmenu_sec = '<div class="item" v-for="item in lists":id="item.id" ptype="menu"><div class="list_icon"><img class="in_pic" v-bind:src="item.icon" onerror="nofind();"></div><div class="list_text">{{ item.name }}</div></div>';

MainMenu.GetMainMenu = function () {
    return g_dat;
}

MainMenu.Create_Sec = function () {
    APP.get().APPGet("mainmenu").secondarea_refresh();
}

MainMenu.prototype.appear = function () {
}
MainMenu.prototype.disappear = function () {
}

MainMenu.prototype.init = function () {
    this.dat = MainMenu.GetMainMenu();
    this.addbg();
    this.sec_sel = 0;
    this.fir_snd = new SND("asw_" + MainMenu.MU + "_area", MainMenu.mainmenu_fir,null);
    this.control1_select(0);

    this.sec_snd = new SND("asw_" + MainMenu.MUL + "_area", MainMenu.mainmenu_sec,MainMenu.Create_Sec);
    this.firstarea_build();
};

MainMenu.prototype.addbg = function () {
    $("#pbg_" + this.name).html('<div id="' + MainMenu.MUL + '_bg"><div id="up_arr"></div><div id="left_arr"></div><div id="right_arr"></div></div>');
}

MainMenu.prototype.firstarea_build = function () {
    var area_cfg = { "value": 0, "dx": 1, "dy": 1 };
    var first_area = new Area(this, MainMenu.MU, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var first_cfg = { "value": 0, "total": this.dat.length, "direction": "ver" };
    this.firstselect = new Menu(this, MainMenu.MU, "firstselect", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", first_cfg);
};


MainMenu.prototype.secondarea_refresh = function () {
    var dat = this.dat[this.firsec_index].son;
    var area_cfg = { "value": 2, "dx": 5, "dy": 1 };
    this.second_area = new Area(this, MainMenu.MUL, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var page = this;
    $.each(dat, function (i, item) {
        page.secondselect = new Button(page, MainMenu.MUL, item["id"], "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO")
    });
    this.second_area.AreaCreate();
}

MainMenu.prototype.secondarea_build = function () {
    var dat = this.dat[this.firsec_index].son;
    this.sec_snd.refresh(dat);
    if (this.second_area) this.second_area.obj_noselect();
    (dat.length < 5) ? ($("#asw_" + MainMenu.MUL + "_area").css({ "left": "200px" })) : ($("#asw_mul_area").css({ "left": "0px" }));
};

MainMenu.prototype.control1_select = function (index) {    
    this.first_sel = index;
    this.fir_dat = new Array();
    if (MainMenu.MAX_SHOW > this.dat.length) {
        return;
    } else {
        var start = index + this.dat.length - MainMenu.FOCUS_POS;
        for (var i = 0; i < MainMenu.MAX_SHOW; i++) {
            var id = (start + i) % this.dat.length;
            this.fir_dat.push(this.dat[id]);
        }
    }
    this.fir_snd.refresh(this.fir_dat);    
}

MainMenu.prototype.area_specialevent = function (event) {
    if (event.cate == "OP_EVENT") {
        if (event.kind == "OP_OUT") {
            this.PageExit(1);
        }
    }
    if (event.cate == "DISPLAY") {
        if (event.name == MainMenu.MUL) {
            if (event.kind == "DISPLAY_SELECT") {
                if (!isNaN(event.value)) {
                    $("#asw_" + MainMenu.MUL + "_area").Normal(this.sec_sel);
                    this.sec_sel = event.value;
                    $("#asw_" + MainMenu.MUL + "_area").Select(this.sec_sel);
                }
            }
        }
    }
}

MainMenu.prototype.item_specialevent = function (event) {
    if (event.cate == "OP_EVENT") {
        if (event.kind == "OP_DO") {
            if (event.name != "firstselect") {
                this.app.APPSelect(event.name, 0);
            }
        }
    }

    if (event.cate == "DISPLAY") {
        if (event.kind == "DISPLAY_SELECT") {
            if (event.name == "firstselect") {
                this.control1_select(event.value);
                this.firsec_index = event.value;
                this.secondarea_build()
            }
        }
    }
}

MainMenu.prototype.onspecialkey = function (event) {
    var code = event.code;
}
