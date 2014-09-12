
    Polymer('polymer-ui-toggle-button', {
      /**
       * Gets or sets the state, true is ON and false is OFF.
       *
       * @attribute value
       * @type boolean
       * @default false
       */
      value: false,
      /**
       * If true, don't display caption.
       *
       * @attribute noCaption
       * @type boolean
       * @default false
       */
      noCaption: false,
      /**
       * Caption for on state.
       *
       * @attribute onCaption
       * @type string
       * @default 'ON'
       */
      onCaption: 'ON',
      /**
       * Caption for off state.
       *
       * @attribute offCaption
       * @type string
       * @default 'OFF'
       */
      offCaption: 'OFF',
      toggle: function() {
        this.value = !this.value;
      },
      valueChanged: function() {
        this.classList.toggle('on', this.value);
        this.$.toggle.classList.toggle('on', this.value);
      },
      trackStart: function(e) {
        e.preventTap();
        this.w = this.$.toggle.offsetWidth - this.clientWidth;
        this.$.toggle.classList.add('dragging');
      },
      track: function(e) {
        this.x = Math.max(-this.w, Math.min(0, this.value ? e.dx : e.dx - this.w));
        this.$.toggle.style.left = this.x + 'px';
      },
      trackEnd: function() {
        this.$.toggle.style.left = null;
        this.$.toggle.classList.remove('dragging');
        this.value = Math.abs(this.x) < this.w / 2;
        Platform.flush();
      },
      flick: function(e) {
        this.value = e.xVelocity > 0;
        Platform.flush();
      }
    });
  