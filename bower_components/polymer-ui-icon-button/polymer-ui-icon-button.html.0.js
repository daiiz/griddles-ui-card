
    Polymer('polymer-ui-icon-button', {
      /**
       * The URL of an image for the icon.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',
      /**
       * If true, border is placed around the button to indicate
       * active state.
       *
       * @attribute active
       * @type boolean
       * @default false
       */
      active: false,
      /**
       * Specifies the icon from the Polymer icon set.
       *
       * @attribute icon
       * @type string
       * @default ''
       */
      icon: '',
      /**
       * If a theme is applied that includes an icon set, the index of the 
       * icon to display.
       *
       * @attribute index
       * @type number
       * @default -1
       */     
      index: -1,
      activeChanged: function() {
        // TODO(sjmiles): sugar this common case
        this.classList.toggle('selected', this.active);
      }
    });
  