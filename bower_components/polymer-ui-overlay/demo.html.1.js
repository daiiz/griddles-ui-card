
        Polymer('polymer-animation-expand', {
          duration: 0.3,
          easing: 'ease-in',
          fillMode: 'none',
          src: null,
          get animationEffect() {
            if (!this.src) {
              this.src = this.target.toggleSrc;
            }
            this.target.style['-webkit-transform-origin'] = 'top left';
            var srect = this.src.getBoundingClientRect();
            var trect = this.target.getBoundingClientRect();
            var transform = 'translate3d(' + (srect.left - trect.left) + 'px,' + (srect.top - trect.top) + 'px,0) scale3d(' + (srect.width / trect.width) + ',' + (srect.height / trect.height) + ',1)';
            console.log('srect', srect, 'trect', trect);
            console.log('transform', transform);
            var props = [{
              'visibility': 'visible',
              'position': 'fixed',
              'transform': transform
            }, {
              'visibility': 'visible',
              'position': 'fixed',
              'transform': 'translate3d(0,0,0) scale3d(1,1,1)'
            }];
            return props;
          }
        });
      