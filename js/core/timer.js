function TimeShow()
{ 
    TimeShow.RefreshTime();
    this.timehandle = setInterval(TimeShow.RefreshTime, 30*1000);    
    
}

TimeShow.prototype.timehandle = null;
TimeShow.prototype.pname = null;

TimeShow.instance = null;

TimeShow.get = function ()
{
    if (!TimeShow.instance)
        TimeShow.instance = new TimeShow();
    
    return TimeShow.instance;
};


TimeShow.RefreshTime = function ()
{
    var myDate = new Date();
    var yy = myDate.getUTCFullYear();
    var mm = myDate.getUTCMonth();
    var dd = myDate.getUTCDate();
    var day = myDate.getDay();
    var hh = myDate.getHours();
    var mu = myDate.getMinutes();
    var ss = myDate.getSeconds();
    var gzone = myDate.getTimezoneOffset() / 60;
    
    var date_str;
    var time_str;
    
    date_str = yy + str_year;
    date_str += ("00" + (mm + 1)).slice( - 2) + str_month;
    date_str += ("00" + dd).slice( - 2) + str_date;
    
    time_str = ("00" + hh).slice( - 2) + ":";
    time_str += ("00" + mu).slice( - 2);// + ":";
    //time_str += ("00" + ss).slice( - 2);

	var week_str = "Sun,Mon,Tue,Wed,Thu,Fri,Sat";
    
    $(".time").html(date_str + " " + time_str);
    
	if(typeof APP.get().APPGet("epg") != "undefined")
		APP.get().APPGet("epg").refresh_date();
    
}
