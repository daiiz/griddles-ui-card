
      Polymer('polymer-ui-overlay-demo', {
        center: 'both',
        openingAnimationName: 'polymer-animation-expand',
        closingAnimationName: 'polymer-animation-slide-up',
        observe: {
          openingAnimationName: 'applyTransition',
          closingAnimationName: 'applyTransition'
        },
        ready: function() {
          this.applyTransition();
        },
        centerChanged: function() {
          if (this.center === 'none') {
            this.$.overlayDemo.classList.add('hpositioned');
            this.$.overlayDemo.classList.add('vpositioned');
          } else if (this.center === 'horiz') {
            this.$.overlayDemo.classList.remove('hpositioned');
            this.$.overlayDemo.classList.add('vpositioned');
          } else if (this.center === 'vert') {
            this.$.overlayDemo.classList.add('hpositioned');
            this.$.overlayDemo.classList.remove('vpositioned');
          } else {
            this.$.overlayDemo.classList.remove('hpositioned');
            this.$.overlayDemo.classList.remove('vpositioned');
          }
        },
        applyTransition: function() {
          this.transitions = [
            this.openingAnimationName === 'none' ? null : this.openingAnimationName,
            this.closingAnimationName === 'none' ? null : this.closingAnimationName
          ];
        },
        somethingChanged: function() {
          if (this.something === 'something') {
            this.$.innerOverlay.toggle();
          }
        },
        toggleAction: function(e, details, sender) {
          this.$.overlayDemo.toggleSrc = sender;
          this.$.overlayDemo.toggle();
        }
      });
    