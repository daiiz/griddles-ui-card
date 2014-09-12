
    Polymer('polymer-ui-menu', {
      activeTheme: '',
      validateTheme: PolymerUI.validateTheme,
      enteredView: function() {
        this.validateTheme();
      },
      themeChanged: function() {
        this.activeTheme = this.theme;
      },
      activeThemeChanged: function(old) {
        this.classList.switch(old, this.activeTheme);
      },
      selectionChange: function(e, detail) {
        if (detail.isSelected) {
          var i = detail.item;
          // find nested selected item
          while (i.selectedItem) {
            i = i.selectedItem;
          }
          this.selectedItem = i;
        }
      }
    });
  