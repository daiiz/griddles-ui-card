
    Polymer('selection-example', {
      itemTapAction: function(e) {
        this.$.selection.select(e.target);
      },
      selectAction: function(e, detail) {
        detail.item.classList.toggle('selected', detail.isSelected);
      }
    });
    