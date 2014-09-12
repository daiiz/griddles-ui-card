
      Polymer('grid-test', {
        arrangements: [[
          [1, 1, 1],
          [2, 3, 4],
          [2, 3, 5]
        ], [
          [4, 3, 2],
          [5, 3, 2],
          [5, 1, 1]
        ], [
          [1, 1],
          [2, 3],
          [4, 3]
        ]],
        outputLayout: 0,
        ready: function() {
          //this.nodes = [
          //  this.$.toolbar, this.$.sidebar, this.$.workspace, 
          //  this.$.outputToolbar, this.$.output
          //];
          this.outputLayoutChanged();
          //setInterval(this.toggleLayout.bind(this), 2500);
        },
        outputLayoutChanged: function() {
          this.layout = this.arrangements[this.outputLayout];
        },
        toggleLayout: function() {
          this.outputLayout = (this.outputLayout + 1) % this.arrangements.length;
        }
      });
    