
    Polymer('polymer-ui-accordion', {
      activateHandler: function(e) {
        if (!e.notap) {
          this.super(arguments);
        }
      }
    })
  