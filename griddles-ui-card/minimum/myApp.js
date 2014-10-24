// minimum/myApp.js
// griddles-ui-card requires:

function griddlesAppInit(api) {
  console.log(api);
}

function griddlesAppCardClicked(card) {
  console.dirxml(card);
}

// for demo:
var counter = 0;
document.getElementById("btn1").addEventListener("click", function() {

  var card;

  // text type
  var api = document.querySelector("griddles-ui-card").apis;
      card = api.makeCard(null, 'C', "<div>daiki</div>");
      card = api.makeCard(card, 'P', "blue");
      card = api.makeCard(card, 'P', "#ffeb3b"); // 最後に宣言したものが適用される
      card = api.makeCard(card, 'R', 9);
      card = api.makeCard(card, 'H', 'random');
      card = api.makeCard(card, 'C', "<div>daiz</div>"); // 最後に宣言したものが適用される
  $("griddles-ui-card").append(card);

  // photo type
      card = api.makeCard(null, 'T', "photo");
      card = api.makeCard(card, 'R', 20);
      card = api.makeCard(card, 'S', 3);
      card = api.makeCard(card, 'C', "foo.png");
      card = api.makeCard(card, 'D', "blogURL:me.blog.com");
  $("griddles-ui-card").append(card);


  for(var i = 0; i < 100; i++) {
     if(i % 5 == 0) {
       card = api.makeCard(null, "R", counter);
       card = api.makeCard(card, "C", "foo.png");
       card = api.makeCard(card, "T", "photo");
     }else {
       card = api.makeCard(null, "R", counter);
       card = api.makeCard(card, "C", "plus"+counter);
       card = api.makeCard(card, "H", "random");
     }
     counter++;
     $("griddles-ui-card").append(card);
  }
  document.querySelector("griddles-ui-card").query = 'test_query_' + counter;

}, false);