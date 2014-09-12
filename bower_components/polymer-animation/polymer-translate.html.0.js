
    Polymer('polymer-translate', {
      fromX: '0',
      fromY: '0',
      toX: '0',
      toY: '0',
      fromXChanged: function() {
        this.generate();
      },
      fromYChanged: function() {
        this.generate();
      },
      toXChanged: function() {
        this.generate();
      },
      toYChanged: function() {
        this.generate();
      },
      generate: function() {
        this.keyframes = [
          {transform: 'translate3d(' + this.fromX + ',' + this.fromY + ', 0)'},
          {transform: 'translate3d(' + this.toX + ',' + this.toY + ', 0)'}
        ];
      }
    });
  