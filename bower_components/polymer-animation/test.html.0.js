
    document.addEventListener('polymer-ready', function() {
      var a = document.querySelector('transition-hslide-scale-out');
      a.target = document.querySelector('div');
      setTimeout(function() {
        a.play();
      }, 50);
    });
  