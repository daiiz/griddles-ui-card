// griddle-card

var counter = 0;
document.getElementById("btn1").addEventListener("click", function() {

  for(var i = 0; i < 100; i++) {
     var card = "<griddle-card borderRadius="+counter+"><content>plus"+counter+"</content></griddle-card>";
     counter++;
     $("griddles-ui-card").append(card);
  }
  document.querySelector("griddles-ui-card").query = 'test_query_' + counter;
}, false);

document.getElementById("btn3").addEventListener("click", function() {
  document.querySelector("griddles-ui-card").query = 'test_query_' + counter;
}, false);