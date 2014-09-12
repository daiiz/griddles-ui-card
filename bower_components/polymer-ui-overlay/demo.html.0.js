
        Polymer('polymer-animation-slide', {
          easing: 'ease-in',
          fillMode: 'none',
          origin: 'left',
          slideType: 'slide-in',
          get animationEffect() {
            var rect = this.target.getBoundingClientRect();
            var tranform;
            if (this.origin === 'top') {
              transform = 'translate3d(0,-' + (rect.top + rect.height) + 'px,0)';
            } else if (this.origin === 'left') {
              transform = 'translate3d(-' + (rect.left + rect.width) + 'px,0,0)';
            } else if (this.origin === 'bottom') {
              transform = 'translate3d(0,' + (window.innerHeight + rect.height) + 'px,0)';
            } else if (this.origin === 'right') {
              transform = 'translate3d(' + (window.innerWidth + rect.width) + 'px,0,0)';
            }
            var props;
            if (this.slideType === 'slide-in') {
              props = [{
                'visibility': 'visible',
                'position': 'fixed',
                'transform': transform
              }, {
                'visibility': 'visible',
                'position': 'fixed',
                'transform': 'translate3d(0,0,0)'
              }];
            } else {
              props = [{
                'visibility': 'visible',
                'position': 'fixed',
                'transform': 'translate3d(0,0,0)'
              }, {
                'visibility': 'visible',
                'position': 'fixed',
                'transform': transform
              }];
            }
            return props;
          }
        });
      