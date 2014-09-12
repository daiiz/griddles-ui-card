
    document.addEventListener('polymer-ready', function() {
      document.querySelector('#dots').addEventListener('tap', function() {
        document.querySelector('#dropdown').toggle();
      });
    });
  