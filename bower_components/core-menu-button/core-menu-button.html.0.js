
    Polymer('core-menu-button', {
      /**
       * The icon to display.
       * @attribute icon
       * @type string
       */
      icon: 'dots',
      src: '',
      /**
       * The index of the selected menu item.
       * @attribute selected
       * @type number
       */
      selected: '',
      /**
       * Set to true to open the menu.
       * @attribute opened
       * @type boolean
       */
      opened: false,
      /**
       * Set to true to cause the menu popup to be displayed inline rather 
       * than in its own layer.
       * @attribute inlineMenu
       * @type boolean
       */
      inlineMenu: false,
      /**
       * Horizontally align the overlay with the button. Accepted values are
       * ["left", "center", "right"].
       * @attribute halign
       * @type string
       */
      halign: 'center',
      /**
       * Display the overlay on top or below the button. Accepted values are
       * ["top", "bottom"].
       * @attribute valign
       * @type string
       */
      valign: 'bottom',
      multi: false,
      closeAction: function() {
        this.opened = false;
      },
      /**
       * Toggle the opened state of the dropdown.
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      },
      /**
       * The selected menu item.
       * @property selection
       * @type Node
       */
      get selection() {
        return this.$.menu.selection;
      }
    });
  