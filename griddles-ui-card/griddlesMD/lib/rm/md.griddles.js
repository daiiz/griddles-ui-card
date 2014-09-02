/*
 * Copyright (c) 2014 daiz. All rights reserved.
 * This code may only be used under the BSD style license.
 */

var griddles = {apis : {}};
var home = griddles;
var apis = griddles.apis;
var doc = document;

var clog = function(x) {
	//console.log(x);
}

home.get_screen_info = function() {
  var w = AppData.int_last_window_width;
  var h = document.body.clientHeight;
  if(w > h) {
     // 横長
     AppData.screen_pl = "landscape";
  }else {
     // 縦長
     AppData.screen_pl = "portrait";
  }
  var layout_object = user_settings.screen_layout[AppData.screen_pl];

  var max_number_of_stream;
}

home.px_to_int = function(px) {
   return +(px.replace("px", ""));
}

home.int_to_px = function(int) {
   return int + "px";
}

home.isNotEnpty = function(value) {
   var x = [];
   var res = 1;
   x[0] = (value == "") ? 0 : 1;
   x[1] = (value == null) ? 0 : 1;
   x[2] = (value == undefined) ? 0 : 1;
   x[3] = (value.length == 0) ? 0 : 1;
   for(var i = 0; i < x.length; i++) {
   	  res = res * x[i];
   }
   return (res == 1) ? true : false;
}

home.make = function(template, json) {
	var keys = Object.keys(json);
	var code = template;
	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
	    var rg = new RegExp("{" + key + "}", "gi");
	    code = code.replace(rg, json[key]);
	}
	return code;
}

home.render_stream = function(stage_id) {
   var max = AppData.int_max_streams;
   var cardW = user_settings.card_width;
   var marginL = user_settings.margin_left;
   var marginR = user_settings.margin_right;
   var sumW = 0;
   // 調整用の左余白を取得する
   for(var i = 0; i < max; i ++) {
       sumW = sumW + (marginL + cardW + marginR);
   }
   //sumW = sumW - marginL - marginR;
   var diff = AppData.int_last_window_width - sumW;//AppData.int_gadget_width - sumW;
   var int_adjustment_paddingL = 0;
   if(diff >= 0) {
      int_adjustment_paddingL = Math.floor(diff / 2);
   }else {
   	  console.error("diff < 0 .");
   }

   // ストリームをレンダリングする
   home.griddlesNode["gadget-griddles"].style.paddingLeft = home.int_to_px(int_adjustment_paddingL); /* CH2 */
   var template_stream = '<div id="stream_{I}" class="stream" style="width: {W}px; margin-left: {L}px; margin-right: {R}px;">{T}</div>';
   var json_stream = {"I": 0, "L": marginL, "R": marginR, "T": "", "W": cardW};
   var html = "";
   for(var j = 0; j < max; j++) {
      json_stream.I = j;
      html = home.make(template_stream, json_stream);
      // console.log(html); /* ^o^ */
      $(home.griddlesNode["gadget-griddles"]).append(html); /* CH2 */
   }


   // ストリームの高さを保持する配列を用意する
   // この配列は reserve_card_place 毎に更新される
   AppData.int_offsetHeights = [];
   AppData.int_render_card_times = 0;
   for(var j = 0; j < max; j++) {
      AppData.int_offsetHeights[j] = home.griddlesNode["gadget-griddles"].querySelector("#stream_" + j).offsetHeight; //doc.getElementById("stream_" + j).offsetHeight;
   }
   AppData.int_card_times = 0;
   home.configure_card_design(AppData.int_card_times);
}

home.get_max_height_stream_id = function() {
  var max_index = 0;
    for(var i = 0; i < AppData.int_max_streams; i++) {
      var max = AppData.int_offsetHeights[max_index];
      var now = AppData.int_offsetHeights[i];
      if(now > max) {
        max_index = i;
      }
    }
    return "#stream_" + max_index;
}

home.get_min_height_stream_id = function() {
	var min_index = 0;
    for(var i = 0; i < AppData.int_max_streams; i++) {
    	var min = AppData.int_offsetHeights[min_index];
    	var now = AppData.int_offsetHeights[i];
    	if(now < min) {
    		min_index = i;
    	}
    }
    return "#stream_" + min_index;
}

home.event_render_stoped = function(times) {
   //console.log(times);
   LAST_STOP_NUMBER = times;
   AppData.render_status = ["stop", times];
   var min_stream_index = +((home.get_min_height_stream_id()).split("_")[1]);
   var min_stream_height = AppData.int_offsetHeights[min_stream_index];
   var gadget_h = home.griddlesNode["gadget-griddles"].style.height;  /* CH1 */
   
   // gadgetの領域の高さを取得
   if(gadget_h == "") {
      gadget_h = window.innerHeight;
   }else {
      gadget_h = home.px_to_int(gadget_h);
   }
   //console.log(times);
   if(min_stream_height < gadget_h && times < CardData.length) {
      console.log("> auto_abort");
      //doc.getElementsByTagName("html")[0].style.overflowY = "hidden";
      home.continue();
   }else {
      //doc.getElementsByTagName("html")[0].style.overflowY = "scroll";
      var min_stream_index = +((home.get_min_height_stream_id()).split("_")[1]);
      AppData.int_last_min_stream = AppData.int_offsetHeights[min_stream_index];
      //$($("#stream_"+min_stream_index)[0]).append("<div class='title' style='color: #222; background: #fff; padding: 10px' id='more'><center>more</center></div>");
      AppData.auto_abort = false;
      if(AppData.bool_scroll_event_is_setted == false) {
         AppData.bool_scroll_event_is_setted = true;
         set_scroll_event();
      }
   }
};

home.event_render_run = function(times) {
   //doc.getElementsByTagName("html")[0].style.overflowY = "hidden";
   AppData.render_status = ["run", times];
   //console.log(AppData.render_status);
}

home.configure_card_design = function(times) {
  if(times < CardData.length) {
   home.event_render_run(times);
   var card_data = CardData[times];
   var card_type = card_data.griddles_type;
   var user_screen = AppData.int_user_screen;
   var template_img = '<img src="{U}" style="width:100%; height:100%">';

   if(card_type == "photo_grid") {
       var web_url = card_data.src;
       var canvas = home.griddlesNode["canvas-griddles"]; //document.getElementById("canvas-griddles");
       if(user_screen == PC_WEB || user_screen == MOBILE_WEB) {
       	  var photo = new Image();
       	  photo.onload = function() {
       	  	  var W = photo.width;
       	      var H = photo.height;
       	      var w = user_settings.card_width;
       	      var h;
       	      if(card_data.height != false && card_data.height > 0) {
                 h = card_data.height;
       	      }else {
       	  	     h = Math.floor((w / W) * H);
       	      }
       	      canvas.style.width = home.int_to_px(w);
       	      canvas.style.height = home.int_to_px(h);
       	      canvas.src = web_url;
              
              CardData[times].contents = home.make(template_img, {"U": web_url});
              CardData[times].src = web_url;
              CardData[times].height = h;
              CardData[times].design_configured = true;
              home.reserve_card_place(times);
       	  };
       	  photo.onerror = function(e) {
       	    //console.log(e);
       	    web_url = "#";
       	    var h = 0;
       	    CardData[times].contents = home.make(template_img, {"U": web_url});
            CardData[times].src = web_url;
            CardData[times].height = h;
            CardData[times].design_configured = true;
       	    home.reserve_card_place(times);
       	  };
       	  photo.src = web_url;
       }
   }

   if(card_type == "card") {
       var div = home.griddlesNode["div-griddles"]; //document.getElementById("div-griddles");
       div.innerHTML = "";
       var html = $(card_data.contents);
       $(home.griddlesNode["div-griddles"]).append(html);   // $("#div-griddles")[0]
       html.ready(function() {
           // CardData[times].contents
           var h;
           if(card_data.height != false && card_data.height > 0) {
              h = card_data.height;
       	   }else {
      	      h = home.griddlesNode["div-griddles"].offsetHeight; //doc.getElementById("div-griddles").offsetHeight;
       	   }
           CardData[times].src = null;
           CardData[times].height = h;
           CardData[times].design_configured = true;
           home.reserve_card_place(times);
       });
   }

 }else {
    console.info("NOT left card in 'CardData' ");
    home.event_render_stoped(times);
 }
}

home.reserve_card_place = function(times) {
   var template_reserve = '<div id="reserve_{I}" class="card-reserve {C}-reserve" style="margin-bottom: {B}px; width: {W}px; height: {H}px;">{T}</div>';
   var json_reserve = {"I": 0, "C": "default", "B": user_settings.margin_bottom, "W": user_settings.card_width, "H": 0, "T": ""};
   var target_stream_id = home.get_min_height_stream_id();
   var st_index = CardData[times].stream_index;
   //console.log(st_index);
   	  if(st_index == undefined || st_index === false) {
   	  }else {
   	  	if(st_index >= 0 && st_index < AppData.int_max_streams) {
   	  		target_stream_id = "#stream_" + st_index;
   	  	}
   	  }
      //console.log(target_stream_id);
      json_reserve.I = times;
      if(home.isNotEnpty(CardData[times].className) == true) {
        json_reserve.C = CardData[times].className;
      }
      json_reserve.H = CardData[times].height;
      //json_reserve.T = "";//Loading..."; 
      var html = home.make(template_reserve, json_reserve);
      //console.log("<%d> " + html, times);
      html = $(html);
      if(CardData[times].insert_type == PREPEND) {
        $(home.griddlesNode["gadget-griddles"].querySelector(target_stream_id)).prepend(html); /*^o^*/
      }else {
      	$(home.griddlesNode["gadget-griddles"].querySelector(target_stream_id)).append(html);
      }
      html.ready(function() {
      	 var index = +(target_stream_id.split("_")[1]);
         AppData.int_offsetHeights[index] = home.griddlesNode["gadget-griddles"].querySelector("#stream_" + index).offsetHeight; //doc.getElementById("stream_" + index).offsetHeight;
         home.display_card(times);
      });
}

home.get_sahdow_code = function(int_z_depth) {
   if(int_z_depth >= 6) {
      int_z_depth = 6;
   }
   /* 
    * CSS style data for shadows:
    *
    * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
    */
   var z_bottoms = {
                    z0: "", 
                    z1: "",
                    z2: "box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);",
                    z3: "box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);",
                    z4: "box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);",
                    z5: "box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22);",
                    z6: "box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2);",
                   };
   var z_tops = {
                    z0: "",
                    z1: "box-shadow: rgba(0, 0, 0, 0.098) 0px 2px 4px, rgba(0, 0, 0, 0.098) 0px 0px 3px;",
                    z2: "box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);",
                    z3: "box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
                    z4: "box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19);",
                    z5: "box-shadow: 0 25px 55px 0 rgba(0, 0, 0, 0.21);",
                    z6: "box-shadow: 0 40px 77px 0 rgba(0, 0, 0, 0.22);",
                }
   var template_shadow = "<div class='shadow shadow_bottom' style='{B}'></div><div class='shadow shadow_top' style='{T}'></div>";
   var html_shadow = home.make(template_shadow, {"B": z_bottoms["z" + int_z_depth], "T": z_tops["z" + int_z_depth]});
   return html_shadow;
}

home.ers_times = 0;

home.display_card = function(times) {
   // var shadow_bottom = '<div class="shadow-bottom"></div>';
   // var shadow_top = '<div class="shadow-top"></div>';
   var shadow = home.get_sahdow_code(CardData[times].shadow_depth);
   var template_card = '<div id="card_{I}" class="card-non-visible card {C}" style="height: {H}px; width: {W}px; border-radius: {R}px;" data-clickable="card">{T}</div>';
   var contents = CardData[times].contents; // chrome appsでの外部画像の場合の処理は別途用意
   var radius = 0;
   if(CardData[times].border_radius != undefined) {
      radius = CardData[times].border_radius;
   }
   var json_card = {"I": times, "H": CardData[times].height, "C": CardData[times].className, "W": user_settings.card_width, "R": radius,"T": shadow + contents};
   var html = home.make(template_card, json_card);
   clog(html);
   html = $(html);
   $(home.griddlesNode["gadget-griddles"].querySelector("#reserve_" + times)).append(html);/*^o^*/
   html.ready(function() {
      // 再帰的にreserve_card_placeを呼ぶ
      // 非表示状態を表示状態に変更する
      var card = home.griddlesNode["gadget-griddles"].querySelector("#reserve_" + times); //$("#reserve_" + times)[0];
      //console.log("%" + (card.offsetTop - AppData.int_last_min_stream - user_settings.padding_top_of_stream));
      var offset = card.offsetLeft + (card.offsetTop - AppData.int_last_min_stream - user_settings.padding_top_of_stream);
      var delay = offset/1000;
      var rate = user_settings.displayFromTopLeftToBottomRight;
      if(rate == undefined || rate == false) {
         rate = 0;
      }
      //console.log(rate);
      //delay = 0;
      home.griddlesNode["gadget-griddles"].querySelector("#card_" + times).style.transitionDelay = delay * rate + "s"; /*console.log(delay * 0.01);0.224*/
      $(home.griddlesNode["gadget-griddles"].querySelector("#card_" + times)).removeClass('card-non-visible');

      if(AppData.bool_abort_flag == false) {
         // 中断フラグが false ならば続行
         if(user_settings.one_time_loading_card_number != false && times == home.stop_number(LAST_STOP_NUMBER)) {
             AppData.bool_abort_flag = true;
         }
         times = times + 1;
         AppData.int_card_times = times;
         //clog(AppData.int_card_times);
         home.configure_card_design(times);
      }else if(AppData.bool_abort_flag == true){
         //console.info('[1] "bool_abort_flag" is TRUE. (times: ' + times +')');
         home.ers_times = times;
         home.event_render_stoped(times);
         //window.setTimeout(home.delay_event_render_stoped, 100);
         AppData.bool_abort_flag = false;  // これ
      }
   });
  
}

home.delay_event_render_stoped = function() {
  home.event_render_stoped(home.ers_times);
  AppData.bool_abort_flag = false;
}


home.stop_number = function(x) {
   return (user_settings.one_time_loading_card_number + x);
}

home.set_scrollbar_width = function() {
   AppData.int_scrollbar_width = 17;
   var userAgent = window.navigator.userAgent.toLowerCase();
   if(userAgent.indexOf('android') != -1) {
      var u = ANDROID;
      AppData.int_scrollbar_width = 0;
   }else if(userAgent.indexOf('ipad') != -1) {
      var u = IPAD;
      AppData.int_scrollbar_width = 0;
   }else if(userAgent.indexOf('iphone') != -1) {
      var u = IPHONE;
      AppData.int_scrollbar_width = 0;
   }else {
      var u = PC;
   }
   console.info(u);
}

home.init = function() {
   // 使用可能な横幅を取得する
   home.set_scrollbar_width();
   home.griddlesNode["gadget-griddles"].style.paddingTop = home.int_to_px(user_settings.margin_bottom);  /* CH1 */
   var int_screenW = document.body.clientWidth - AppData.int_scrollbar_width//window.innerWidth;
   var int_screenH = window.innerHeight;
   var int_usingW = (int_screenW * (user_settings.screen_persent / 100)); //AppData.int_scrollbar_width;
   AppData.int_last_window_width = int_screenW; //- AppData.int_scrollbar_width;

   // 使用可能なストリーム数を取得する
   var int_card_width = user_settings.card_width;
   var int_margin_left = user_settings.margin_left;
   var int_margin_right = user_settings.margin_right;
   var int_max_stream = 0;
   //console.log(int_usingW / (int_margin_left + int_card_width + int_margin_right));
   var int_able_stream = Math.floor(int_usingW / (int_margin_left + int_card_width + int_margin_right));
   if(user_settings.max_number_of_streams == false) {
      int_max_stream = int_able_stream;
   }else {
      if(int_able_stream < user_settings.max_number_of_streams) {
          int_max_stream = int_able_stream;
      }else {
          int_max_stream = user_settings.max_number_of_streams;
      }
   }

   // #gadget-griddles　の内容をリセットする
   home.griddlesNode["gadget-griddles"].innerHTML = ""; /* CH1 */

   AppData.int_max_streams = int_max_stream;
   AppData.int_gadget_width = (Math.floor(int_usingW) % 2 == 0) ? (Math.floor(int_usingW)) : (Math.floor(int_usingW) + 0);
   home.griddlesNode["gadget-griddles"].style.width = home.int_to_px(AppData.int_gadget_width);  /* CH1 */

   home.render_stream("#gadget-griddles");
}

home.continue = function() {
  //if((AppData.int_card_times + 1) < CardData.length) {
     home.configure_card_design(AppData.int_card_times + 1);
  //}
}

home.onclick = function(e) {

}

home.window_resized_timer = false;
home.window_resized = function(e) {
  if (home.window_resized_timer !== false) {
    clearTimeout(home.window_resized_timer);
  }
  //home.window_resized_timer = setTimeout(function() {
    console.log('Resized?');
    var ww = window.innerWidth;
    var prev_ww = AppData.int_last_window_width;
    if(ww != prev_ww) {
       AppData.int_last_window_width = ww;
       console.log("> Resized. Call 'init()?'");
       //home.init();
    }
  //}, 200);
}

/* Event Listeners */
$(window).resize("resize", home.window_resized);

(function() {
   var class_griddles = document.getElementsByClassName("home-griddles");
   for(var i = 0; i < class_griddles.length; i++) {
   	  class_griddles[i].addEventListener("click", home.onclick, false);
   }
})();


home.init_delay = function() {
   var ms_delay = AppData.int_init_delay;
   window.setTimeout(home.init, ms_delay);
}

home.interval_scroll_zero_session_id = "";
home.interval_scroll_zero = function() {
   console.log(">> "+ AppData.render_status);
   if (AppData.render_status[0] == "stop") {
      console.info(":: new load.");
      window.clearInterval(home.interval_scroll_zero_session_id);
      home.continue();
   }
}

home.new_session = function(array_cards, init_flag) {
  if(init_flag == undefined || init_flag == true) {
    // カードをセットし、初期化・ロードを開始する。
    AppData.int_last_min_stream = 0;
    AppData.bool_abort_flag = true;
    LAST_STOP_NUMBER = 0;
    var re = 1;
    if(AppData.auto_abort == false) {
    AppData.auto_abort = true;
    CardData = array_cards;
     //while(re == 1) {
       if(AppData.render_status[0] == "stop") {
          re = 0;
          AppData.bool_abort_flag = false;
          home.init();
          return true;
       }else {
          console.info("invalid.-1");
          return false;
       }
     //}
    }else {
      console.info("invalid.-2");
      return false;
    }
  }else if(init_flag == false) {
    // カードを追加し、初期化・ロードは行わない。
  }
}
