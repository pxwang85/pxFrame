$(document).ready(function() {
	PrepareData();
	KEYS = PCKEY;
	//Plugin.get().init();
	
	APP.get().AppInit();
	mTree();
	APP.get().AppTimer();
	document.onkeydown = function(event) {
		var code = System_KeyCode(event);
		APP.get().APPOnkey(code)
	}
	//CallbackInit();
	APP.get().APPSelect("player")
	Gstatus.Init();
});
var Menus = [];
Menus[0] = {
	"name": "mainmenu",
	"type": "MainMenu",
	"show": 0
};
Menus[1] = {
	"name": "messagebox",
	"type": "MessageBox",
	"show": 0
};
Menus[2] = {
	"name": "epg",
	"type": "EPG",
	"show": 0
};
Menus[3] = {
	"name": "mail",
	"type": "Mail",
	"show": 0
};
Menus[4] = {
	"name": "reclist",
	"type": "RecList",
	"show": 0
};
Menus[5] = {
	"name": "advset",
	"type": "AdvSet",
	"show": 0
};
Menus[6] = {
	"name": "player",
	"type": "Player",
	"show": 0
};
Menus[7] = {
	"name": "prosearch",
	"type": "ProSearch",
	"show": 0
};
Menus[8] = {
	"name": "pincode",
	"type": "Pincode",
	"show": 0
};
Menus[9] = {
	"name": "info",
	"type": "Info",
	"show": 0
};
Menus[10] = {
	"name": "orderlist",
	"type": "OrderList",
	"show": 0
};


APP.prototype.view_show = function () {
    $("#v_pview").show();
}
APP.prototype.view_hide = function () {
    $("#v_pview").hide();
}

function mTree() {
	$.each(Menus, function(i, item) {
		if (item["type"] == "MainMenu") {
			new MainMenu(item["name"], item["show"])
		}
		if (item["type"] == "MessageBox") {
			new MessageBox(item["name"], item["show"])
		}
		if (item["type"] == "EPG") {
			new EPG(item["name"], item["show"])
		}
		if (item["type"] == "Mail") {
			new Mail(item["name"], item["show"])
		}
		if (item["type"] == "RecList") {
			new RecList(item["name"], item["show"])
		}
		if (item["type"] == "OrderList") {
			new OrderList(item["name"], item["show"])
		}
		if (item["type"] == "AdvSet") {
			new AdvSet(item["name"], item["show"])
        }
        if (item["type"] == "Player") {
			new Player(item["name"], item["show"])
		}
		if (item["type"] == "ProSearch") {
			new ProSearch(item["name"], item["show"])
		}
		if (item["type"] == "Pincode") {
			new Pincode(item["name"], item["show"])
		}
		if (item["type"] == "Info") {
			new Info(item["name"], item["show"]);
		}
	})
}
function nofind() {
	var img = event.srcElement;
	img.src = "img/tanhao.jpg";
	img.onerror = null
}
var g_dat = null;

function PrepareData() {
	g_dat = new Array();
	str_mainmenu.forEach(function(e, i) {
		var obj = {};
		obj["id"] = i;
		obj["name"] = e;
		var son = new Array();
		var len = son_mainmenu[i].length;
		for (var j = 0; j < len; j++) {
			var s_obj = {};
			s_obj["name"] = son_mainmenu[i][j];
			s_obj["icon"] = str_pic_s + (i) + "_" + (j + 1) + str_pic_e;
			s_obj["id"] = son_id_mainmenu[i][j];
			son.push(s_obj)
		}
		obj["son"] = son;
		g_dat.push(obj)
	})
}