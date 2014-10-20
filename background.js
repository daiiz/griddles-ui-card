// background.js
chrome.app.runtime.onLaunched.addListener(function() {
   // griddles-ui-card/yummy/index.html
   // griddles-ui-card/demos/demo_document.html
   // griddles-ui-card/demos/demo_div.html
   chrome.app.window.create('griddles-ui-card/next/index.html', {
      width: 615,
      height: 690,
      type: 'shell',
      //id: '__',
      singleton: false
   },function(appWindow) {
      //appWindow.resizeTo(400, 250)
   });
});