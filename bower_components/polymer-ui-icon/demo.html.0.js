
      addEventListener('polymer-ready', function() {
        var icons = Object.keys(document.querySelector('#meta').getIconset().iconMap);
        var plates = document.querySelectorAll('template');
        for (var i = 0, p; p=plates[i]; i++) {
          p.model = icons;
        }
      });
    