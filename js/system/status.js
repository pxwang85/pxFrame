

var Gstate;

function Gstatus() {
    
}

Gstatus.VOLUME_MAX = 32;

var epg_cvue;
var oklist_cvue;
Gstatus.Init = function(){
    Gstate = {};

    Gstate.channelid = 1;
    Gstate.channelname = "CCTV-1";

    Gstate.vol = 18;
    Gstate.mute = 0;

    Gstate.pevent = {};
    Gstate.pevent.name = "Event 1";
    Gstate.pevent.flag = 1;
    Gstate.pevent.start_time = "12:00";
    Gstate.pevent.end_time = "14:00";
    Gstate.pevent.descript = str_epg_info_text;

    Gstate.fevent = {};
    Gstate.fevent.name = "Event 2";
    Gstate.fevent.flag = 2;

    Gstate.channellist = pdat;


    new Vue({
		el: '#player_banner',
		data: {
            status: Gstate
          }
          ,
          methods: {
            refresh_event: function (newevent) {
              
            }
          }
      })


      
      
          }
    
Gstatus.clearChannel = function() {
	Gstate.channelid = 0;
    Gstate.channelname = "";
      
    Gstate.pevent = {};
    Gstate.pevent.name = "";
    Gstate.pevent.start_time = "00:00";
    Gstate.pevent.end_time = "00:00";
      
    Gstate.fevent = {};
    Gstate.fevent.name = "";
}
