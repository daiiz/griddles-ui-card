
    Polymer('polymer-shake', {
			type: 'seq',
			targetSelector: '',
			duration: 0.3,
			magnitude: '10px',
			period: 0.1,
			easing: 'ease-in',
      ready: function() {
        this.super();
        this.magnitudeChanged();
        this.periodChanged();
      },
      durationChanged: function() {
        this.super();
        this.generate();
      },
      magnitudeChanged: function() {
        this.generate();
      },
      periodChanged: function() {
        this.generate();
      },
      generate: function() {
        this.negTransform = 'translateX(-' + this.magnitude + ')';
        this.posTransform = 'translateX(' + this.magnitude + ')';
        this.shakeDuration = this.period * 2;
        this.shakeIterations = this.duration === 'Infinity' ? this.duration : Math.ceil(this.duration / this.shakeDuration);
      },
      get timingProps() {
        return {};
      }
    });
  