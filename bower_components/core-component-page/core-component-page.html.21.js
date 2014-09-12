

    Polymer('core-component-page', {

      moduleName: '',
      // TODO(sjmiles): needed this to force Object type for deserialization
      sources: [],

      ready: function() {
        this.moduleName = this.moduleName || this.findModuleName();
      },

      moduleNameChanged: function() {
        document.title = this.moduleName;
        this.url = !this.sources.length && this.moduleName ? this.moduleName + '.html' : '';
      },

      findModuleName: function() {
        var path = location.pathname.split('/');
        var name = path.pop() || path.pop();
        if (name.indexOf('.html') >= 0) {
          name = path.pop();
        }
        return name || '';
      }

    });

  