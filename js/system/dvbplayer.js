DvbPlayer.instance = null;



DvbPlayer.TUNERSIGNAL_NOTIFY = 0;
DvbPlayer.APP_NOTIFY = 1;
DvbPlayer.CA_NOTIFY = 2;
DvbPlayer.EPG_NOTIFY = 3;

function DvbPlayer() {
    if (typeof EventDispatcher == 'undefined')
        throw new Error("EventDispatcher class is missing.");
    EventDispatcher.initialize(this)
}
DvbPlayer.get = function () {
    if (!DvbPlayer.instance)
        DvbPlayer.instance = new DvbPlayer();
    return DvbPlayer.instance
};
DvbPlayer.dvb_cb = function (str) {
    var dat = JSON.parse(str);
    switch (dat.message_type) {
        case DvbPlayer.TUNERSIGNAL_NOTIFY:
            ProSearch.SetStrength(dat.power);
            ProSearch.SetQulity(dat.quality);
            break;
        case DvbPlayer.APP_NOTIFY:
            break;
        case DvbPlayer.CA_NOTIFY:
            break;
        case DvbPlayer.EPG_NOTIFY:
            break;
    }
};
DvbPlayer.prototype.DvbInit = function () {
    if (typeof testObj != 'undefined')
        testObj.callback_message_notify = DvbPlayer.dvb_cb
};

DvbPlayer.prototype.set_video_window = function (type,x,y,width,height) {
    if ((typeof testObj != 'undefined') && (typeof testObj.set_video_window != 'undefined'))
        testObj.set_video_window(type,x,y,width,height)
};

DvbPlayer.prototype.blank_window = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.blank_window != 'undefined'))
        testObj.blank_window()
};

DvbPlayer.prototype.stop_play_dvb = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.stop_play_dvb != 'undefined'))
        testObj.stop_play_dvb()
};

DvbPlayer.prototype.volume_set = function (val) {
    if ((typeof testObj != 'undefined') && (typeof testObj.volume_set != 'undefined'))
        testObj.volume_set(val)
};

DvbPlayer.prototype.volume_up = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.volume_up != 'undefined'))
        testObj.volume_up()
};

DvbPlayer.prototype.volume_down = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.volume_down != 'undefined'))
        testObj.volume_down()
};

DvbPlayer.prototype.volume_mute = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.volume_mute != 'undefined'))
        testObj.volume_mute()
};
