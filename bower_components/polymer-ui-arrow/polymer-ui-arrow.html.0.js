
    Polymer('polymer-ui-arrow', {
      borders: {
        up: 'Bottom',
        down: 'Top',
        left: 'Right',
        right: 'Left'
      },
      tops: {
        up: 1,
        down: -1,
        left: 0,
        right: 0
      },
      lefts: {
        up: 0,
        down: 0,
        left: 1,
        right: -1
      },
      /**
       * Direction of the arrow.  Possible values are 'up', 'down', 'left' 
       * and 'right'.
       *
       * @attribute direction
       * @type string
       * @default 'up'
       */
      direction: 'up',
      /**
       * Size of the arrow.
       *
       * @attribute size
       * @type number
       * @default 10
       */
      size: 10,
      /**
       * Color of the arrow.
       *
       * @attribute color
       * @type string
       * @default '#fff'
       */
      color: '#fff',
      /**
       * Border color.
       *
       * @attribute borderColor
       * @type string
       * @default '#ccc'
       */
      borderColor: '#ccc',
      /**
       * Arrow border width.
       *
       * @attribute borderWidth
       * @type number
       * @default 1
       */
      borderWidth: 1,
      ready: function() {
        this.asyncUpdate();
      },
      directionChanged: function() {
        this.asyncUpdate();
      },
      sizeChanged: function() {
        this.asyncUpdate();
      },
      colorChanged: function() {
        this.asyncUpdate();
      },
      borderColorChanged: function() {
        this.asyncUpdate();
      },
      borderWidthChanged: function() {
        this.asyncUpdate();
      },
      asyncUpdate: function() {
        this.updateJob = this.job(this.updateJob, this.update, 1);
      },
      update: function() {
        var os = this.$.outer.style;
        var is = this.$.inner.style;
        os.borderWidth = this.size + 'px';
        is.borderWidth = this.size + 'px';
        os.borderColor = 'transparent';
        is.borderColor = 'transparent';
        var bc = 'border' + this.borders[this.direction] + 'Color';
        os[bc] = this.borderColor;
        is[bc] = this.color;
        is.top = this.tops[this.direction] * this.borderWidth + 'px';
        is.left = this.lefts[this.direction] * this.borderWidth + 'px';
      }
    });
  