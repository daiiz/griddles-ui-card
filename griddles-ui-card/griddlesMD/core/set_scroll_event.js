function set_scroll_event() {
 var scroll_wrappers = ["document", "core_scroll_header_panel"];
 var scroll_wrapper = "user_div_element";
 /* g_wrapperは、以下のどれか１つ または id が与えられる。 
  * "document", "core-scroll-header-panel"
  */
 var g_wrapper = document.querySelector("griddles-ui-card").wrapper;
 if(g_wrapper == undefined || g_wrapper == "") {
    document.querySelector("griddles-ui-card").wrapper = scroll_wrappers[0];
    g_wrapper = scroll_wrappers[0];
 }

 /* scroll_wrapperに値を設定する。 scroll_wrapperはscroll_setのkeyである。 */
 for(var q = 0; q < scroll_wrappers.length; q++) {
    g_wrapper = g_wrapper.replace(/-/gi, '_');
    if(g_wrapper == scroll_wrappers[q]) {
         scroll_wrapper = scroll_wrappers[q];
    }
 }

 var scroll_set = {
    "document": {
        scroll_stage: function() {
            return document
        },
        sh: function(max_stream_index) {
            return $(document).height()
        },
        sp:  function() {
            return $(window).height() + $(window).scrollTop()
        }
    },
    "core_scroll_header_panel": {
        scroll_stage: function() {
            return document.querySelector('core-scroll-header-panel').scroller
        },
        sh: function(max_stream_index) {
            return AppData.int_offsetHeights[max_stream_index] + $("core-toolbar").height()
        },
        sp: function() {
            return $("#panel").height() + document.querySelector('core-scroll-header-panel').scroller.scrollTop
        }
    },
    "user_div_element": {
        scroll_stage: function() {
            return document.getElementById(g_wrapper)
        },
        sh: function(max_stream_index) {
            return AppData.int_offsetHeights[max_stream_index]
        },
        sp: function() {
            return $(scroll_stage).height() + $(scroll_stage).scrollTop()
        }
    }
 }
 
 var scroll_stage = scroll_set[scroll_wrapper].scroll_stage();

 scroll_stage.addEventListener("scroll", function() {
    var max_stream_index = +((home.get_max_height_stream_id()).split("_")[1]);
    var sh = scroll_set[scroll_wrapper].sh(max_stream_index);
    var sp = scroll_set[scroll_wrapper].sp();

    if (((sh - sp) / sh) === 0) {
        // スクロールによってページの下部に到達した場合
        console.log(">  "+ AppData.render_status);

        if ((AppData.int_card_times + 1) < CardData.length) {   /* ここ */
            window.clearInterval(home.interval_scroll_zero_session_id);
            home.interval_scroll_zero_session_id = window.setInterval(home.interval_scroll_zero, 10);
        } else {
            console.info(":: no card.");
            //var restart = .scrollEnd();
            if(user_settings.restart == true) {
              // AppData.int_card_times = AppData.int_card_times -1;
              // AppData.render_status = ["stop", AppData.int_card_times];
               console.info(":: RE:: new load.");
               home.continue();
            }else {
              // AppData.int_card_times = AppData.int_card_times -1;
              // AppData.render_status = ["stop", AppData.int_card_times];
               console.info(":: RE:: 'restart' is FALSE");
            }
        }
    }
 }, false);
}

/*
function set_scroll_event() {
    var max_stream_index = +((home.get_max_height_stream_id()).split("_")[1]);
    user_settings.scroll_element = {
        "scroll_stage": document.querySelector('core-scroll-header-panel').scroller,
        "sh": AppData.int_offsetHeights[max_stream_index] + $("core-toolbar").height(),
        "sp": $("#panel").height() + document.querySelector('core-scroll-header-panel').scroller.scrollTop
    };
    scroll_event();
}
*/
