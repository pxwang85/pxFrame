


function OrderList(app, show) {
    page.call(this, app, "orderlist", show)
}

OrderList.prototype = new page();

OrderList.GetRecs = function () {
    return g_dat;
}


OrderList.recist = '<div class="item" ptype="list" v-for="item in lists"><div class="rt_flag">{{ item.id }}</div><div class="rt_title">123</div><div class="rt_durning">42423</div><div class="rt_time">123123123</div></div>';

OrderList.Create_first = function (handle, dat) {
    APP.get().APPGet("orderlist").firstarea_build();
}

OrderList.ORL = "orl";

OrderList.prototype.init = function () {
    this.first_sel = 0;
    this.dat = OrderList.GetRecs();
    this.addbg();
    this.fir_snd = new SND("asw_" + OrderList.ORL + "_area", OrderList.recist, OrderList.Create_first);
    this.fir_snd.refresh(this.dat);
};

OrderList.prototype.addbg = function () {
    var bg_str = '';
    for (var j = 0; j < 10; j++) { bg_str += '<div class="item_bg"></div>'; }
    var str = '<div class="title">' + str_orderlist_title + '</div><div class="time"></div><div id="orderlist_dbg">' + bg_str + '</div></div>';
    $("#pbg_" + this.name).html(str);
}


OrderList.prototype.appear = function () {
}
OrderList.prototype.disappear = function () {
}

OrderList.prototype.firstarea_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 10
    }
    this.first_area = new Area(this, OrderList.ORL, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "value": 0
    }
    for (var i = 0; i < this.dat.length; i++) {
        new Button(this, OrderList.ORL, "or_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
    }
    this.first_area.AreaCreate()
}
OrderList.prototype.ml_Focus = function (value) {
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
        $("#asw_" + OrderList.ORL + "_area").Normal(this.second_sel);
        this.second_sel = value;
        $("#asw_" + OrderList.ORL + "_area").Select(this.second_sel);
    }
}

OrderList.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {
        if (name == OrderList.ORL) {
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

OrderList.prototype.item_specialevent = function (event) {
}

OrderList.prototype.onspecialkey = function (event) {
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