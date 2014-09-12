
    (function() {
      // track overlays for z-index and focus managemant
      var overlays = [];
      var trackOverlays = function(inOverlay) {
        if (inOverlay.opened) {
          //var overlayZ = window.getComputedStyle(inOverlay.target).zIndex;
          //var z0 = Math.max(currentOverlayZ(), overlayZ);
          var z0 = currentOverlayZ();
          overlays.push(inOverlay);
          var z1 = currentOverlayZ();
          if (z1 <= z0) {
            applyOverlayZ(inOverlay, z0);
          } 
        } else {
          var i = overlays.indexOf(inOverlay);
          if (i >= 0) {
            overlays.splice(i, 1);
            setZ(inOverlay, null);
          }
        }
      }
      
      var applyOverlayZ = function(inOverlay, inAboveZ) {
        setZ(inOverlay.target, inAboveZ + 2);
      }
      
      var setZ = function(inNode, inZ) {
        inNode.style.zIndex = inZ;
      }
    
      var currentOverlay = function() {
        return overlays[overlays.length-1];
      }
      
      var DEFAULT_Z = 10;
      
      var currentOverlayZ = function() {
        var z;
        var current = currentOverlay();
        if (current) {
          var z1 = window.getComputedStyle(current.target).zIndex;
          if (!isNaN(z1)) {
            z = Number(z1);
          }
        }
        return z || DEFAULT_Z;
      }
      
      var focusOverlay = function() {
        var current = currentOverlay();
        if (current) {
          current.applyFocus();
        }
      }
    
      Polymer('polymer-overlay', {
        /**
         * The target element.
         *
         * @attribute target
         * @type Object
         */
        target: null,
        /**
         * Set opened to true to show an overlay and to false to hide it.
         * A polymer-overlay may be made intially opened by setting its
         * opened attribute.
         * @attribute opened
         * @type boolean
         * @default false
         */
        opened: false,
        /**
         * By default an overlay will close automatically if the user
         * taps outside it or presses the escape key. Disable this
         * behavior by setting the autoCloseDisabled property to true.
         * @attribute autoCloseDisabled
         * @type boolean
         * @default false
         */
        autoCloseDisabled: false,
        /**
         * This property specifies the animation to play when the overlay is
         * opened/closed. It can be an array of two animations
         * [opening, closing], a single animation, an array of two strings, or
         * a string. The strings should the tag names of custom elements
         * descending from a polymer-animation. In the case of a single
         * animation the closing animation is the opening animation played
         * backwards.
         * @attribute transitions
         * @type polymer-animation
         * @type Array&lt;polymer-animation>
         * @type string
         * @type Array&lt;string>
         */
        transitions: null,
        timeout: 1000,
        captureEventType: 'tap',
        ready: function() {
          if (this.tabIndex === undefined) {
            this.tabIndex = -1;
          }
          this.setAttribute('touch-action', 'none');
        },
        enteredView: function() {
          this.installControllerStyles();
        },
        /** 
         * Toggle the opened state of the overlay.
         * @method toggle
         */
        toggle: function() {
          this.opened = !this.opened;
        },
        targetChanged: function(old) {
          if (this.target) {
            if (this.target.tabIndex === undefined) {
              this.target.tabIndex = -1;
            }
            this.target.classList.add('polymer-overlay');
            this.addListeners(this.target);
          }
          if (old) {
            old.classList.remove('polymer-overlay');
            this.removeListeners(old);
          }
        },
        listeners: {
          'tap': 'tapHandler',
          'keydown': 'keydownHandler'
        },
        addListeners: function(node) {
          for (e in this.listeners) {
            node.addEventListener(e, this[this.listeners[e]].bind(this));
          }
        },
        removeListeners: function(node) {
          for (e in this.listeners) {
            node.removeEventListener(e, this[this.listeners[e]].bind(this));
          }
        },
        openedChanged: function() {
          this.renderOpened();
          trackOverlays(this);
          this.async(function() {
            if (!this.autoCloseDisabled) {
              this.enableCaptureHandler(this.opened);
            }
          });
          this.enableResizeHandler(this.opened);
          this.fire('polymer-overlay-open', this.opened);
        },
        enableHandler: function(inEnable, inMethodName, inNode, inEventName, inCapture) {
          var m = 'bound' + inMethodName;
          this[m] = this[m] || this[inMethodName].bind(this);
          
          inNode[inEnable ? 'addEventListener' : 'removeEventListener'](
            inEventName, this[m], inCapture);
        },
        enableResizeHandler: function(inEnable) {
          this.enableHandler(inEnable, 'resizeHandler', window, 
            'resize');
        },
        enableCaptureHandler: function(inEnable) {
          this.enableHandler(inEnable, 'captureHandler', document, 
            this.captureEventType, true);
        },
        getFocusNode: function() {
          return this.target.querySelector('[autofocus]') || this.target;
        },
        // TODO(sorvell): nodes stay focused when they become un-focusable
        // due to an ancestory becoming display: none; file bug.
        applyFocus: function() {
          var focusNode = this.getFocusNode();
          if (this.opened) {
            focusNode.focus();
          } else {
            focusNode.blur();
            focusOverlay();
          }
        },
        positionTarget: function() {
          if (this.opened) {
            // vertically and horizontally center if not positioned
            var computedStyle = getComputedStyle(this.target);
            if (computedStyle.top === 'auto' && computedStyle.bottom === 'auto') {
              this.target.style.top = ((window.innerHeight - this.target.getBoundingClientRect().height) / 2) + 'px';
            }
            if (computedStyle.left === 'auto' && computedStyle.right === 'auto') {
              this.target.style.left = ((window.innerWidth - this.target.getBoundingClientRect().width) / 2) + 'px';
            }
          }
        },
        resetTargetPosition: function() {
          this.target.style.top = this.target.style.left = null;
        },
        get transition() {
          return (!Array.isArray(this.transitions) && this.transitions
              || this.opened && this.transitions && this.transitions[0]
              || !this.opened && this.transitions && this.transitions[1]);
        },
        applyTransition: function() {
          var animation = typeof this.transition === 'string' ?
              document.createElement(this.transition) : this.transition;
          // FIXME: Apply a default duration.
          if ((!animation.duration || animation.duration === 'auto') && !animation.type) {
            animation.duration = 0.3;
          }
          if (!animation.hasTarget()) {
            animation.target = this.target;
          }
          // Make the overlay visible while the animation is running.
          var transition = new ParGroup([
            animation.apply(),
            new Animation(this.target, [{'visibility': 'visible', 'display':'block'}])
          ], {fill: 'none'});
          transition.onend = this.completeOpening.bind(this);
          this.target.classList.add('animating');
          document.timeline.play(transition);
        },
        renderOpened: function() {
          this.target.classList.add('revealed');
          // continue styling after delay so display state can change
          // without aborting transitions
          this.async('continueRenderOpened');
        },
        continueRenderOpened: function() {
          this.positionTarget();
          if (this.transition) {
            this.applyTransition();
            // FIXME: Apply the class after the animation starts playing to
            // prevent a flicker at the end of the animation. Should be handled
            // in polymer-animation-start event but not working in polyfill
            this.async(function() {
              this.target.classList.toggle('opened', this.opened);
            }, null, 100);
          } else {
            this.target.classList.toggle('opened', this.opened);
            this.async('completeOpening');
          }
        },
        completeOpening: function() {
          this.target.classList.remove('animating');
          this.target.classList.toggle('revealed', this.opened);
          if (!this.opened) {
            this.resetTargetPosition();
          }
          this.applyFocus();
        },
        tapHandler: function(e) {
          if (e.target && e.target.hasAttribute('overlay-toggle')) {
            this.toggle();
          } else {
            if (this.autoCloseJob) {
              this.autoCloseJob.stop();
              this.autoCloseJob = null;
            }
          }
        },
        // TODO(sorvell): This approach will not work with modal. For
        // this we need a scrim.
        captureHandler: function(e) {
          if (!this.autoCloseDisabled && (currentOverlay() == this) && (this 
              != e.target) && !(this.contains(e.target))) {
            this.autoCloseJob = this.job(this.autoCloseJob, function() {
              this.opened = false;
            });
          }
        },
        keydownHandler: function(e) {
          if (!this.autoCloseDisabled && (e.keyCode == this.$.keyHelper.ESCAPE_KEY)) {
            this.opened = false;
            e.stopPropagation();
            e.cancelBubble = true;
          }
        },
        /**
         * Extensions of polymer-overlay should implement the resizeHandler
         * method to adjust the size and position of the overlay when the 
         * browser window resizes.
         * @method resizeHandler
         */
        resizeHandler: function() {
        }
      });
    })();
  