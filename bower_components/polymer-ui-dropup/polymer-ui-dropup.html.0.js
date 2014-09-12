
    Polymer('polymer-ui-dropup', {
      ready: function() {
        this.super();
        this.transitions = [this.$.dropupTransition, null];
        this.$.dropupOverlay.target = this;
      },
      toggle: function() {
        this.$.dropupOverlay.toggle();
      }
    });
  