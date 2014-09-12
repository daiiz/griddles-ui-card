
    Polymer({

      publish: {

        /**
         * The `relatedTarget` is an element used to position the overlay, for example a
         * button the user taps to show a menu.
         *
         * @attribute relatedTarget
         * @type Element
         */
        relatedTarget: null,

        /**
         * The horizontal alignment of the overlay relative to the `relatedTarget`.
         *
         * @attribute halign
         * @type 'left'|'right'|'auto'
         * @default 'auto'
         */
        halign: 'auto',

        /**
         * The vertical alignment of the overlay relative to the `relatedTarget`.
         *
         * @attribute valign
         * @type 'top'|'bottom'|'auto'
         * @default 'bottom'
         */
        valign: 'auto'

      },

      positionTarget: function() {
        if (!this.relatedTarget) {
          this.super();
          return;
        }

        var top, left, bottom, right;
        var ref = this.relatedTarget.getBoundingClientRect();

        if (this.halign === 'left') {
          left = ref.left;
        } else if (this.halign === 'right') {
          right = window.innerWidth - ref.right;
        } else if (this.halign === 'auto') {
          if (ref.left + this.target.offsetWidth > window.innerWidth) {
            right = window.innerWidth - ref.right;
          } else {
            left = ref.left;
          }
        }

        if (this.valign === 'top') {
          bottom = window.innerHeight - ref.bottom;
        } else if (this.valign === 'bottom') {
          top = ref.top;
        } else if (this.valign === 'auto') {
          if (ref.top + this.target.offsetHeight > window.innerHeight && this.target.offsetHeight < window.innerHeight) {
            bottom = window.innerHeight - ref.bottom;
          } else {
            top = ref.top;
          }
        }

        (top !== undefined) && (this.target.style.top = top + 'px');
        (left !== undefined) && (this.target.style.left = left + 'px');
        (bottom !== undefined) && (this.target.style.bottom = bottom + 'px');
        (right !== undefined) && (this.target.style.right = right + 'px');
      },

      sizeTarget: function() {
        var rect = this.relatedTarget.getBoundingClientRect();
        var sizer = this.sizingTarget || this.target;

        sizer.style.minWidth = rect.width + 'px';

        this.super();
      }

    });
  