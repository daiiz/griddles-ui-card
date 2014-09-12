
    Polymer('polymer-ui-collapsible', {
      publish: {
        /**
         * If true, tapping on the header will not toggle the active state.
         *
         * @attribute notap
         * @type boolean
         * @default false
         */
        notap: false,
        /**
         * If true, the body is expanded.
         *
         * @attribute active
         * @type boolean
         * @default false
         */
        active: {value: false, reflect: true}
      },
      /** 
       * Toggle the active state of the collapsible.
       *
       * @method toggle
       */
      toggle: function() {
        this.active = !this.active;
      },
      headerTap: function() {
        if (!this.notap) {
          this.toggle();
        }
      },
      bodyTap: function(e) {
        e.notap = true;
      }
    });
  