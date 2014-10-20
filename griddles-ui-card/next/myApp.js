// griddles-ui-card requires:

function griddlesAppInit() {
}

function griddlesAppCardClicked(card) {
  console.log(card);
}

// for demo:
var counter = 0;
document.getElementById("btn1").addEventListener("click", function() {

  var card;
  for(var i = 0; i < 100; i++) {
     if(i % 5 == 0) {
       card = "<griddle-card type='photo'><content>foo.png</content></griddle-card>";
     }else {
       card = "<griddle-card borderRadius="+counter+" height='random'><content>plus"+counter+"</content></griddle-card>";
     }
     counter++;
     $("griddles-ui-card").append(card);
  }
  document.querySelector("griddles-ui-card").query = 'test_query_' + counter;

}, false);