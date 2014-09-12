
    Polymer('polymer-ui-menu-item', {
      label: '',
      // calc item's offset middle pos instead of using offsetTop/Height 
      // directly which requires to wait for submenu's collapsing transition to 
      // complete first before it can return the correct pos.
      getOffsetMiddle: function() {
        var p = this.parentNode;
        if (p) {
          var i = Array.prototype.indexOf.call(p.items, this);
          var h = this.getItemHeight();
          return i * h + h/2 + p.items[0].offsetTop;
        }
      },
      getItemHeight: function() {
        return this.offsetHeight;
      }
    });
  