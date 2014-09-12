
    Polymer('polymer-ui-toolbar', {
      responsiveWidth: '800px',
      queryMatches: false,
      defaultTheme: 'polymer-ui-light-theme',
      queryMatchesChanged: function() {
        this.classList.toggle('narrow-layout', this.queryMatches);
      }
    });
  