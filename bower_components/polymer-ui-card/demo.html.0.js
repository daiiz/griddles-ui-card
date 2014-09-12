
      document.addEventListener('polymer-ready', function() {
        document.querySelector('#cards').addEventListener(
          'polymer-card-swipe-away', function(e) {
            e.target.parentNode.removeChild(e.target);
          });
      })
    