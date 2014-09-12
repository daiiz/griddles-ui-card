
    (function() {
      var ANIMATION_GROUPS = {
        'par': AnimationGroup,
        'seq': AnimationSequence
      };
      /**
       * @module Animation
       */
      /**
       * Component for a group of animations.
       *
       * @class polymer-animation-group
       */
      Polymer('polymer-animation-group', {
        publish: {
          /**
           * @property duration
           * @type number
           * @default "auto"
           */
          duration: {value: 'auto', reflect: true},
          /**
           * Group type. 'par' for parallel and 'seq' for sequence.
           * @property type
           * @type String
           * @default 'par'
           */
          type: {value: 'par', reflect: true}
        },
        typeChanged: function() {
          this.apply();
        },
        targetChanged: function() {
          // Only propagate target to children animations if it's defined.
          if (this.target) {
            this.doOnChildren(function(c) {
              c.target = this.target;
            }.bind(this));
          }
        },
        durationChanged: function() {
          if (this.duration && this.duration !== 'auto') {
            this.doOnChildren(function(c) {
              // Propagate to children that is not a group and has no
              // duration specified.
              if (!c.type && (!c.duration || c.duration === 'auto')) {
                c.duration = this.duration;
              }
            }.bind(this));
          }
        },
        doOnChildren: function(inFn) {
          var children = this.children;
          if (!children.length) {
            children = this.webkitShadowRoot ? this.webkitShadowRoot.childNodes : [];
          }
          Array.prototype.forEach.call(children, function(c) {
            // TODO <template> in the way
            c.apply && inFn(c);
          }, this);
        },
        makeAnimation: function() {
          return new ANIMATION_GROUPS[this.type](this.childAnimations, this.timingProps);
        },
        hasTarget: function() {
          var ht = this.target !== null;
          if (!ht) {
            this.doOnChildren(function(c) {
              ht = ht || c.hasTarget();
            }.bind(this));
          }
          return ht;
        },
        apply: function() {
          // Propagate target and duration to child animations first.
          this.durationChanged();
          this.targetChanged();
          this.doOnChildren(function(c) {
            c.apply();
          });
          return this.super();
        },
        get childAnimationElements() {
          var list = [];
          this.doOnChildren(function(c) {
            if (c.makeAnimation) {
              list.push(c);
            }
          });
          return list;
        },
        get childAnimations() {
          var list = [];
          this.doOnChildren(function(c) {
            if (c.animation) {
              list.push(c.animation);
            }
          });
          return list;
        }
      });
    })();
  