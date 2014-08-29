function set_scroll_event() {
   var scroll_stage = document.getElementById("stage");
 //var scroll_stage = document.querySelector('core-scroll-header-panel').scroller;
 scroll_stage.addEventListener("scroll", function() {
    var max_stream_index = +((home.get_max_height_stream_id()).split("_")[1]);
    var sh = AppData.int_offsetHeights[max_stream_index];
  //var sh = AppData.int_offsetHeights[max_stream_index] + $("core-toolbar").height();
    var sp = $(scroll_stage).height() + $(scroll_stage).scrollTop();
  //var sp = $("#panel").height() + document.querySelector('core-scroll-header-panel').scroller.scrollTop;
    //console.log(sh - sp);

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
