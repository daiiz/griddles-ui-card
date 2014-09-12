
		/**
     * Defines a keyframe in an animation. Its children should be
     * `<polymer-animation-prop>` elements specifying the css
     * property value at the keyframe.
     *
		 * @class polymer-animation-keyframe
		 */
		/**
		 * From 0 to 1.
		 * @property offset
		 * @type Number
		 */
		Polymer('polymer-animation-keyframe', {
      publish: {
        offset: {value: '', reflect: true},
        value: {value: '', reflect: true},
        easing: {value: '', reflect: true}
      },
			get properties() {
        var props = {};
        var children = this.querySelectorAll('polymer-animation-prop');
        Array.prototype.forEach.call(children, function(c) {
          props[c.name] = c.value;
        });
				if (this.offset !== null) {
					props.offset = this.offset;
				}
				return props;
			}
		});
	