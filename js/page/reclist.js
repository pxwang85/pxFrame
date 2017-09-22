


function RecList(app, show) {
    page.call(this, app, "RecList", show)
}

RecList.prototype = new page();

RecList.GetRecs = function () {
    return new Array();
}


RecList.recist = '<div class="item" ptype="list" v-for="item in lists"><div class="rt_flag">{{ item.id }}</div><div class="rt_title">123</div><div class="rt_durning">42423</div><div class="rt_time">123123123</div></div>';

RecList.Create_first = function (handle, dat) {
    APP.get().APPGet("reclist").firstarea_build();
}

RecList.RTL = "rtl";

RecList.prototype.init = function () {
    this.first_sel = 0;
    this.dat = RecList.GetRecs();
    this.addbg();
    this.fir_snd = new SND("asw_" + RecList.RTL + "_area", RecList.recist, RecList.Create_first);
    this.fir_snd.refresh(this.dat);
    //this.firstarea_build();
};

RecList.prototype.addbg = function () {
    var bg_str = '';
    for (var j = 0; j < 10; j++) { bg_str += '<div class="item_bg"></div>'; }
    var str = '<div id="reclist_title"class="title">' + str_orderlist_title + '</div><div class="time"></div><div id="reclist_dbg">' + bg_str + '</div></div>';
    $("#pbg_" + this.name).html(str);
}


RecList.prototype.appear = function () {
}
RecList.prototype.disappear = function () {
}

RecList.prototype.firstarea_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 10
    }
    this.first_area = new Area(this, "rtl", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "value": 0
    }
    if(this.dat.length == 0)
    {
        new Button(this, "rtl", "ml_ull", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
    }
    else
    {
        for (var i = 0; i < this.dat.length; i++) {
            new Button(this, "rtl", "ml_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
        }
    }
    
    this.first_area.AreaCreate()
}
RecList.prototype.ml_Focus = function (value) {
    if (value > 9) {
        var a = (0 - (value - 9) * 50) + "px";
        var top_css = { "top": a };
        $("#asw_rtl_area").css(top_css);
    }
    else {
        var top_css = { "top": "0px" };
        $("#asw_rtl_area").css(top_css);
    }
    if (!isNaN(value)) {
        $("#asw_" + RecList.RTL + "_area").Normal(this.second_sel);
        this.second_sel = value;
        $("#asw_" + RecList.RTL + "_area").Select(this.second_sel);
    }
}

RecList.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {
        if (name == "rtl") {
            if (kind == "DISPLAY_SELECT") {
                this.ml_Focus(value)
            }
        }
    }


    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            this.PageExit(1);
        }
    }
}

RecList.prototype.item_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;

}

RecList.prototype.onspecialkey = function (event) {
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