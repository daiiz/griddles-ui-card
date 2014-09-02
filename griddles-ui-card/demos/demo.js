

function griddlesAppInit() {
  var myApp_g = document.querySelector("griddles-ui-card");

  myApp_g.cards["sample"] = [];
	for(var i = 0; i < 100; i++) {
		var card = {"griddles_type": "card", "border_radius": 2, "shadow_depth": 1, "src": "", "contents": "<span>Hello, world!</span>", "className": "text", "height": Math.floor(Math.random()*200) + 50, "stream_index": false, "insert_type": "append"};
	    myApp_g.cards["sample"].push(card);
	}

  myApp_g.cards["photo"] = [];
	for(var i = 0; i < 100; i++) {
	  var src = "src/polymer.png";
	  var card = {"griddles_type": "photo_grid", "shadow_depth": 0, "src": src, "contents": "", "className": "text", "height": false, "stream_index": false, "insert_type": "append"};
      myApp_g.cards["photo"].push(card);
	}
  
  myApp_g.cards["reset"] = [];
}

function griddlesAppCardClicked(e) {
   console.log(e);
}

//
// ユーザーが入力したレイアウト情報を反映する
//
function set_layout() {
  var layouts = ["cardWidth", "cardMarginBottom", "streamMarginLeft", "streamMarginRight", "streamPaddingTop", "numberReadAtOnce", "displayFromTopLeftToBottomRight"];
  var myApp_g = document.querySelector("griddles-ui-card");
  for(var c = 0; c < layouts.length; c++) {
     myApp_g.layout[layouts[c]] = +(document.getElementById(layouts[c]).value);
  }
}

//
// ユーザーが入力したカードレイアウト情報を反映する
//
function set_card_layout() {
   var myApp_g = document.querySelector("griddles-ui-card");
   var shadow = +(document.getElementById("shadow_depth").value);
   var samples = myApp_g.cards["sample"];
   for(var c = 0; c < samples.length; c++) {
      card = samples[c];
      card.shadow_depth = shadow;
      myApp_g.cards["sample"][c] = card;
   }
}

window.addEventListener("click", function(e) {
  var myApp_g = document.querySelector("griddles-ui-card");

    if(e.target.className == "button_demo") {
    	set_layout();
        set_card_layout();

        myApp_g.query = e.target.id;
    }
}, false)