

  Polymer({

    publish: {

      /**
       * The element associated with this menu, usually the element that
       * causes the menu the open.
       *
       * @attribute relatedTarget
       * @type Node
       */
      relatedTarget: null,

      /**
       * If true, the menu is currently visible.
       *
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,

      /**
       * The horizontal alignment of the pulldown menu relative to the button.
       *
       * @attribute halign
       * @type 'left' | 'right' | 'auto'
       * @default 'auto'
       */
      halign: { value: 'auto', reflect: true },

      /**
       * The vertical alignment of the pulldown menu relative to the button.
       *
       * @attribute valign
       * @type 'bottom' | 'top' | 'auto'
       * @default 'auto'
       */
      valign: { value: 'auto', reflect: true },

      /**
       * The transition property specifies a string which identifies a 
       * <a href="../core-transition/">`core-transition`</a> element that 
       * will be used to help the overlay open and close. The default
       * `core-transition-fade` will cause the overlay to fade in and out.
       *
       * @attribute transition
       * @type string
       * @default 'core-transition-fade'
       */
      transition: null,

      /**
       * Gets or sets the selected element.  Default to use the index
       * of the item element.
       *
       * @attribute selected
       * @type Object
       * @default null
       */
      selected: null,

      /**
       * Specifies the attribute to be used for "selected" attribute.
       *
       * @attribute valueattr
       * @type string
       * @default 'name'
       */
      valueattr: 'name',

      /**
       * Specifies the CSS class to be used to add to the selected element.
       * 
       * @attribute selectedClass
       * @type string
       * @default 'core-selected'
       */
      selectedClass: 'core-selected',

      /**
       * Specifies the property to be used to set on the selected element
       * to indicate its active state.
       *
       * @attribute selectedProperty
       * @type string
       * @default ''
       */
      selectedProperty: '',

      /**
       * Specifies the attribute to set on the selected element to indicate
       * its active state.
       *
       * @attribute selectedAttribute
       * @type string
       * @default 'active'
       */
      selectedAttribute: 'active',

      /**
       * Returns the currently selected element.
       * 
       * @attribute selectedItem
       * @type Object
       * @default null
       */
      selectedItem: null,

      /**
       * In single selection, this returns the model associated with the
       * selected element.
       * 
       * @attribute selectedModel
       * @type Object
       * @default null
       */
      selectedModel: null,

      /**
       * In single selection, this returns the selected index.
       *
       * @attribute selectedIndex
       * @type number
       * @default -1
       */
      selectedIndex: -1

    },

    selectAction: function() {
      this.opened = false;
    }

  });

