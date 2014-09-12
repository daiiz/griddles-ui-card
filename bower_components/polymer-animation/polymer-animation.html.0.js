
    (function() {
      function findTarget(inSelector, inNode) {
        var p = inNode;
        var target;
        while (p && !p.host && p !== document) {
          p = p.parentNode;
        }
        if (p) {
          target = p.querySelector(inSelector);
        }
        if (!target && p && p.host) {
          target = findTarget(inSelector, p.host);
        }
        return target;
      };
      function toNumber(value, allowInfinity) {
        return (allowInfinity && value === 'Infinity') ? Number.POSITIVE_INFINITY : Number(value);
      };
      /**
       * WebAnimations module.
       * @module Animation
       * @main animation
       * @example toolkitchen/labs/animation2/grid-fade.html
       * @example toolkitchen/labs/animation2/group.html
       */
      /**
       * Component for a single animation.
       *
       * A animation component to fade out an element:
       *
       *     <polymer-animation id="fadeout">
       *       <polymer-animation-keyframe offset="0">
       *         <polymer-animation-prop name="opacity" value="0">
       *         </polymer-animation-prop>
       *       </polymer-animation-keyframe>
       *       <polymer-animation-keyframe offset="1">
       *         <polymer-animation-prop name="opacity" value="1">
       *         </polymer-animation-prop>
       *       </polymer-animation-keyframe>
       *     </polymer-animation>
       * @class polymer-animation
       */
       /**
        * Fired when the animation starts
        * @event polymer-animation-start
        *
        * Fired when the animation completes
        * @event polymer-animation-end
        *
        * Fired when the web animation object changes.
        * @event polymer-animation-change
        * 
        */
      Polymer('polymer-animation', {
        publish: {
          /**
           * One or more nodes to animate.
           * @property target
           * @type HTMLElement|Node|Array<HTMLElement|Node>
           */
          target: {value: null, reflect: true},
          /**
           * Selector for the node being animated.
           * @property targetSelector
           * @type String
           */
          targetSelector: {value: '', reflect: true},
          // animation
          /**
           * Animation keyframes specified as an array of dictionaries of
           * &lt;css properties&gt;:&lt;array of values&gt; pairs. For example,
           * @property keyframes
           * @type Object
           */
          keyframes: {value: null, reflect: true},
          /**
           * A custom animation function. Either provide this or keyframes.
           * @property sample
           * @type Function
           */
          sample: {value: null, reflect: true},
          //accumulate: null, // not working in polyfill
          /**
           * The composition behavior. "replace", "add" or "merge".
           * @property composite
           * @type "replace"|"add"|"merge"
           * @default "replace"
           */
          composite: {value: 'replace', reflect: true},
          // timing
          /**
           * Animation duration in milliseconds, 'infinity' or 'auto'. 'auto'
           * means use the animation's intrinsic duration.
           * @property duration
           * @type Number|"Infinity"|"auto"
           * @default "auto"
           */
          duration: {value: 'auto', reflect: true},
          /**
           * "none", "forwards", "backwards", "both" or "auto". When set to
           * "auto", the fill is "none" for a polymer-animation and "both"
           * for a polymer-animation-group.
           * @property fill
           * @type "none"|"forwards"|"backwards"|"both"|"auto"
           * @default "auto"
           */
          fill: {value: 'auto', reflect: true},
          /**
           * A transition timing function.
           * @property easing
           * @type "linear"|"ease"|"ease-in"|"ease-out"|"ease-in-out"|
           *     "step-start"|"step-middle"|"step-end"
           * @default "linear"
           */
          easing: {value: 'linear', reflect: true},
          /**
           * Number of iterations into the timed item in which to begin
           * the animation. e.g. 0.5 will cause the animation to begin
           * halfway through the first iteration.
           * @property iterationStart
           * @type Number
           * @default 0
           */
          iterationStart: {value: 0, reflect: true},
          /**
           * @property iterationCount
           * @type Number|'Infinity'
           * @default 1
           */
          iterationCount: {value: 1, reflect: true},
          /**
           * Delay in milliseconds.
           * @property delay
           * @type Number
           * @default 0
           */
          delay: {value: 0, reflect: true},
          /**
           * @property direction
           * @type "normal"|"reverse"|"alternate"|"alternate-reverse"
           * @default "normal"
           */
          direction: {value: 'normal', reflect: true},
          /**
           * @property autoplay
           * @type Boolean
           * @default false
           */
          autoplay: {value: false, reflect: true}
        },
        animation: false,
        observe: {
          target: 'apply',
          keyframes: 'apply',
          sample: 'apply',
          composite: 'apply',
          duration: 'apply',
          fill: 'apply',
          easing: 'apply',
          iterationCount: 'apply',
          delay: 'apply',
          direction: 'apply',
          autoplay: 'apply'
        },
        ready: function() {
          this.apply();
        },
        /**
         * Plays the animation.
         * @method play
         */
        play: function() {
          this.apply();
          if (this.animation && !this.autoplay) {
            this.bindAnimationEvents();
            this.player = document.timeline.play(this.animation);
            return this.player;
          }
        },
        /**
         * Stops the animation.
         * @method cancel
         */
        cancel: function() {
          if (this.player) {
            this.player.source = null;
          }
        },
        hasTarget: function() {
          return this.target !== null;
        },
        apply: function() {
          this.animation = null;
          this.animation = this.makeAnimation();
          if (this.autoplay && this.animation) {
            this.play();
          }
          return this.animation;
        },
        makeSingleAnimation: function(target) {
          // XXX(yvonne): for selecting all the animated elements.
          target.classList.add('polymer-animation-target');
          return new Animation(target, this.animationEffect, this.timingProps);
        },
        makeAnimation: function() {
          // this.target && console.log('makeAnimation target', this.target, 'animation', this.animationEffect, 'timing', this.timingProps);
          if (!this.target) {
            return null;
          }
          var animation;
          if (Array.isArray(this.target)) {
            var array = [];
            this.target.forEach(function(t) {
              array.push(this.makeSingleAnimation(t));
            }.bind(this));
            animation = new AnimationGroup(array);
          } else {
            animation = this.makeSingleAnimation(this.target);
          }
          return animation;
        },
        animationChanged: function() {
          // TODO: attributes are not case sensitive.
          // TODO: Sending 'this' with the event because if the children is
          // in ShadowDOM the sender becomes the shadow host.
          this.fire('polymer-animation-change', this);
        },
        targetSelectorChanged: function() {
          if (this.targetSelector) {
            this.target = findTarget(this.targetSelector, this);
          }
        },
        targetChanged: function(old) {
          if (old) {
            old.classList.remove('polymer-animation-target');
          }
        },
        get timingProps() {
          var props = {};
          var timing = {
            fill: {},
            easing: {},
            delay: {isNumber: true},
            iterationCount: {isNumber: true, allowInfinity: true},
            direction: {},
            duration: {isNumber: true}
          };
          for (t in timing) {
            if (this[t] !== null) {
              var name = timing[t].property || t;
              props[name] = timing[t].isNumber && this[t] !== 'auto' ?
                  toNumber(this[t], timing[t].allowInfinity) : this[t];
            }
          }
          return props;
        },
        get animationEffect() {
          var props = {};
          var frames = [];
          var effect;
          if (this.keyframes) {
            frames = this.keyframes;
          } else if (!this.sample) {
            var children = this.querySelectorAll('polymer-animation-keyframe');
            if (children.length === 0) {
              children = this.shadowRoot.querySelectorAll('polymer-animation-keyframe');
            }
            Array.prototype.forEach.call(children, function(c) {
              frames.push(c.properties);
            });
          }
          if (this.sample) {
            effect = {sample: this.sample};
          } else {
            effect = new KeyframeEffect(frames, this.composite);
          }
          return effect;
        },
        bindAnimationEvents: function() {
          if (!this.animation.onstart) {
            this.animation.onstart = this.animationStartHandler.bind(this);
          }
          if (!this.animation.onend) {
            this.animation.onend = this.animationEndHandler.bind(this);
          }
        },
        animationStartHandler: function() {
          this.fire('polymer-animation-start');
        },
        animationEndHandler: function() {
          this.fire('polymer-animation-end');
        }
      });
    })();
  