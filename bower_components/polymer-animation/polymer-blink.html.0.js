
    Polymer('polymer-blink', {
			targetSelector: '',
			duration: 0.7,
			iterationCount: 'Infinity',
			easing: 'cubic-bezier(1.0,0,0,1.0)',
			keyframes: [
        {opacity: 1},
        {opacity: 0}
			]
    });
  