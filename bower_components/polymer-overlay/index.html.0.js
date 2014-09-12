
    var remoteDocs = 'http://turbogadgetry.com/bowertopia/components/';
    // if no local info viewer, load it remotely
    function noviewer() {
      document.body.setAttribute('noviewer', '');
      var path = location.pathname.split('/');
      var module = path.pop() || path.pop();
      document.querySelector('iframe').src = remoteDocs + module;
      document.querySelector('title').textContent = module;
    }
    // for testing only
    var opts = window.location.search;
    if (opts.indexOf('noviewer') >= 0) {
      noviewer();
    }
  