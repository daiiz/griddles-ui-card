
      document.addEventListener('polymer-ready', function() {
        var selector = document.querySelector('polymer-selector');
        selector.addEventListener('polymer-select', function(e) {
          if (e.detail.isSelected) {
            document.querySelector('polymer-ui-nav-arrow').target = e.detail.item;
          }
        });
      })
    