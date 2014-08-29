/* TEST FILE. */
var CHROME_APP = 3;
var PC_WEB = 1;
var MOBILE_WEB = 2;
var UNKNOWN = 0;
var GRID_PHOTO = "photo_grid";
var CARD = "card";
var APPEND = "append";
var PREPEND = "prepend";
var LAST_STOP_NUMBER = 0;
var ANDROID = "android OS"
var IPAD = "iPad";
var IPHONE = "iPhone";
var PC = "NOT mobile";


var user_settings = {
	max_number_of_streams : false,
    /*stop_number: function(x) {return (15 + x)},  OR false */
	card_width : 194,    /*横・縦モードに依って異なる*/ /*300*/ /*280*/
	screen_persent : 100,
	margin_left : 2, /* 17 17 34 */ /*14 14 28*/   /* 4 4 8 */
	margin_right : 2,
	margin_bottom: 4,
  restart: false,
  displayFromTopLeftToBottomRight: false,
  one_time_loading_card_number: 20, /* OR false */
  padding_top_of_stream: 10,
  screen_layout: {
    landscape: {},
    portrait:  {}
  }
};

// programmatically.
var AppData = {
  int_user_screen: PC_WEB,
  int_last_window_width: UNKNOWN,
  int_init_delay: 10,
  bool_abort_flag: false,
  //func_new_session_callback: function(){},
  bool_new_session_callback_called: false,
  render_status: ["stop", -1],
  int_card_times: -1,
  abort: false, // 使っていない
  auto_abort: false,  //強制的に続ける
  int_last_min_stream: 0,
  bool_scroll_event_is_setted: false,
  int_scrollbar_width: 17
};
// {"contents", "class", "height", "griddles_type"}
var CardData = [
    //{"contents": "<div style='padding: 5px;'>hello</div>", "className": "text", "height": 30},
    //{"contents": "<div>hello, world!</div>", "className": "text", "height": 50}
];

