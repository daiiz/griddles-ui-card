
    Polymer('polymer-ui-icon', {
      /**
       * The URL of an image for the icon.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',
      /**
       * Specifies the size of the icon.
       *
       * @attribute size
       * @type string
       * @default 24
       */
      size: 24,
      /**
       * Specifies the icon from the icon set.
       *
       * @attribute icon
       * @type string
       * @default ''
       */
      icon: '',
      defaultIconset: 'polymer-ui-icons',
      observe: {
        icon: 'updateIcon',
        activeTheme: 'updateIcon'
      },
      ready: function() {
        this.sizeChanged();
      },
      sizeChanged: function() {
        this.style.width = this.style.height = this.size + 'px';
      },
      srcChanged: function() {
        this.style.backgroundImage = 'url(' + this.src + ')';
        this.style.backgroundPosition = 'center';
        this.style.backgroundSize = this.size + 'px ' + this.size + 'px';
      },
      getIconset: function(name) {
        return this.$.meta.byId(name || this.defaultIconset);
      },
      updateIcon: function() {
        if (!this.icon) {
          return;
        }
        var a = this.icon.split(':');
        var icon = a.pop();
        var n = a.pop();
        var s = this.getIconset(n);
        if (s) {
          var o = s.getOffset(icon, this.activeTheme);
          if (o) {
            var r = this.size / s.iconsize;
            this.style.backgroundImage = 'url(' + s.src + ')';
            this.style.backgroundPosition = 
                (-o.offsetx * r + 'px') + ' ' + (-o.offsety * r + 'px');
            this.style.backgroundSize = r === 1 ? 'auto' : s.width * r + 'px';
          }
        }
      }
    });
  