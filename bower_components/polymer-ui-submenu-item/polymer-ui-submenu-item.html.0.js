
    Polymer('polymer-ui-submenu-item', {
      publish: {
        active: {value: false, reflect: true}
      },
      collapsed: true,
      get items() {
        return this.$.menu.items;
      },
      hasItems: function() {
        return !!this.items.length;
      },
      unselectAllItems: function() {
        this.$.menu.selected = null;
        this.$.menu.clearSelection();
      },
      activeChanged: function() {
        if (this.hasItems()) {
          this.collapsed = !this.active;
        }
        if (!this.active) {
          this.unselectAllItems();
        }
        this.$.item.classList.toggle('no-active-bg', this.hasItems());
      },
      activate: function() {
        if (this.hasItems() && this.active) {
          this.collapsed = !this.collapsed;
          this.unselectAllItems();
          this.fire("polymer-select", {isSelected: true, item: this});
        }
      },
      getItemHeight: function() {
        return this.$ && this.$.item && this.$.item.offsetHeight;
      }
    });
  