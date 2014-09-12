
    /**
     * A CSS property and value to use in a `<polymer-animation-keyframe>`.
     *
     * @class polymer-animation-prop
     */
		/**
		 * CSS property name.
		 * @property name
		 * @type String
		 * @required
		 */
     /**
      * CSS property value.
      * @property value
      * @required
      */
      Polymer('polymer-animation-prop', {
        publish: {
          name: {value: '', reflect: true},
          value: {value: '', reflect: true}
        }
      });
  