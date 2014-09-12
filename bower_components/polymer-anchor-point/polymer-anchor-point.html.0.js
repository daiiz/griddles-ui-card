
    (function() {
      var DEFAULT_ANCHOR_POINT = 'center center';

      function getAnchorPoint(node) {
        var anchorPt = node.getAttribute('anchor-point');
        if (!anchorPt || anchorPt === 'none') {
          anchorPt = DEFAULT_ANCHOR_POINT;
        }
        return anchorPt;
      };

      function lengthIsPx(length) {
        return length.slice(-2) === 'px';
      };

      function lengthIsPercent(length) {
        return length.slice(-1) === '%';
      };

      function computeLength(length, ref) {
        var computed = 0;
        if (lengthIsPx(length)) {
          computed  = length.slice(0, -2);
        } else if (lengthIsPercent(length)) {
          computed = ref * length.slice(0, -1) / 100;
        }
        return computed;
      };

      function partIsX(part) {
        return part === 'left' || part === 'right' || part === 'center';
      };

      function partIsY(part) {
        return part === 'top' || part === 'bottom' || part === 'center';
      };

      function partIsKeyword(part) {
        return part.slice(-1) !== '%' && part.slice(-2) !== 'px';
      };

      function parsePosition(position) {
        var parsed = {};
        var parts = position.split(' ');
        var i = 0;
        var lastEdgeX = true;
        do {
          if (partIsX(parts[i])) {
            parsed.x = parts[i];
            lastEdgeX = parts[i] !== 'center';
          } else if (partIsY(parts[i])) {
            parsed.y = parts[i];
            lastEdgeX = false;
          } else if (lastEdgeX) {
            parsed.xOffset = parts[i];
            lastEdgeX = false;
          } else {
            parsed.yOffset = parts[i];
          }
        } while (++i < parts.length);
        return parsed;
      };

      function computeAnchorOffset(rect, anchorPt) {
        var offset = {
          left: 0,
          top: 0
        };
        var parsed = parsePosition(anchorPt);
        if (!parsed.x && !parsed.xOffset) {
          offset.left = rect.width / 2;
        } else if (parsed.x && !parsed.xOffset) {
          switch (parsed.x) {
            case 'left':
              offset.left = 0;
              break;
            case 'right':
              offset.left = rect.width;
              break;
            case 'center':
              offset.left = rect.width / 2;
              break;
          }
        } else {
          var computed = computeLength(parsed.xOffset, rect.width);
          if (parsed.x === 'right') {
            offset.left = rect.width - computed;
          } else if (!parsed.x || parsed.x === 'left') {
            offset.left = computed;
          }
        }
        if (!parsed.y && !parsed.yOffset) {
          offset.top = rect.height / 2;
        } else if (parsed.y && !parsed.yOffset) {
          switch (parsed.y) {
            case 'top':
              offset.top = 0;
              break;
            case 'bottom':
              offset.top = rect.height;
              break;
            case 'center':
              offset.top = rect.height / 2;
              break;
          }
        } else {
          var computed = computeLength(parsed.yOffset, rect.height);
          if (parsed.y === 'bottom') {
            offset.top = rect.height - computed;
          } else if (!parsed.y || parsed.y === 'top') {
            offset.top = computed;
          }
        }
        return offset;
      };

      Polymer('polymer-anchor-point', {
        /**
         * The node to be positioned.
         * @attribute target
         * @type Node
         */
        target: null,
        /**
         * The node to align the target to.
         * @attribute anchor
         * @type node
         */
        anchor: null,
        canPosition: function() {
          return this.target && this.anchor;
        },
        apply: function() {
          if (!this.canPosition()) {
            return;
          }
          var pos = this.computePosition();
          this.target.style.position = 'fixed';
          this.target.style.top = pos.top + 'px';
          this.target.style.left = pos.left + 'px';
        },
        computePosition: function() {
          var rect = this.anchor.getBoundingClientRect();
          var anchorPt = getAnchorPoint(this.anchor);
          var anchorOffset = computeAnchorOffset(rect, anchorPt);
          var targetRect = this.target.getBoundingClientRect();
          var targetAnchorPt = getAnchorPoint(this.target);
          var targetOffset = computeAnchorOffset(targetRect, targetAnchorPt);
          var pos = {
            left: rect.left + anchorOffset.left - targetOffset.left,
            top: rect.top + anchorOffset.top - targetOffset.top
          };
          return pos;
        }
      });
    })();
  