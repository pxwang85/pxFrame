function Increase(now, max) {
    return (parseInt(now) == (parseInt(max) - 1)) ? 0 : (parseInt(now) + 1)
}

function Decrease(now, max) {
    return (parseInt(now) == 0) ? (parseInt(max) - 1) : (parseInt(now) - 1)
}

function GoUp(dx, cur, total) {
    if (total == 0) {
        return 0
    }
    if (cur >= dx) {
        cur = cur - dx
    }
    return cur
}

function GoDown(dx, cur, total) {
    if (total == 0) {
        return 0
    }
    cur = cur + dx;
    if (cur >= total) {
        cur = total - 1
    }
    return cur
}

function GoLeft(dx, cur, total) {
    if (total == 0) {
        return 0
    }
    if (cur % dx == 0) {
        cur = cur + dx;
        if (cur > (total - 1)) {
            cur = total
        }
    }
    cur--;
    return cur
}

function GoRight(dx, cur, total) {
    if (total == 0) {
        return 0
    }
    if (cur % dx == dx - 1) {
        cur = cur - dx + 1
    } else if (cur == total - 1) {
        cur = cur - (cur % dx)
    } else {
        cur++
    }
    return cur
}




$.fn.pxSetProgress = function (val, width) {
    var num = width * val / 100 + "px";
    $(this).find(" .progr_val").html(val + "%");
    $(this).find(" .progr_show").css({ "width": num });
}

$.fn.Normal = function (id) {
    var type = '';
    if (!isNaN(id))
        type = $(this).find(".item:eq(" + id + ")").attr("ptype");
    switch (type) {
        case "menu":
            {
                $(this).find(".list_text:eq(" + id + ")").css({ "color": "white" });
                $(this).find(".in_pic:eq(" + id + ")").css({ "border-color": "rgba(0,0,0,0)" });
            }
            break;
        case "list":
            {
                $(this).find(".item:eq(" + id + ")").css({ "color": "#002740", "background-color": "rgba(0,0,0,0)" });
            }
            break;
            case "chlist":
            {
                $(this).find(".item:eq(" + id + ")").css({"background-color": "rgba(0,0,0,0)" });
            }
			break;
			case "select":
			case "input":
            {				
				$(this).find(".item:eq(" + id + ") .item_area").css({ "color": "black","border-color": "black" });
            }
			break;

        case "button":
            {
                $(this).find(".item:eq(" + id + ") .button_text").css({ "color": "#002740", "background-color": "rgba(255,0,0,1)" });
            }
            break;
    }

}

$.fn.Select = function (id) {
    var type = '';
    if (!isNaN(id))
        type = $(this).find(".item:eq(" + id + ")").attr("ptype");
    switch (type) {
        case "menu":
            {
                $(this).find(".list_text:eq(" + id + ")").css({ "color": "rgb(228,106,0)" });
                $(this).find(".in_pic:eq(" + id + ")").css({ "border-color": "rgb(228,106,0)" });
            }
            break;

        case "list":
            {
                $(this).find(".item:eq(" + id + ")").css({ "color": "white", "background-color": "#e46900" });
            }
            break;
            case "chlist":
            {
                $(this).find(".item:eq(" + id + ")").css({ "background-color": "#e46900" });
            }
			break;
		
			case "select":
			case "input":
            {
				$(this).find(".item:eq(" + id + ") .item_area").css({ "color": "#e46900","border-color": "#e46900" });
            }
			break;

        case "button":
            {
                $(this).find(".item:eq(" + id + ") .button_text").css({ "color": "white", "background-color": "#e46900" });
            }
            break;
    }

}

$.fn.FocusIn = function (id) {
    var type = '';
    if (!isNaN(id))
        type = $(this).find(".item:eq(" + id + ")").attr("ptype");
    switch (type) {

        case "button":
            {
                $(this).css({ "color": "white", "background-color": "yellow" });
            }
            break;
    }

}

$.fn.Active = function (id) {
    var type = '';
    if (!isNaN(id))
        type = $(this).find(".item:eq(" + id + ")").attr("ptype");
    switch (type) {
        case "chlist":
        case "list":
        {
            $(this).find(".item:eq(" + id + ")").css({ "color": "white", "background-color": "#0177bf" });
        }
        break;
    }

}

$.fn.SetValue = function (value) {
    switch ($(this).attr("ptype")) {
        case "select":
            {
				$(this).find(".opt").hide();
				$(this).find(".opt:eq("+parseInt(value)+")").show();
            }
			break;
			case "input":
            {
                $(this).find(".item_ivalue").html(value);
            }
			break;			
    }
}


function _aMap() {
    this._value = {};
    this._name = new Array();
}
_aMap.prototype.am_add = function (name, value) {
    var __len = this._name.length;
    this._value[name] = value;
    for (var __i = 0; __i < __len; __i++) {
        if (this._name[__i] == name) {
            return
        }
    }
    this._name.push(name)
}
_aMap.prototype.am_name = function () {
    return this._name
}
_aMap.prototype.am_value = function (name) {
    return this._value[name]
}



function _mTree() {
    this.mt_init();
}
_mTree.prototype.mt_init = function () {
    this._tree = new Array();
}
_mTree.prototype.mt_add = function (value) {
    this._tree.push(value);
}
_mTree.prototype.mt_del = function () {
    this._tree.pop();
}
_mTree.prototype.mt_now = function () {
    return this._tree[this._tree.length - 1];
}


APP.instance = null;

function APP() { }
APP.get = function () {
    if (!APP.instance) APP.instance = new APP();
    return APP.instance
};
/*  Open Function*/
APP.prototype.AppInit = function () {
    this._mtree = new _mTree();
    this._ptree = new _aMap();
    this._curpage = null;
}
APP.prototype.AppTimer = function () {
    TimeShow.get();
}
APP.prototype.APPOnkey = function (code) {
    var __e = new QEvent(QEvent.KEYPRESS);
    __e.code = code;
    if (this._curpage) {
        this._curpage.dispatchEvent(__e);
    }
}

APP.prototype.APPCur = function (name) {
    return this._curpage;
}

APP.prototype.APPGet = function (name) {
    return this._ptree.am_value(name);
}

APP.prototype.BackToPlayer = function () {
    this._curpage = this._ptree.am_value(this._mtree.mt_now());
    while (this._curpage.name != "player") {
        this._curpage.disappear();
        if ((this._curpage) && (this._curpage.name) && (this._curpage.name == "mainmenu")) {
            this.view_hide();
        }
        this._mtree.mt_del();
        this._curpage = this._ptree.am_value(this._mtree.mt_now());
        this._curpage.page_back();
    }
}

APP.prototype.APPSelect = function (name, flag) {
    if (!this._ptree.am_value(name)) {
        return;
    }

    if ((this._curpage) && (flag == 0)) {
        this._curpage.page_front();
    }



    this._mtree.mt_add(name);
    this._curpage = this._ptree.am_value(name);
    this._curpage.page_enter();
    if ((this._curpage) && (this._curpage.name) && (this._curpage.name == "mainmenu")) {
        this.view_show();
    }
}

APP.prototype.app_exit = function (name, flag) {

    this._curpage = this._ptree.am_value(this._mtree.mt_now());
    if (this._curpage.name == name) {

        if ((this._curpage) && (this._curpage.name) && (this._curpage.name == "mainmenu")) {
            this.view_hide();
        }

        this._mtree.mt_del();
        this._curpage = this._ptree.am_value(this._mtree.mt_now());


        if (flag == 1) {
            this._curpage.page_back();
        }


    }

}

APP.prototype.app_add = function (name, obj) {
    this._ptree.am_add(name, obj);
}

APP.prototype.view_show = function () { }
APP.prototype.view_hide = function () { }

page.AEVENT = "AEVENT";
page.IEVENT = "IEVENT";

function page(name, show) {
    if (typeof EventDispatcher == 'undefined')
        throw new Error("EventDispatcher class is missing.");
    this.page_event_init();

    this.app = APP.get();
    this.name = name;
    this.focusitem = '';
    this._area = new _aMap();
    this._area_status = new _aMap();
    this._item = new _aMap();
    this._item_status = new _aMap();
    if (typeof name != 'undefined') {
        this.page_init();
        this.init();
    }
    if (show == 1) {
        this.page_show();
        this.appear()
    }
}
page.prototype.page_event_init = function () {
    EventDispatcher.initialize(this);
    this.addEventListener(QEvent.KEYPRESS, this, this.page_onkey);
    this.addEventListener(page.AEVENT, this, this.area_specialevent);
    this.addEventListener(page.IEVENT, this, this.item_specialevent);
}

page.prototype.page_show = function () {
    $("#p_" + this.name).show();
    $("#pbg_" + this.name).show();
    $("#psw_" + this.name).show();
}

page.prototype.page_hide = function () {
    $("#p_" + this.name).hide();
    $("#pbg_" + this.name).hide();
    $("#psw_" + this.name).hide();
}

page.prototype.page_init = function () {
    this.app.app_add(this.name, this);
}
page.prototype.page_enter = function () {
    this.page_show();
    this.appear();
}
page.prototype.page_exit = function (flag) {    
    this.disappear();
    this.page_hide();
    this.app.app_exit(this.name, flag);
}
page.prototype.page_front = function () {    
    this.disappear();
    this.page_hide();
}
page.prototype.page_back = function () {    
    this.page_show();
}

page.prototype.page_area_add = function (obj) {
    this._area.am_add(obj.obj_name_get(), obj);
    this._area_status.am_add(obj.obj_name_get(), obj.obj_st_get());
    obj.addEventListener(st.EVENT, this, this.page_area_event);
}
page.prototype.page_area_clean = function (obj) {
    this._area = new _aMap();
    this._area_status = new _aMap();
}
page.prototype.page_area_event = function (event) {
    event.type = page.AEVENT;
    this.dispatchEvent(event);
}
page.prototype.page_item_add = function (obj) {
    this._item.am_add(obj.obj_name_get(), obj);
    this._item_status.am_add(obj.obj_name_get(), obj.obj_st_get());
    this._area.am_value(obj.obj_area_get()).area_item_add(obj.obj_st_get());
    obj.addEventListener(st.EVENT, this, this.page_item_event);
}
page.prototype.page_item_clean = function (obj) {
    this._item = new _aMap();
    this._item_status = new _aMap();
}
page.prototype.page_item_event = function (event) {
    if (event.cate == st.OP_EVENT) {
        var name = event.name;
        event.type = Area.MOVE;
        if ((event.kind == st.OP_DO)||(event.kind == st.OP_CHANEL_CHANGE)||(event.kind == st.OP_CHANEL_NOCHANGE)) {
            event.type = page.IEVENT;
            this.dispatchEvent(event);
        } else if ((event.kind == st.OP_ENTER)) {
            this.page_item_enter(name);
            this._area.am_value(this._item_status.am_value(name).st_area_get()).dispatchEvent(event);
        } else if ((event.kind == st.OP_EXIT)) {
            this.page_item_exit(name);
            this._area.am_value(this._item_status.am_value(name).st_area_get()).dispatchEvent(event);
        } else {
            this._area.am_value(this._item_status.am_value(name).st_area_get()).dispatchEvent(event);
        }
    } else {
        event.type = page.IEVENT;
        this.dispatchEvent(event);
    }
}

page.prototype.page_item_enter = function (name) {
    if (this.focusitem == '') this.focusitem = name;
}
page.prototype.page_item_exit = function (name) {
    if (this.focusitem == name) this.focusitem = '';
}
page.prototype.page_item_get = function (name) {
    return this._item;
}
page.prototype.page_itemstatus_get = function (name) {
    return this._item_status.am_value(name);
}

page.prototype.page_itemvalue_get = function (name) {
    return this.page_itemstatus_get(name).st_value_get();
}

page.prototype.page_onkey = function (event) {
    if (this.focusitem != '') {
        this._item.am_value(this.focusitem).onspecialkey(event);
        return
    }
    var __area = this._area.am_name();
    var __that = this;
    var __enable_area = new Array();

    
    $.each(__area, function (i, item) {
        var __a_obj = __that._area.am_value(item);
        if (__a_obj.obj_st_get().st_control_get() == st.CONTROL_ENABLE) {
            __enable_area.push(__a_obj);
        }
    });   
    $.each(__enable_area, function (i, item) {
        item.dispatchEvent(event);
    });    
    this.onspecialkey(event); 
}

page.prototype.PageExit = function (flag) {
    this.page_exit(flag);
}

page.prototype.init = function () { }
page.prototype.appear = function () { }
page.prototype.disappear = function () { }
page.prototype.onspecialkey = function (event) { }
page.prototype.area_specialevent = function (event) { }
page.prototype.item_specialevent = function (event) { }


st.DOM_STATUS = "DOM"
st.DOM_BUILD = "DOM_BUILD";
st.DOM_CREATE = "DOM_CREATE";

st.DISPLAY_STATUS = "DISPLAY";
st.DISPLAY_HIDE = "DISPLAY_HIDE";
st.DISPLAY_SHOW = "DISPLAY_SHOW";


st.DISPLAY_SELECT = "DISPLAY_SELECT";
st.DISPLAY_NOSELECT = "DISPLAY_NOSELECT";
st.DISPLAY_ACTIVE = "DISPLAY_ACTIVE";
st.DISPLAY_FOCUSIN = "DISPLAY_FOCUSIN";

st.CONTROL_STATUS = "CONTROL";
st.CONTROL_DISABLE = "CONTROL_DISABLE";
st.CONTROL_ENABLE = "CONTROL_ENABLE";
st.CONTROL_FOCUSIN = "FOCUS_IN";

st.SELECT_STATUS = "SELECT";
st.SELECT_NO = "SELECT_NO";
st.SELECT_YES = "SELECT_YES";


st.OP_EVENT = "OP_EVENT";
st.OP_ENTER = "OP_ENTER";
st.OP_CHANEL_CHANGE = "OP_CHANEL_CHANGE";
st.OP_CHANEL_NOCHANGE = "OP_CHANEL_NOCHANGE";
st.OP_DO = "OP_DO";
st.OP_EXIT = "OP_EXIT";
st.OP_OUT = "OP_OUT";
st.OP_OUT_UP = "OP_OUT_UP";
st.OP_OUT_DOWN = "OP_OUT_DOWN";
st.OP_OUT_LEFT = "OP_OUT_LEFT";
st.OP_OUT_RIGHT = "OP_OUT_RIGHT";
st.EVENT = "KEVENT"


st.str_page = "page";
st.str_area = "area";
st.str_name = "name";
st.str_type = "type";
st.str_value = "value";
st.str_display = "display";
st.str_control = "control";
st.str_select = "select";




function st(page, area, name, type, value) {
    this._dat = {};
    this._dat[st.str_page] = page;
    this._dat[st.str_area] = area;
    this._dat[st.str_name] = name;
    this._dat[st.str_type] = type;
    this._dat[st.str_value] = value;
    this._dat[st.str_display] = st.DISPLAY_HIDE;
    this._dat[st.str_control] = st.CONTROL_DISABLE;
    this._dat[st.str_select] = st.SELECT_NO;
}
st.prototype.st_area_get = function () {
    return this._dat[st.str_area];
}
st.prototype.st_name_get = function () {
    return this._dat[st.str_name];
}
st.prototype.st_value_get = function () {
    return this._dat[st.str_value];
}
st.prototype.st_value_set = function (value) {
    this._dat[st.str_value] = value;
}

st.prototype.st_display_hide = function () {
    this._dat[st.str_display] = st.DISPLAY_HIDE;
}
st.prototype.st_display_show = function () {
    this._dat[st.str_display] = st.DISPLAY_SHOW;
}

st.prototype.st_control_get = function () {
    return this._dat[st.str_control];
}
st.prototype.st_control_active = function () {
    this._dat[st.str_control] = st.CONTROL_DISABLE;
    this._dat[st.str_display] = st.DISPLAY_ACTIVE;
}
st.prototype.st_control_noactive = function () {
    this._dat[st.str_control] = st.CONTROL_ENABLE;
    this._dat[st.str_display] = st.DISPLAY_SELECT;
}
st.prototype.st_control_disable = function () {
    this._dat[st.str_control] = st.CONTROL_DISABLE;
}
st.prototype.st_control_enable = function () {
    this._dat[st.str_control] = st.CONTROL_ENABLE;
}
st.prototype.st_control_focusin = function () {
    this._dat[st.str_control] = st.CONTROL_FOCUSIN;
    this._dat[st.str_display] = st.DISPLAY_FOCUSIN;
}
st.prototype.st_control_focusout = function () {
    this._dat[st.str_control] = st.CONTROL_ENABLE;
    this._dat[st.str_display] = st.DISPLAY_SELECT;
}

st.prototype.st_select_get = function () {
    return this._dat[st.str_select];
}
st.prototype.st_select_set = function (value) {
    this._dat[st.str_select] = value;
}
st.prototype.st_select_yes = function () {
    this._dat[st.str_select] = st.SELECT_YES;
    this._dat[st.str_display] = st.DISPLAY_SELECT
}
st.prototype.st_select_no = function () {
    this._dat[st.str_select] = st.SELECT_NO;
    this._dat[st.str_display] = st.DISPLAY_NOSELECT
}


function kEvent(name, itype, cate, kind, value) {
    QEvent.call(this, st.EVENT);
    if (typeof name != 'undefined') this.name = name;
    if (typeof itype != 'undefined') this.itype = itype;
    if (typeof cate != 'undefined') this.cate = cate;
    if (typeof kind != 'undefined') this.kind = kind;
    if (typeof value != 'undefined') this.value = value
}


function kobj(page, area, name, type, display, control, select) {
    if (typeof EventDispatcher == 'undefined') throw new Error("EventDispatcher class is missing.");
    EventDispatcher.initialize(this);
    this.addEventListener(QEvent.KEYPRESS, this, this.onkey);
    this._page = page;
    this._name = name;
    this._area = area;
    this._type = type;

    if (typeof page != 'undefined') {
        this._st = new st(page.name, area, name, type, '')
    } else {
        this._st = new st('', '', '', '', '')
    }
}

kobj.HORIZONTAL = "hor";
kobj.VERTICAL = "ver";

kobj.prototype.init = function () {
    this.obj_self_init();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DOM_STATUS, st.DOM_BUILD, this._st.st_value_get()));
}

kobj.prototype.obj_self_init = function () { }


kobj.prototype.obj_area_get = function () {
    return this._area;
}
kobj.prototype.obj_name_get = function () {
    return this._name;
}
kobj.prototype.obj_st_get = function () {
    return this._st;
}

kobj.prototype.obj_build = function () {
    this.dispatchEvent(new kEvent(this._name, this._type, st.DOM_STATUS, st.DOM_CREATE, 0))
}

kobj.prototype.obj_hide = function () {
    this._st.st_display_hide();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_HIDE, 0))
}
kobj.prototype.obj_show = function () {
    this._st.st_display_show();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_SHOW, this._st.st_value_get()))
}
kobj.prototype.obj_noselect = function () {
    this._st.st_select_no();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_NOSELECT, this._st.st_value_get()))
}
kobj.prototype.obj_doselect = function () {
    this._st.st_select_yes();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_SELECT, this._st.st_value_get()))
}
kobj.prototype.obj_noactive = function () {
    this._st.st_control_noactive();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_SELECT, this._st.st_value_get()))
}
kobj.prototype.obj_active = function () {
    this._st.st_control_active();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_ACTIVE, this._st.st_value_get()))
}
kobj.prototype.obj_disable = function () {
    this._st.st_control_disable();
}
kobj.prototype.obj_enable = function () {
    this._st.st_control_enable();
}
kobj.prototype.obj_focusin = function () {
    this._st.st_control_focusin();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_FOCUSIN, this._st.st_value_get()))
}
kobj.prototype.obj_focusout = function () {
    this._st.st_control_focusout();
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_SELECT, this._st.st_value_get()))
}

kobj.prototype.obj_value_set = function (value) {
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_NOSELECT, this._st.st_value_get()))
    this._st.st_value_set(value);
    this.dispatchEvent(new kEvent(this._name, this._type, st.DISPLAY_STATUS, st.DISPLAY_SELECT, this._st.st_value_get()))
}

kobj.prototype.obj_value_get = function () {
    return this._st.st_value_get();
}
kobj.prototype.obj_value_set_only = function (value) {
    this._st.st_value_set(value);
}
kobj.prototype.obj_out_type = function (out_flag) {
    this.dispatchEvent(new kEvent(this._name, this._type, st.OP_EVENT, out_flag, 0))
}


kobj.prototype.onkey = function (event) { }
kobj.prototype.onspecialkey = function (event) { }

function kitem(page, area, name, type, display, control, select, cfg) {
    kobj.call(this, page, area, name, type, display, control, select);
    this.cfg = cfg;
    if (typeof name != 'undefined') {
        this.init()
    }
    if (display == st.DISPLAY_SHOW) {
        this.obj_show()
    }
    if (control == st.CONTROL_ENABLE) {
        this.obj_enable()
    }
    if (select == st.SELECT_YES) {
        this.obj_doselect()
    }
}
kitem.prototype.type = "item";
kitem.prototype.area = "";
kitem.prototype = new kobj();
kitem.prototype.obj_self_init = function () {
    this.item_cfg_init();
    this._page.page_item_add(this);
}

kitem.prototype.item_cfg_init = function () { }


function Input(page, area, name, display, control, select, cfg) {
    kitem.call(this, page, area, name, "input", display, control, select, cfg);
}
Input.prototype = new kitem();
Input.prototype.type = "input";
Input.prototype.item_cfg_init = function () {
    var cfg = this.cfg;
    if ((typeof cfg != 'undefined') && (typeof cfg["value"] != 'undefined')) {
        if (this.type == "select") {
            this.obj_value_set(parseInt(cfg["value"]));
        } else {
            if (cfg["format"] == "num") {
                this.old = cfg["value"];
                this.len = cfg["len"];
                this.max = cfg["max"];
                this.min = cfg["min"];

                this.tmp = cfg["value"].toString();
                if (this.tmp == 0) {
                    this.now = 0;
                    this.tmp = '';
                }
                else {
                    this.now = this.tmp.length;                   
                }
                this.obj_value_set(this.tmp);


            } else
                this.obj_value_set(this.tmp);
        }
    }
}

Input.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_EXIT);
            }
            break;
    }
}

Input.prototype.onkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_OUT);
            }
            break;
        case KEYS.ENTER:
            {
                this.obj_out_type(st.OP_ENTER);
            }
            break;
        case KEYS.UP:
            {
                this.obj_out_type(st.OP_OUT_UP)
            }
            break;
        case KEYS.DOWN:
            {
                this.obj_out_type(st.OP_OUT_DOWN)
            }
            break;
        case KEYS.LEFT:
            {
                console.log(this.now, this.tmp);
                if (this.now >= 1) {
                    this.now--;
                    this.tmp = this.tmp.substring(0, this.tmp.length - 1);
                    this.obj_value_set(this.tmp);
                }
            }
            break;
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
                if (this.now >= this.len) {
                    this.now = 0;
                    this.tmp = '';
                } {
                    var val = code - KEYS.ZERO;
                    this.tmp = this.tmp + "" + val;
                    this.now++;

                    this.obj_value_set(this.tmp);
                }

            }
            break
    }
}

function ChannelNum(page, area, name, display, control, select, cfg) {
    kitem.call(this, page, area, name, "channelnum", display, control, select, cfg);
}
ChannelNum.prototype = new kitem();
ChannelNum.prototype.type = "channelnum";
ChannelNum.prototype.item_cfg_init = function () {
    var cfg = this.cfg;
    if ((typeof cfg != 'undefined') && (typeof cfg["value"] != 'undefined')) {
        if (this.type == "select") {
            this.obj_value_set(parseInt(cfg["value"]));
        } else {
            if (cfg["format"] == "num") {
                this.old = cfg["value"];
                this.len = cfg["len"];
                this.max = cfg["max"];
                this.min = cfg["min"];


                this.tmp = cfg["value"].toString();
                if (this.tmp == 0) {
                    this.now = 0;
                    this.tmp = '';
                }
                else {
                    this.now = this.tmp.length;
                    this.obj_value_set(this.tmp);
                }


            } else
                this.obj_value_set(this.tmp);
        }
    }
}

ChannelNum.prototype.obj_clean = function () {
    this.tmp = "", this.now = 0;
};
ChannelNum.prototype.onspecialkey = function (a) {
	switch (a.code) {
		case KEYS.ENTER: {
			this.obj_out_type(st.OP_EXIT);			
			this.obj_out_type("OP_CHANEL_CHANGE");
		}
			break;
		case KEYS.EXIT:
			this.obj_out_type(st.OP_EXIT);			
			this.obj_out_type("OP_CHANEL_NOCHANGE");
			break;
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
                    if (this.now >= this.len) {
                        this.now = 0;
                        this.tmp = '';
                    } {
                        var val = a.code - KEYS.ZERO;
                        this.tmp = this.tmp + "" + val;
                        this.now++;
    
                        this.obj_value_set(this.tmp);
                    }
    
                }
                break
	}
};
ChannelNum.prototype.onkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_OUT);
            }
            break;
        case KEYS.ENTER:
            {
                this.obj_out_type(st.OP_DO);
            }
            break;
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
                
                this.obj_out_type(st.OP_ENTER);
                if (this.now >= this.len) {
                    this.now = 0;
                    this.tmp = '';
                } {
                    var val = code - KEYS.ZERO;
                    this.tmp = this.tmp + "" + val;
                    this.now++;

                    this.obj_value_set(this.tmp);
                }

            }
            break
    }
}

function Button(page, area, name, display, control, select, cfg) {
    kitem.call(this, page, area, name, "button", display, control, select);
    this.cfg = cfg;
}
Button.prototype = new kitem();
Button.prototype.type = "button";

Button.prototype.onkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_OUT);
            }
            break;
        case KEYS.ENTER:
            {
                this.obj_out_type(st.OP_DO);
            }
            break;
        case KEYS.UP:
            {
                this.obj_out_type(st.OP_OUT_UP)
            }
            break;
        case KEYS.DOWN:
            {
                this.obj_out_type(st.OP_OUT_DOWN)
            }
            break;
        case KEYS.LEFT:
            {
                this.obj_out_type(st.OP_OUT_LEFT)
            }
            break;
        case KEYS.RIGHT:
            {
                this.obj_out_type(st.OP_OUT_RIGHT)
            }
            break
    }
}


function Menu(page, area, name, display, control, select, cfg) {
    kitem.call(this, page, area, name, "select", display, control, select, cfg);
    if (typeof cfg != 'undefined') {
        if (typeof cfg["total"] != 'undefined') {
            this.total = parseInt(cfg["total"])
        }
        if (typeof cfg["direction"] != 'undefined') {
            this.direction = cfg["direction"]
        }
    }
}
Menu.prototype = new kitem();
Menu.prototype.item_cfg_init = function () {
    var cfg = this.cfg;
    if ((typeof cfg != 'undefined') && (typeof cfg["value"] != 'undefined')) {
        if (this.type == "select") {
            this.obj_value_set(parseInt(cfg["value"]));
        } else {
            if (cfg["format"] == "num") {
                this.obj_value_set(parseInt(cfg["value"]));
                this.old = parseInt(cfg["value"]);
                this.len = cfg["len"];
                this.max = cfg["max"];
                this.min = cfg["min"];

                this.tmp = parseInt(cfg["value"]);
                this.now = this.tmp.toString().length;

            } else
                this.obj_value_set(parseInt(cfg["value"]));
        }
    }
}

Menu.prototype.select_increase = function () {
    this.obj_value_set(Increase(this._st.st_value_get(), this.total));
}
Menu.prototype.select_decrease = function () {
    this.obj_value_set(Decrease(this._st.st_value_get(), this.total));
}
Menu.prototype.select = function (id) {
    if (id < this.total) {
        this.obj_value_set(id);
    }
}
Menu.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_EXIT);
            }
            break;
    }
}
Menu.prototype.onkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_OUT);
            }
            break;
        case KEYS.ENTER:
            {

            }
            break;
        case KEYS.UP:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.obj_out_type(st.OP_OUT_UP)
                } else {
                    this.select_decrease()
                }
            }
            break;
        case KEYS.DOWN:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.obj_out_type(st.OP_OUT_DOWN)
                } else {
                    this.select_increase()
                }
            }
            break;
        case KEYS.LEFT:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.select_decrease()
                } else {
                    this.obj_out_type(st.OP_OUT_LEFT)
                }
            }
            break;
        case KEYS.RIGHT:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.select_increase()
                } else {
                    this.obj_out_type(st.OP_OUT_RIGHT)
                }
            }
            break;
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
                this.select(code - KEYS.ZERO)
            }
            break
    }
}


function Select(page, area, name, display, control, select, cfg) {
    Menu.call(this, page, area, name, display, control, select, cfg);
}
Select.prototype = new Menu();
Select.prototype.onkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.obj_out_type(st.OP_OUT);
            }
            break;
        case KEYS.ENTER:
            {
                this.obj_out_type(st.OP_ENTER);
            }
            break;
        case KEYS.UP:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.obj_out_type(st.OP_OUT_UP)
                } else {
                    this.select_decrease()
                }
            }
            break;
        case KEYS.DOWN:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.obj_out_type(st.OP_OUT_DOWN)
                } else {
                    this.select_increase()
                }
            }
            break;
        case KEYS.LEFT:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.select_decrease()
                } else {
                    this.obj_out_type(st.OP_OUT_LEFT)
                }
            }
            break;
        case KEYS.RIGHT:
            {
                if (this.direction == kobj.HORIZONTAL) {
                    this.select_increase()
                } else {
                    this.obj_out_type(st.OP_OUT_RIGHT)
                }
            }
            break;
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
                this.select(code - KEYS.ZERO)
            }
            break
    }
}
/**/


Area.MOVE = "AREA_MOVE";
Area.DX = "dx";
Area.DY = "dy";

Area.SINGAL = "signal";
Area.ROW = "row";
Area.COL = "col";
Area.GRID = "grid";



function Area(page, name, display, control, select, cfg) {
    kobj.call(this, page, '', name, "area", display, control, select);
    this.cfg = cfg;
    if (typeof cfg != 'undefined') {
        if (typeof cfg["value"] != 'undefined') {
            this.obj_value_set(parseInt(cfg["value"]))
        }
        if (typeof cfg[Area.DX] != 'undefined') {
            this._dx = parseInt(cfg[Area.DX])
        }
        if (typeof cfg[Area.DY] != 'undefined') {
            this._dy = parseInt(cfg[Area.DY])
        }

        this._atype = Area.GRID;
        if (this._dy == 1) {
            if (this._dx == 1) {
                this._atype = Area.SINGAL;
            } else {
                this._atype = Area.ROW;
            }
        }
        if (this._dx == 1) {
            if (this._dy == 1) {
                this._atype = Area.SINGAL;
            } else {
                this._atype = Area.COL;
            }
        }
    }
    this._items = new Array();
    if (typeof name != 'undefined') {
        this.init()
    }
    if (display == st.DISPLAY_SHOW) {
        this.obj_show()
    }
    if (control == st.CONTROL_ENABLE) {
        this.obj_enable();
    }
    this._st.st_select_set(select);
}
Area.prototype = new kobj();

Area.prototype.obj_self_init = function () {
    this._page.page_area_add(this);
    this.addEventListener(Area.MOVE, this, this.area_move)
}
Area.prototype.area_item_add = function (item_status) {
    this._items.push(item_status)
}

Area.prototype.area_findfirst = function () {
    for (var i = 0; i < this._items.length; i++) {
        if (this._items[i].st_control_get() == st.CONTROL_ENABLE) {
            return i;
        }
    }
    return -1;
}

Area.prototype.area_findnext = function () {
    var start = this.obj_value_get();
    var len = this._items.length;
    for (var i = 0; i < len; i++) {
        if (this._items[(start + i) % len].st_control_get() == st.CONTROL_ENABLE) {
            return (start + i) % len;
        }
    }
    return start;
}

Area.prototype.area_findprev = function () {
    var start = this.obj_value_get();
    var len = this._items.length;
    for (var i = 0; i < len; i++) {
        if (this._items[(start - i + len) % len].st_control_get() == st.CONTROL_ENABLE) {
            return (start - i + len) % len;
        }
    }
    return start;
}



Area.prototype.area_move = function (event) {
    if (this._atype == Area.GRID) {
        this.area_move_grid(event.kind)
    }
    if (this._atype == Area.ROW) {
        this.area_move_row(event.kind)
    }
    if (this._atype == Area.COL) {
        this.area_move_col(event.kind)
    }
    if (this._atype == Area.SINGAL) {
        this.area_move_singal(event.kind)
    }
}
Area.prototype.area_move_grid = function (flag) {
    if (flag == st.OP_OUT) {
        this.obj_out_type(flag);
    }
    if (flag == st.OP_EXIT) {
        this.obj_focusout();
    }
    if (flag == st.OP_ENTER) {
        this.obj_focusin();
    }
    if (flag == st.OP_OUT_UP) { }
    if (flag == st.OP_OUT_DOWN) { }
    if (flag == st.OP_OUT_LEFT) { }
    if (flag == st.OP_OUT_RIGHT) { }
}
Area.prototype.area_move_singal = function (flag) {
    if (flag == st.OP_OUT) {
        this.obj_out_type(flag);
    }
    if (flag == st.OP_EXIT) {
        this.obj_focusout();
    }
    if (flag == st.OP_ENTER) {
        this.obj_focusin();
    }
    if (flag == st.OP_OUT_UP) { }
    if (flag == st.OP_OUT_DOWN) { }
    if (flag == st.OP_OUT_LEFT) { }
    if (flag == st.OP_OUT_RIGHT) { }
}
Area.prototype.area_move_row = function (flag) {
    if (flag == st.OP_OUT) {
        this.obj_out_type(flag);
    }
    if (flag == st.OP_EXIT) {
        this.obj_focusout();
    }
    if (flag == st.OP_ENTER) {
        this.obj_focusin();
    }
    if (flag == st.OP_OUT_LEFT) {
        this.obj_value_set(Decrease(this._st.st_value_get(), this._items.length));
    }
    if (flag == st.OP_OUT_RIGHT) {
        this.obj_value_set(Increase(this._st.st_value_get(), this._items.length));
    }
    if ((flag == st.OP_OUT_UP) || (flag == st.OP_OUT_DOWN)) {
        this.obj_out_type(flag);
    }
}
Area.prototype.area_move_col = function (flag) {
    if (flag == st.OP_OUT) {
        this.obj_out_type(flag);
    }
    if (flag == st.OP_EXIT) {
        this.obj_focusout();
    }
    if (flag == st.OP_ENTER) {
        this.obj_focusin();
    }
    if (flag == st.OP_OUT_UP) {
        this.obj_value_set(Decrease(this._st.st_value_get(), this._items.length));
    }
    if (flag == st.OP_OUT_DOWN) {
        this.obj_value_set(Increase(this._st.st_value_get(), this._items.length));
    }
    if ((flag == st.OP_OUT_LEFT) || (flag == st.OP_OUT_RIGHT)) {
        this.obj_out_type(flag);
    }
}

Area.prototype.onkey = function (event) {
    var code = event.code;
    this.onselfkey(event);
    if (this._items.length < 1) {
        return
    }
    this._page.page_item_get().am_value(this._items[this._st.st_value_get()].st_name_get()).dispatchEvent(event);
}
Area.prototype.onselfkey = function (event) { }

Area.prototype.AreaCreate = function () {
    this.obj_build();

    if (this._items.length > 0) {
        var id = this.area_findfirst();
        if (id < this._items.length) {

            this.obj_value_set_only(id);
        }
    }

    if (this._st.st_select_get() == st.SELECT_YES) {
        this.obj_doselect()
    }
}

Area.prototype.AreaSelect = function (id) {
    if (id < this._items.length)
        this.obj_value_set(id);
}