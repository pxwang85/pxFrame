

SND.STYLE_NORMAL = "STYLE_NORMAL";
SND.STYLE_SELECT = "STYLE_SELECT";
SND.STYLE_ACTIVE = "STYLE_ACTIVE";
SND.STYLE_FOCUSIN = "STYLE_FOCUSIN";




function SND(handle, templage, cb, dat) {
    this.init(handle, templage, cb, dat);
}


SND.prototype.init = function (handle, templage, cb, dat) {
    this.name = '';
    this.dat = dat;
    this.handle = '#' + handle;
    this.template = templage;
    $(this.handle).html(this.template);
    this.vhandle = this.create(this.handle, cb, { "lists": this.dat });
}

SND.prototype.create = function (handle, cb, dat) {
    var new_vue = new Vue({
        el: handle,
        data: dat
    });
    new_vue.refresh_cb = cb;    
    new_vue.refresh = function (dat) {      
        this.lists = dat;      
        this.$nextTick(function () {
            if(this.refresh_cb)
            {
                this.refresh_cb();  
            }
                          
        })       
    }
    return new_vue;
}

SND.prototype.refresh = function (dat) {
    this.vhandle.refresh(dat);
}
