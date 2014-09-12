
    (function() {
      Polymer('polymer-ui-scaffold3', {
        menuActive: false,
        hideMenuButton: false,
        layouts: {
          main:[
            [3, 3],
            [4, 4],
            [4, 4]
          ],
          menu: [
            [1, 2],
            [1, 2],
            [1, 2]
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
  