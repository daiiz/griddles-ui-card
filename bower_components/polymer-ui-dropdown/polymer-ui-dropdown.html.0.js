
    Polymer('polymer-ui-dropdown', {
      ready: function() {
        this.super();
        this.transitions = [this.$.dropdownTransition, null];
        this.$.dropdownOverlay.target = this;
      },
      toggle: function() {
        this.$.dropdownOverlay.toggle();
      }
    });
  