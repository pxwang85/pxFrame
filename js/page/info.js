
Info.instance;
Info.get = function () {
    return Info.instance
};

function Info(app, show) {
    page.call(this, app, "info", show)
}

Info.prototype = new page();

Info.update_cb = function (flag, val, str) {
    
       switch (flag) {
           case 0:
            Info.get().MB_Setting_Reboot();
               break;
           case 1:     
                var dat = JSON.parse(str);
                Info.SetProgress(parseInt(dat.progress));
               break;
       }
   };

   Info.SetProgress = function (val) {
   $("#ud_pro").pxSetProgress(val,500);
}

Info.IOC = "ioc";
Info.IOS = "ios";
Info.IOCH = "ioch";
Info.IOU = "iou";
Info.IOCA = "ioca";
Info.IOUD = "ioud";
Info.prototype.init = function () {
    Info.instance = this;
    this.carea = [];
    this.first_sel = 0;

    this.updateing = 0;

    this.addbg();
    this.firstarea_build();
    //this.area0_build();
    this.area2_build();
};

Info.prototype.refresh = function () {

}

Info.prototype.addbg = function () {
    var bg_str = '';
    for (var j = 0; j < 10; j++) {
        bg_str += '<div class="item_bg"></div>';
    }
    var str = '<div id="io_title"  class="title"></div><div class="time"></div><div id="io_dbg">' + bg_str + '</div></div>';
    $("#pbg_info").html(str);

    str = '<div id="ioud_pro"><div class="update_do"><div class="search_pr">' + UPDATE_PROGRESS_str + '</div><div id="ud_pro" class="ps_progress"><div class="progr_bg"><div class="progr_show"></div></div><div class="progr_val">50%</div></div></div></div>';
    
    $("#asw_ioud_area").html(str);

    $("#io_title").html(str_info_title);
}

Info.prototype.appear = function () {
}
Info.prototype.disappear = function () {
}

Info.prototype.firstarea_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 5
    }
    this.first_area = new Area(this, Info.IOC, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var second_cfg = { "value": 0 }
    for (var i = 0; i < 5; i++) {
        if (i == 0)
            new Button(this, Info.IOC, Info.IOC + "_button_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
        else
            new Button(this, Info.IOC, Info.IOC + "_button_" + i, "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_NO", second_cfg);
    }
    this.first_area.AreaCreate()
}

Info.prototype.area2_build = function () {
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 5
    }
    var second_area = new Area(this, Info.IOUD, "DISPLAY_HIDE", "CONTROL_DISABLE", "SELECT_NO", area_cfg);
    var fif_cfg = {
        "value": 0
    }
    new Button(this, Info.IOUD, Info.IOUD + "_button_0", "DISPLAY_HIDE", "CONTROL_ENABLE", "SELECT_NO", fif_cfg);
    this.thirdarea = second_area;
    second_area.AreaCreate();
}




Info.prototype.item_create = function (handle, kind, type, id, value) {
    var name = id;
    var str = '';
    if (kind == Info.IOC) {
        name = str_info_choose[id];
        str = '<div id="'+ handle +'" class="' + kind + '_item"><div class="' + kind + '_text">' + name + '</div><div class="' + kind + '_value">' + value + '</div></div>';
    }
    $("#asw_" + kind + "_area").append(str)
}


Info.prototype.area_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    if (cate == "DISPLAY") {
        if (kind == "DISPLAY_SELECT") {
            this.area_do(kind, name, value);
            if (name == Info.IOC) {
                this.first_sel = value;
                if (typeof this.carea[value] != 'undefined') {
                    this.carea[value].obj_show();
                }
            }
        }
        else if (kind == "DISPLAY_NOSELECT") {
            this.area_do(kind, name, value);
            if (name == Info.IOC) {
                if (typeof this.carea[value] != 'undefined') {
                    this.carea[value].obj_hide();
                }

            }
        }
        else if ((kind == "DISPLAY_ACTIVE") || (kind == "DISPLAY_FOCUSIN")) {
            this.area_do(kind, name, value);
        }
        else if (kind == "DISPLAY_SHOW")
            $("#a_" + name + "_area").show();

        else if (kind == "DISPLAY_HIDE")
            $("#a_" + name + "_area").hide();

    }

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
            if (name == Info.IOC) {
                this.PageExit(1);
            }
        }

        if (kind == "OP_OUT_RIGHT") {
            if (name == Info.IOC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.first_area.obj_active();
                    this.carea[this.first_sel].obj_enable();
                    this.carea[this.first_sel].obj_doselect();
                }
            }
        }
        if (kind == "OP_OUT_LEFT") {
            if (name != Info.IOC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.carea[this.first_sel].obj_disable();
                    this.carea[this.first_sel].obj_noselect();
                    this.first_area.obj_noactive();
                }

            }
        }
        if (kind == "OP_OUT") {
            if (name != Info.IOC) {
                if (typeof this.carea[this.first_sel] != 'undefined') {
                    this.first_area.obj_noactive();
                    this.carea[this.first_sel].obj_disable();
                    this.carea[this.first_sel].obj_noselect();
                }

            }
        }
    }
}

Info.prototype.area_do = function (kind, type, value) {
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
    var focusin_text = {
        "color": "white",
        "background-color": "yellow"
    };
    var normal_text = {
        "color": "#002740",
        "background-color": "rgba(0,0,0,0)"
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
    if (kind == "DISPLAY_FOCUSIN") {
        css_val = focusin_text;
    }


    if (!isNaN(n)) {
        key = type + "_item";
        if (type == Info.IOC) {
            key = type + "_item";
        }

        $("." + key + ":eq(" + n + ")").css(css_val);

        


    }
}


Info.prototype.item_specialevent = function (event) {
    var kind = event.kind;
    var value = event.value;
    var name = event.name;
    var itype = event.itype;

    if (event.cate == "OP_EVENT") {
        if (event.kind == "OP_OUT") {
            this.PageExit(1);
        }

        if (event.kind == "OP_DO") {
                var id = parseInt(name.split("_")[1]);
                var type = name.split("_")[0];
    
                if (name == "ioc_button_4") {
                    this.MB_Setting_Update();
                }
        }
    }

    if (event.cate == "DOM") {
        if (kind == "DOM_BUILD") {
            var id = parseInt(name.split("_")[2]);
            var type = name.split("_")[0];
            this.item_create(name, type, itype, id, value);
        }
    }
    if (event.cate == "DISPLAY") {
        if (kind == "DISPLAY_SELECT") {
            var id = parseInt(name.split("_")[2]);
            var type = name.split("_")[0];
            var sort = name.split("_")[1];
            if (itype == "input") {
                this.inputvalue(name, type, id, value);
            }
            if (itype == "select") {
                this.selectvalue(name, type, id, value);
            }
        }
    }

}

Info.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch(code){
        case KEYS.NUM8:{
            this.MB_Setting_Reboot();
        }

        case KEYS.NUM7:{
            Info.SetProgress(70);
        }
        
        break;
        case KEYS.NUM6:{
            Info.SetProgress(60);
        }
        
        break;
        case KEYS.NUM1:{
            Info.SetProgress(10);
        }
        
        break;
    }
}




Info.prototype.MB_Setting_Update = function () {
    var o = {};
    o.title_str = MB_SETTING_title_str;
    o.context_str = MB_SETTING_UPDATE_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(MB_SEARCH_TYPE0_str);
    o.choose.push(MB_SEARCH_TYPE1_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.update);
    this.app.APPSelect("messagebox", 1)
}

Info.prototype.update = function () {  
       
    this.updateing = 1;
    /*this.first_area.obj_active();
    if (typeof this.carea[this.first_sel] != 'undefined') {
        this.carea[this.first_sel].obj_active();
        this.carea[this.first_sel].obj_hide();
    }
    this.thirdarea.obj_show();
    this.thirdarea.obj_noactive();*/
   if ((typeof testObj != 'undefined')&&(typeof testObj.system_update != 'undefined'))
   	testObj.system_update("/mnt/usb_update.bin")  
}

Info.prototype.MB_Setting_Reboot = function () {
    var o = {};
    o.title_str = MB_SETTING_title_str;
    o.context_str = MB_SETTING_REBOOT_str;
    o.defchoose = 0;
    o.dispear = 0;
    o.choose = new Array();
    o.choose.push(CONFIRM_str);
    $("#pbg_messagebox").html('<div id="messagebox_bg"><div id="mx_order"><div id="mx_order_head"><div id="msg_title">' + o.title_str + '</div></div><div id="msg_context">' + o.context_str + '</div></div></div>');
    MessageBox.get().set(o);
    MessageBox.get().addEventListener(QEvent.MB_0, this, this.reboot);
    this.app.APPSelect("messagebox", 1)
}

Info.prototype.reboot = function () {       
}