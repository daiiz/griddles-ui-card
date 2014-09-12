
    Polymer('polymer-scale', {
      fromX: '1',
      fromY: '1',
      toX: '1',
      toY: '1',
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
          {transform: 'scale(' + this.fromX + ',' + this.fromY + ')'},
          {transform: 'scale(' + this.toX + ',' + this.toY + ')'}
        ];
      }
    });
  