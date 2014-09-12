
    Polymer('polymer-ui-iconset', {
      width: 0,
      icons: '',
      iconsize: 0,
      offsetx: 0,
      offsety: 0,
      type: 'iconset',
      ready: function() {
        // TODO(sorvell): ensure iconset's src is always relative to the main
        // document
        if (this.src && (this.ownerDocument !== document)) {
          this.src = this.resolvePath(this.src, this.ownerDocument.baseURI);
        }
        this.super();
        this.iconsChanged();
        this.updateThemes();
      },
      iconsChanged: function() {
        this.iconMap = {};
        var ox = this.offsetx;
        var oy = this.offsety;
        this.icons && this.icons.split(/\s+/g).forEach(function(name, i) {
          this.iconMap[name] = {
            offsetx: ox,
            offsety: oy
          }
          if (ox + this.iconsize < this.width) {
            ox += this.iconsize;
          } else {
            ox = this.offsetx;
            oy += this.iconsize;
          }
        }, this);
      },
      updateThemes: function() {
        this.themes = {};
        var ts = this.querySelectorAll('property[theme]');
        ts && ts.array().forEach(function(t) {
          this.themes[t.getAttribute('theme')] = {
            offsetx: parseInt(t.getAttribute('offsetx')) || 0,
            offsety: parseInt(t.getAttribute('offsety')) || 0
          };
        }, this);
      },
      // TODO(ffu): support retrived by index e.g. getOffset(10);
      getOffset: function(icon, theme) {
        var i = this.iconMap[icon];
        var t = this.themes[theme];
        if (i && t) {
          return {
            offsetx: i.offsetx + t.offsetx,
            offsety: i.offsety + t.offsety
          }
        }
        return i;
      }
    });
  