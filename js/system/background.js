Background.instance = null;


function Background() {
    if (typeof EventDispatcher == 'undefined')
        throw new Error("EventDispatcher class is missing.");
    EventDispatcher.initialize(this)
}
Background.get = function () {
    if (!Background.instance)
        Background.instance = new Background();
    return Background.instance
};
Background.prototype.BackgroundInit = function () {
};

Background.prototype.background_start = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.background_start != 'undefined'))
        testObj.background_start()
};

Background.prototype.background_stop = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.background_stop != 'undefined'))
        testObj.background_stop();
};

Background.prototype.EIT_start = function () {    
    if ((typeof testObj != 'undefined') && (typeof testObj.eit_start != 'undefined'))
        testObj.eit_start();
};

Background.prototype.EIT_stop = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.eit_stop != 'undefined'))
        testObj.eit_stop();
};

Background.prototype.EIT_pause = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.eit_pause != 'undefined'))
        testObj.eit_pause();
};

Background.prototype.EIT_resume = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.eit_resume != 'undefined'))
        testObj.eit_resume();
};

