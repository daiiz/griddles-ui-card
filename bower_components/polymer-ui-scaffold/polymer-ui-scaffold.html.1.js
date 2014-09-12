
    (function() {
      Polymer('polymer-ui-scaffold2', {
        menuActive: false,
        layouts: {
          main:[
            [3, 3, 1],
            [3, 3, 1],
            [2, 2, 1]
          ]
        },
        ready: function() {
          this.$.grid.layout = this.layouts.main;
        },
      });
    })();
  