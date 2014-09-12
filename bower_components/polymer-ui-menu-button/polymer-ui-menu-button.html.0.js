
    Polymer('polymer-ui-menu-button', {
      /**
       * The icon to display.
       * @attribute icon
       * @type string
       */
      icon: 'dots',
      src: '',
      /**
       * The index of the selected menu item.
       * @attribute selected
       * @type number
       */
      selected: '',
      /**
       * Set to true to open the menu.
       * @attribute opened
       * @type boolean
       */
      opened: false,
      /**
       * Horizontally align the overlay with the button. Accepted values are
       * ["left", "center", "right"].
       * @attribute halign
       * @type string
       */
      halign: 'center',
      /**
       * Display the overlay on top or below the button. Accepted values are
       * ["top", "bottom"].
       * @attribute valign
       * @type string
       */
      valign: 'bottom',
      multi: false,
      parallax: false,
      mediaQuery: 'max-width: 800px',
      ready: function() {
        this.boundParallaxAction = this.parallaxAction.bind(this);
      },
      openedChanged: function() {
        this.async(function() {
          this.$.arrowPositionHelper.apply();
          this.tilt = null;
          if (this.parallax) {
            window.addEventListener('deviceorientation',
                this.boundParallaxAction, false);
          } else {
            window.removeEventListener('deviceorientation',
                this.boundParallaxAction, false);
          }
        });
      },
      parallaxAction: function(e) {
        var tiltLR = Math.round(e.gamma);
        var tiltTB = Math.round(e.beta);
        if (!this.tilt) {
          this.tilt = {
            lr: tiltLR,
            tb: tiltTB
          };
        } else {
          var transX = ((tiltLR - this.tilt.lr) % 90) / 90 * 8;
          var transY = ((tiltTB - this.tilt.tb) % 90) / 90 * 13;
          this.$.overlayMenu.style['-webkit-transform'] = 'translate3d(' +
              transX + 'px,' + transY + 'px,0)';
          this.$.arrow.style['-webkit-transform'] = 'translate3d(' +
              transX + 'px,' + transY + 'px,0)';
        }
      },
      mediaChangeAction: function(e) {
        if (e.detail.matches) {
          this.classList.add('fullwidth');
        } else {
          this.classList.remove('fullwidth');
        }
      },
      closeAction: function() {
        this.opened = false;
      },
      /**
       * Toggle the opened state of the dropdown.
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      },
      /**
       * The selected menu item.
       * @property selection
       * @type Node
       */
      get selection() {
        return this.$.menu.selection;
      }
    });
  