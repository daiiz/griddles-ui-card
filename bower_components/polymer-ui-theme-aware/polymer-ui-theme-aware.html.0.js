
    PolymerUI = {
      validateTheme: function() {
        var theme = this.theme;
        var defaultTheme = this.defaultTheme;
        if (!theme) {
          var p = this;
          while (p && !theme) {
            theme = p.getAttribute && p.getAttribute('theme');
            defaultTheme = defaultTheme || p.defaultTheme;
            p = p.parentNode || p.host;
          }
        }
        this.activeTheme = this.theme || theme || defaultTheme;
      }
    };
    Polymer('polymer-ui-theme-aware', {
      defaultTheme: '',
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
      }
    });
  