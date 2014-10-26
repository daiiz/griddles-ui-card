
function griddlesAppInit() {
}

function griddlesAppCardClicked(e) {
   console.log(e);
}


//
// blank card
//
function set_blankCard(n) {
  var g = document.querySelector("griddles-ui-card");
  for(var i = 0; i < n; i++) {
    var card = g.apis.makeCard(null, 'T', 'card');
        card = g.apis.makeCard(card, 'R', 2);
        card = g.apis.makeCard(card, 'S', +(document.getElementById("shadow_depth").value));
        card = g.apis.makeCard(card, 'C', "<div>Hello, world!</div>");
        card = g.apis.makeCard(card, 'H', "random");
    $("griddles-ui-card").append(card);
  }
}


//
// photo card
//
function set_photoCard(n) {
  var g = document.querySelector("griddles-ui-card");
  var src = "src/polymer.png";
  for(var i = 0; i < n; i++) {
    var card = g.apis.makeCard(null, 'T', 'photo');
        card = g.apis.makeCard(card, 'R', 0);
        card = g.apis.makeCard(card, 'S', +(document.getElementById("shadow_depth").value));
        card = g.apis.makeCard(card, 'C', src);
        card = g.apis.makeCard(card, 'H', false);
    $("griddles-ui-card").append(card);
  }
}

//
// ユーザーが入力したレイアウト情報を反映する
//
function set_layout() {
  var layouts = ["cardWidth", "cardMarginBottom", "streamMarginLeft", "streamMarginRight", "streamPaddingTop", "numberReadAtOnce", "displayFromTopLeftToBottomRight"];
  var myApp_g = document.querySelector("griddles-ui-card");
  for(var c = 0; c < layouts.length; c++) {
     myApp_g[layouts[c]] = +(document.getElementById(layouts[c]).value);
  }
}


window.addEventListener("click", function(e) {
  if(e.target.className == "button_demo") {
    var myApp_g = document.querySelector("griddles-ui-card");
    var n = Math.random() * 1000;
    set_layout();

    if(e.target.id == "sample") {
      set_blankCard(100);
    }else if(e.target.id == "photo") {
      set_photoCard(100);
    }

    myApp_g.query = e.target.id + n;
  }
}, false);