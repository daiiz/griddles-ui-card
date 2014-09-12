
    Polymer('polymer-ui-overlay', {
      active: false,
      modal: false,
      backdrop: false,
      ready: function() {
        this.$.overlay.target = this;
      },
      toggle: function() {
        this.active = !this.active;
      }
    });
  