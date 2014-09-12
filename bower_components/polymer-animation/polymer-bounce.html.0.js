
    Polymer('polymer-bounce', {
			targetSelector: '',
			duration: 1,
			magnitude: '-30px',
      ready: function() {
        this.super();
        this.magnitudeChanged();
      },
      magnitudeChanged: function() {
        this.generate();
      },
      generate: function() {
        var parsed = this.magnitude.match(/([\-0-9]+)(.*)/);
        this.keyframes = [
          {offset: 0, transform: 'translateY(0)'},
          {offset: 0.2, transform: 'translateY(0)'},
          {offset: 0.4, transform: 'translateY(' + this.magnitude + ')'},
          {offset: 0.5, transform: 'translateY(0)'},
          {offset: 0.6, transform:'translateY(' + Number(parsed[1]) / 2 + parsed[2] + ')'},
          {offset: 0.8, transform: 'translateY(0)'},
          {offset: 1, transform: 'translateY(0)'}
        ];
      }
    });
  