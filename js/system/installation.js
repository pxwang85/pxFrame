Installation.instance = null;

Installation.TP_SEARCH = "tp";
Installation.ALL_SEARCH = "all";
Installation.BLIND_SEARCH = "blind";
Installation.AUTO_SEARCH = "auto";

Installation.ePI_QPSK = 1;
Installation.ePI_8PSK = 2;
Installation.ePI_QAM = 3;
Installation.ePI_4QAM = 4;
Installation.ePI_16QAM = 5;
Installation.ePI_32QAM = 6;
Installation.ePI_64QAM = 7;
Installation.ePI_128QAM = 8;
Installation.ePI_256QAM = 9;
Installation.ePI_512QAM = 10;
Installation.ePI_BPSK = 11;
Installation.ePI_8VSB = 12;
Installation.ePI_16APSK = 13;
Installation.ePI_32APSK = 14;

Installation.eINSTALL_COMPLETED = 0;
Installation.eINSTALL_INTERRUPT = 1;
Installation.eINSTALL_FAILED = 2;
Installation.eINSTALL_PROGRESS = 3;
Installation.eINSTALL_TP_COMPLETED = 4;
Installation.eINSTALL_TP_FAILED = 5;
Installation.eINSTALL_OTHER = 6;

function Installation() {
    if (typeof EventDispatcher == 'undefined') 
        throw new Error("EventDispatcher class is missing.");
    EventDispatcher.initialize(this)
}
Installation.get = function () {
    if (!Installation.instance)
        Installation.instance = new Installation();
    return Installation.instance
};
Installation.search_cb = function (flag, val, str) {
 
    switch (flag) {
        case Installation.eINSTALL_COMPLETED:
            ProSearch.Finish();
            break;
        case Installation.eINSTALL_INTERRUPT:
            break;
        case Installation.eINSTALL_FAILED:
            ProSearch.Filed();
            break;
        case Installation.eINSTALL_PROGRESS:     
			 var dat = JSON.parse(str);
            var tp_obj = {"freq":dat.FrequencyKHertz/1000,"smybol":dat.SymbolRateSPS,"qam":dat.Modulation-Installation.ePI_16QAM}
            ProSearch.SetTp(tp_obj);
            ProSearch.SetProgress(parseInt(dat.progress));
            break;
        case Installation.eINSTALL_TP_COMPLETED:
            ProSearch.retFresh(JSON.parse(str));
            break;
        case Installation.eINSTALL_TP_FAILED:
            break;
        case Installation.eINSTALL_OTHER:
            break;
    }
};
Installation.prototype.SearchInit = function () {
    if (typeof testObj != 'undefined') 
        testObj.callback_search_notify = Installation.search_cb
};
Installation.prototype.search = function (dat) {
    Background.get().EIT_stop();
    Background.get().background_stop();

    if (dat.type == Installation.TP_SEARCH) {
        var q_val = dat.qam;
        var tp_obj = {"freq":dat.freq/1000,"smybol":dat.symbol,"qam":q_val}
        ProSearch.SetTp(tp_obj);
        if ((typeof testObj != 'undefined') && (typeof testObj.manual_search != 'undefined'))
            testObj.manual_search( parseInt(dat.freq), parseInt(dat.symbol), parseInt(q_val))
    }
    else if (dat.type == Installation.ALL_SEARCH) {
        if ((typeof testObj != 'undefined') && (typeof testObj.all_search != 'undefined'))
            testObj.all_search()
    }
    else if (dat.type == Installation.AUTO_SEARCH) {
        if ((typeof testObj != 'undefined') && (typeof testObj.auto_search != 'undefined'))
            testObj.auto_search()
    }
};
Installation.prototype.stop = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.stop_search != 'undefined'))
        testObj.stop_search()

    
    Background.get().EIT_start();
    Background.get().background_start();
};
Installation.prototype.save = function () {
    if ((typeof testObj != 'undefined') && (typeof testObj.search_save_result != 'undefined'))
        testObj.search_save_result()
};