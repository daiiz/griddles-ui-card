

function griddlesAppInit() {
  var myApp_g = document.querySelector("griddles-ui-card");
  console.log(myApp_g.cards);
	for(var i = 0; i < 100; i++) {
		var card = {"griddles_type": "card", "shadow_depth": 1, "src": "", "contents": "<span>Hello, world!</span>", "className": "text", "height": Math.floor(Math.random()*200) + 50, "stream_index": false, "insert_type": "append"};
	  myApp_g.cards["sample"].push(card);
	}

  myApp_g.cards["photo"] = [];
	for(var i = 0; i < 100; i++) {
	  var src = "src/polymer.png";
	  //var src1 = "src/polymer1.png";
		var card = {"griddles_type": "photo_grid", "shadow_depth": 0, "src": src, "contents": "", "className": "text", "height": false, "stream_index": false, "insert_type": "append"};
		//var card1 = {"griddles_type": "photo_grid", "shadow_depth": 0, "src": src1, "contents": "", "className": "text", "height": false, "stream_index": false, "insert_type": "append"};
    myApp_g.cards["photo"].push(card);
    //myApp_g.cards["photo"].push(card1);
	}
}

window.addEventListener("click", function(e) {
  var myApp_g = document.querySelector("griddles-ui-card");
    if(e.target.className == "button_demo") {
    	myApp_g.query = e.target.id;
    }
}, false)