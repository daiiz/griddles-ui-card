
    document.addEventListener('polymer-ready', function() {
      var meta = document.createElement('polymer-meta');
      document.querySelector('template[repeat]').model = {
        metadata: meta.list
      };
      
      var archetype = meta.byId('x-zot').archetype;
      document.body.appendChild(archetype.createInstance().querySelector('*'));
    });
  