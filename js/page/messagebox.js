function MessageBox(app, show) {
    page.call(this, app, "messagebox", show);
}

MessageBox.instance;
MessageBox.get = function () {
    return MessageBox.instance
};

QEvent.MB_ = "MB_";
QEvent.MB_0 = "MB_0";
QEvent.MB_1 = "MB_1";
QEvent.MB_2 = "MB_2";

MessageBox.prototype = new page();
MessageBox.prototype.init = function () {
    this.control1_create()
    MessageBox.instance = this;
}
MessageBox.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.PageExit(0);
            }
            break
    }
}
MessageBox.prototype.control1_create = function () {
    $("#asw_mx_area").html('');
    $("#asw_mx_area").html('<div style="background:green;width:400px;height:300px"></div>')
}
MessageBox.prototype.appear = function () {
}
MessageBox.prototype.disappear = function () {
}


MessageBox.prototype.doclean = function () {
    this.page_event_init();
    this.page_area_clean();
    this.page_item_clean();
}

MessageBox.prototype.set = function (o) {
    this.doclean();
    this.cfg = o;
    $("#asw_mx_area").html('');
    $("#a_mx_area").css({"top":"410px"});
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 5
    }
    var second_area = new Area(this, "mx", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = {
        "value": 0
    }
    var page = this;
    
    var top_val = 410 + (2- o.choose.length)*40;
    $("#a_mx_area").css({"top":top_val+"px"});
    $.each(o.choose, function (i, item) {
        if (i == 0)
            secondselect = new Button(page, "mx", "mx_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
        else
            secondselect = new Button(page, "mx", "mx_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg)
    });
    second_area.AreaCreate();
}

MessageBox.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {
        if ((kind == "DISPLAY_NOSELECT") || (kind == "DISPLAY_SELECT") || (kind == "DISPLAY_ACTIVE") || (kind == "DISPLAY_FOCUSIN")) {
            this.area_do(kind, name, value);
        } else if (kind == "DISPLAY_SHOW")
            $("#a_" + name + "_area").show();

        else if (kind == "DISPLAY_HIDE")
            $("#a_" + name + "_area").hide();

    }

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            if (name == AdvSet.ATC) {

                this.PageExit(1);
            }
        }
    }
}


MessageBox.prototype.item_specialevent = function (event) {
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
            var name = name.split("_")[0];
            var __e = new QEvent(QEvent.MB_+id);
            this.dispatchEvent(__e);
            this.PageExit(1);
        }
    }

    if (cate == "DOM") {
        if (kind == "DOM_BUILD") {
            var id = parseInt(name.split("_")[1]);
            var name = name.split("_")[0];
            this.item_create(name, id);
        }
    }
}
MessageBox.prototype.item_create = function (type, id) {
    var name = id;
    name = this.cfg.choose[id];
    var str = '<div class="' + type + '_item"><div class="' + type + '_text">' + name + '</div>';

    $("#asw_" + type + "_area").append(str)
}

MessageBox.prototype.area_do = function (kind, type, value) {
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
        css_val = focus_text;
    }
    if (kind == "DISPLAY_NOSELECT") {
        css_val = normal_text;
    }
    if (kind == "DISPLAY_ACTIVE") {
        css_val = act_text;
    }

    if (!isNaN(n)) {
            i = this.first_sel;
            key = type+"_item";
            if (kind == "DISPLAY_SELECT") {
                this.first_sel = value;
            }

        $("." + key + ":eq(" + n + ")").css(css_val);

        if (value > 4) {
            var a = (0 - (value - 4) * 50) + "px";
            var top_css = {
                "top": a
            };
            $("#asw_" + type + "_area").css(top_css);
        } else {
            var top_css = {
                "top": "0px"
            };
            $("#asw_" + type + "_area").css(top_css);
        }


    }
}