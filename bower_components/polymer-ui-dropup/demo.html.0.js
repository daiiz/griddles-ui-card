
    document.addEventListener('polymer-ready', function() {
      document.querySelector('#search').addEventListener('tap', function() {
        document.querySelector('#dropup').toggle();
      });
    });
  