
      document.body.onclick = function(e) {
        var p = document.querySelector('polymer-ui-pages');
        p.selected = (p.selected + 1) % 5;
      }
    