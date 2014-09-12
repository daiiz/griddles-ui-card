
    Polymer('polymer-flip', {
      axis: 'x',
      duration: 0.5,
			ready: function() {
				this.generate();
			},
      axisChanged: function() {
        this.generate();
      },
      generate: function() {
        var isY = this.axis === 'y' || this.axis === 'Y';
        var rotate = isY ? 'rotateY' : 'rotateX';
        var transZ = isY ? '150px' : '50px';
        this.keyframes = [{
          offset: 0,
          transform: 'perspective(400px) translateZ(0px) ' + rotate + '(0deg) scale(1)'
        }, {
          offset: 0.4,
          transform: 'perspective(400px) translateZ(' + transZ + ') ' + rotate + '(170deg) scale(1)'
        }, {
          offset: 0.5,
          transform: 'perspective(400px) translateZ(' + transZ + ') ' + rotate + '(190deg) scale(1)'
        }, {
          offset: 0.8,
          transform: 'perspective(400px) translateZ(0px) ' + rotate + '(360deg) scale(.95)'
        }, {
          offset: 1,
          transform: 'perspective(400px) translateZ(0px) ' + rotate + '(360deg) scale(1)'
        }];
      }
    });
  