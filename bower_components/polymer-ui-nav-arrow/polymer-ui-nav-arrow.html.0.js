
    Polymer('polymer-ui-nav-arrow', {
      direction: 'left',
      size: 9,
      borderColor: '#000',
      show: false,
      enteredView: function() {
        this.showChanged();
      },
      showChanged: function() {
        this.classList.toggle('hidden', !this.show);
      },
      targetChanged: function() {
        this.show = !!this.target;
        if (this.target) {
          this.asyncMethod('move');
        }
      },
      translateY: function(y) {
        var s = this.style;
        s.webkitTransform = s.mozTransform = s.msTransform = s.transform = 
          'translate3d(0,' + y + 'px,0)';
      },
      move: function() {
        var t = this.target;
        // if the target has getOffsetMiddle(), use that instead
        var y = t.getOffsetMiddle ? t.getOffsetMiddle() : 
            (t.offsetTop + t.offsetHeight/2);
        this.translateY(y);
      }
    });
  