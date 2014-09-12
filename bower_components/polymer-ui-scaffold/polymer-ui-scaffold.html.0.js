
    (function() {
      Polymer('polymer-ui-scaffold', {
        menuActive: false,
        hideMenuButton: false,
        layouts: {
          main:[
            [2, 2],
            [3, 3],
            [3, 3]
          ],
          menu: [
            [1, 2, 2],
            [1, 3, 3],
            [1, 3, 3]
          ]
        },
        ready: function() {
          this.$.grid.layout = this.layouts.main;
        },
        menuActionTap: function() {
          this.menuActive = !this.menuActive;
          Platform.flush();
        },
        menuActiveChanged: function() {
          this.$.grid.layout = this.layouts[this.menuActive ? 'menu' : 'main'];
        }
      });
    })();
  