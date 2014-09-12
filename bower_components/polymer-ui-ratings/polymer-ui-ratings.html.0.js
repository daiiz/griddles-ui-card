
    Polymer('polymer-ui-ratings', {
      /**
       * Number of stars to display.
       *
       * @attribute count
       * @type number
       * @default 5
       */
      count: 5,
      /**
       * Number of selected stars.
       *
       * @attribute value
       * @type number
       * @default 0
       */
      value: 0,
      ready: function() {
        this.countChanged();
      },
      countChanged: function() {
        this.stars = [];
        for (var i = 0; i < this.count; i++) {
          this.stars.push(i);
        }
      },
      updateValue: function(event, detail, sender) {
        var s = sender.templateInstance.model.star;
        this.value = s + Number(s >= this.value);
      }
    });
  