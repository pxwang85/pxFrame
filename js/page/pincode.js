function Pincode(app, show) {
    page.call(this, app, "pincode", show);
}

Pincode.PE = "pe";

Pincode.instance;
Pincode.get = function () {
    return Pincode.instance
};

QEvent.PE_ = "PE_";
QEvent.PE_ERROR = "PE_ERROR";
QEvent.PE_CORRECT = "PE_CORRECT";

Pincode.prototype = new page();
Pincode.prototype.init = function () {
    this.control1_create()
    Pincode.instance = this;
}
Pincode.prototype.onspecialkey = function (event) {
    var code = event.code;
    switch (code) {
        case KEYS.EXIT:
            {
                this.PageExit(0);
            }
            break
    }
}
Pincode.prototype.control1_create = function () {
    $("#asw_pe_area").html('');
    $("#asw_pe_area").html('')
}
Pincode.prototype.appear = function () {
}
Pincode.prototype.disappear = function () {
}


Pincode.prototype.doclean = function () {
    this.page_event_init();
    this.page_area_clean();
    this.page_item_clean();
}

Pincode.prototype.set = function (cfg) {
    this.doclean();    
    this.cfg = cfg;
    this.try = 0;
    this.len_max =  this.cfg.pin_val.toString().length;
    $("#asw_pe_area").html('');
    var area_cfg = {
        "value": 0,
        "dx": 1,
        "dy": 1
    }
    var second_area = new Area(this, "pe", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", area_cfg);
    var third_cfg = {
        "format": "num",
        "value": 0,
        "len": this.len_max
    }
    new Input(this, "pe", "pe" + "_input_1", "DISPLAY_SHOW", "CONTROL_ENABLE", "SELECT_YES", third_cfg);    
    second_area.AreaCreate();
}

Pincode.prototype.area_specialevent = function (event) {
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


Pincode.prototype.item_specialevent = function (event) {
    var cate = event.cate;
    var kind = event.kind;
    var value = event.value;
    var name = event.name;

    if (cate == "OP_EVENT") {
        if (kind == "OP_OUT") {
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

    if (cate == "DISPLAY") {
        if (kind == "DISPLAY_SELECT") {
            this.pincode_value(value);
        }
        if (kind == "DISPLAY_NOSELECT") {
            this.pincode_hide(value);
        }
    }
}
Pincode.prototype.item_create = function (type, id) {
    var name = id;
    var str = '<div class="' + type + '_item">';
    for(var i=0;i<this.len_max;i++)
    {
        str += '<div class="pe_'+this.len_max+'input_area"><div class="pe_input_text">*</div></div>';
    }
     
     str += '</div>';

    $("#asw_" + type + "_area").append(str)
}

Pincode.prototype.pincode_value = function (value) {
    if(value == "")
    {
        $("#pe_context").html("");
        return;
    }
    var len = value.toString().length;
    if(len == this.len_max)
    {     
        $(".pe_"+this.len_max+"input_area:eq(" + (len-1) + ")").css({"border-color":"red"});
        $(".pe_"+this.len_max+"input_area:eq(" + (len-1) + ") .pe_input_text").html("*");
        if(value == this.cfg.pin_val)
            {
                
                this.PageExit(1);
                var __e = new QEvent(QEvent.PE_CORRECT);
                this.dispatchEvent(__e);
            }
            else
            {
                this.try++;                
                $("#pe_context").html(PE_PINCODE_ERROR_str+ this.try +PE_PINCODE_TIME_str);
                if(this.try >= this.cfg.try_times)
                    {
                        
                        this.PageExit(1);
                        var __e = new QEvent(QEvent.PE_ERROR);
                        this.dispatchEvent(__e);
                    }
            }
        
    }
    else{
    $(".pe_"+this.len_max+"input_area:eq(" + (len-1) + ")").css({"border-color":"red"});
    $(".pe_"+this.len_max+"input_area:eq(" + (len-1) + ") .pe_input_text").html(value.toString()[len-1]);
    
}

}

Pincode.prototype.pincode_hide = function (value) {
    var len = value.toString().length;
    $(".pe_"+this.len_max+"input_area:eq(" + (len-1) + ")").css({"border-color":"black"});
    $(".pe_"+this.len_max+"input_area:eq(" + (len-1) + ") .pe_input_text").html("*");
    
}

Pincode.prototype.area_do = function (kind, type, value) {
}