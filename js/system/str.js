/*  Timer   */
var str_year = ["年"];
var str_month = ["月"];
var str_date = ["日"];

/*  MainMenu   */
var str_mainmenu = ["⓪ 節目表", "① 包月視訊", "② 隨選視訊", "③ 郵件訊息", "④ 線上直播", "⑤ 系統設定", "⑥ 多媒體播放", "⑦ 錄影機"];
//var str_mainmenu = ["節目表", "包月視訊", "隨選視訊", "郵件訊息", "線上直播", "系統設定", "多媒體播放", "錄影機"];
var str_secmenu0 = ["節目表"];
var str_secmenu1 = ["電影選單", "影片排行榜", "影片搜尋", "播放清單", "系統設定"];
var str_secmenu2 = ["電影選單", "影片排行榜", "影片搜尋", "播放清單", "系統設定"];
var str_secmenu3 = ["郵件列表"];
var str_secmenu4 = ["線上直播"];
var str_secmenu5 = ["頻道搜尋", "進階設定", "本機咨訊", "郵件列表", "聯繫我們"];
var str_secmenu6 = ["電影", "音樂", "圖片"];
var str_secmenu7 = ["已錄節目", "預約節目錄影", "預約時段錄影", "預約錄影清單"];
var son_mainmenu = [str_secmenu0, str_secmenu1, str_secmenu2, str_secmenu3, str_secmenu4, str_secmenu5, str_secmenu6, str_secmenu7];

var id_secmenu0 = ["epg"];
var id_secmenu1 = ["film", "film_rank", "film_search", "film_record", "film_setting"];
var id_secmenu2 = ["movie", "movie_rank", "movie_search", "movie_record", "movie_setting"];
var id_secmenu3 = ["mail"];
var id_secmenu4 = ["live"];
var id_secmenu5 = ["prosearch", "advset", "info", "mail", "contactus"];
var id_secmenu6 = ["media", "music", "pic"];
var id_secmenu7 = ["reclist", "order_program", "order_time", "orderlist"];

var son_id_mainmenu = [id_secmenu0, id_secmenu1, id_secmenu2, id_secmenu3, id_secmenu4, id_secmenu5, id_secmenu6, id_secmenu7];

var str_pic_s = "img/";
var str_pic_e = ".png";

var qam_cfg = [{ "id": 0, "value": "16QAM" }, { "id": 1, "value": "32QAM" }, { "id": 2, "value": "64QAM" }, { "id": 3, "value": "128QAM" }, { "id": 4, "value": "256QAM" }];



var str_ps_title = "系統設定>頻道搜尋";
var str_ps_choose = [{"id":"auto_search","name":"自動搜尋"},{"id":"manual_search","name":"手動搜尋"}];


/*  AdvSetting*/
var str_advset_title = "系統設定>進階設定";
var str_adc_choose = [{"id":"frq_set","name":"頻率設定"},{"id":"display_set","name":"顯示設定"},{"id":"video_set","name":"影音設定"},
{"id":"watch_set","name":"收視控制"},{"id":"factory_default","name":"出廠設定"},{"id":"net_set","name":"網絡設定"},{"id":"wifi_set","name":"WiFi設定"},
{"id":"channel_edit","name":"編輯喜好頻道"},{"id":"autooff_set","name":"自動關機設定"},];



var str_adf = ["主頻點(MHz):","符碼率(Kbps):","調製方式(QAM):","確定"]

var str_add = ["語言","功能表透明度","訊息顯示時間","確定"];


var str_info_title = "系統設定>本机资讯";
var str_info_choose = ["机上盒咨询","频道资讯","USB资讯","CA设定","系统升级"];


/*  EPG */
var str_epg_title = "節目表";
var str_epg_info_title = "孤單又燦爛的神-鬼怪(2)";
var str_epg_info_text = "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十";
var MB_ORDER_title_str = "預約錄影";
var MB_ORDER_TYPE_str = "選擇錄影方式";
var MB_ORDER_TYPE0_str = "單一節目錄影";
var MB_ORDER_TYPE1_str = "整部節目錄影";
var str_record = "錄影";
var str_back = "返回";
var str_confirm = "確定";

var str_epg_day = ["星期日", "星期一","星期二","星期三","星期四","星期五","星期六"];
var str_epg_fir = ["6/11 星期日", "6/12 星期一","6/13 星期二","6/14 星期三","6/15 星期四","6/16 星期五","6/17 星期六"];
var str_epg_sec = ["19 Discovery", "20 动物星球频道","21 天外天日本台","22 CN卡通频道","23 Disney迪士尼"];
var str_epg_cnew = ["1 AAA", "2 BBB","3 CCC","4 DDD","5 EEE","6 FFF","7 GGG"];
var str_epg_event = ["06:00-07:00 李 金 平 新 聞 分 析 （重 播）","07:00-07:30 馬心志英語教室 入籍英語教學","07:30-08:00 半 點 養 生 坊","08:00-08:30 晨 間 新 聞","08:30-09:00 健 身 舞 广 场 舞","9:00-10:00 兰 轩 时 间 赵少康时间 文茜的異想世界","10:00-11:00 早晨的公園 现场节目 新聞大掃描","11:00-12:00 健康知識家 健康樂活密碼 頂級名醫主講"];
var str_mail_title = "郵件訊息>郵件列表";
var str_maill_status = "正常 系統通知";
var str_maill_title = "標題 ";


var str_reclist_title = "錄影機>已錄節目";
var str_orderlist_title = "錄影機>預約錄影清單";

var MB_SEARCH_title_str = "頻道搜尋";
var MB_SEARCH_Save_str = "保存節目";
var MB_SEARCH_TYPE0_str = "是";
var MB_SEARCH_TYPE1_str = "否";


var MB_SEARCH_TYPE_str = "搜索中，停止搜索";
var MB_SEARCH_FAILED_str = "搜索失败，停止搜索";
var MB_ERROR_MESSAGE_str = "错误讯息";
var MB_ERROR_CONTEXT_str = "节目未授权，请洽天外天有限公司，电话:02-88885888";
var CONFIRM_str = "确定";

var MB_SETTING_title_str = "系统设置";
var MB_SETTING_MAINFRQ_str = "保存主频点修改";
var MB_SETTING_FACTORYDEF_str = "恢复出厂设置";
var MB_SETTING_UPDATE_str = "系统升级";
var MB_SETTING_REBOOT_str = "升级完成,重新起机";

var PE_ENTER_PINCODE_str = "輸入密碼";
var PE_PINCODE_ERROR_str = "密码输入错误,";
var PE_PINCODE_TIME_str = "次,";

var TV_str = "電視節目";
var RADIO_str = "廣播節目";
var ALL_PROGRAM_str = "所有節目";
var INPUT_FRQ_str = "輸入頻率(MHz)";
var SQMBL_str = "符碼率(Kbps)";
var QAM_str = "調製方式(QAM)";

var SEARCH_PROGRESS_str = "搜索進度";
var UPDATE_PROGRESS_str = "升级進度";
var SINGAL_STRENG = "信號強度";
var SINGAL_QUITY = "信號質量";
var str_order_num = "序號";
var str_state = "狀態";
var str_title = "標題";
var str_receipt_time = "接收時間";
var str_read = "閱讀";
var str_delete_all = "全部刪除";
var str_delete = "刪除";