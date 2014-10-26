//
// background.js for chrome apps
//

chrome.app.runtime.onLaunched.addListener(function() {
   // griddles-ui-card/yummy/index.html
   // griddles-ui-card/demos/demo_document.html
   // griddles-ui-card/demos/demo_div.html
   chrome.app.window.create('griddles-ui-card/demos/demo_div.html', {
      width: 615,
      height: 690,
      type: 'shell',
      singleton: false
   },function(appWindow) {
   });
});