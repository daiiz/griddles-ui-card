// griddles-ui-card

function griddlesAppInit() {
    document.querySelector("griddles-ui-card").layout = {
       'cardWidth': 190,
       'cardMarginBottom': 4,
       'streamMarginLeft': 2,
       'streamMarginRight': 2,
       'streamPaddingTop': 10,
       'numberReadAtOnce': 20,
       'displayFromTopLeftToBottomRight': 0.01
    };
    set_cards(30); // カードを30枚表示する。
  }
  function griddlesAppCardClicked(card) {
  }

  function set_cards(n) {
     var cards = [];
     for(var i = 0; i < n; i++) {
         var card = {
           'griddles_type': 'card', // または'photo_grid'
           'shadow_depth': 1,
           'src': '',
           'contents': '<div>Hello!</div>',
           'className': '',
           'height': Math.floor(Math.random()*200) + 50,
           'stream_index': false,
           'insert_type': 'append',
           'border_radius': 2,
           'dataset': {'name': 'bar'}
         };
         cards.push(card);
     }
     document.querySelector("griddles-ui-card").cards = {'myCard': cards};
     document.querySelector("griddles-ui-card").query = 'myCard';
  }