
      var sampleAnimationFn = function(timeFraction, currentIteration, animationTarget, underlyingValue) {
        if (timeFraction < 1) {
          animationTarget.textContent = timeFraction;
        } else {
          animationTarget.textContent = 'animated!';
        }
      };

      document.addEventListener('polymer-ready', function() {
        document.querySelector('.animations').addEventListener('click',
					function(e) {
            var animation = e.target;
            if (animation.id === 'sample-animation') {
              animation.sample = sampleAnimationFn;
            }
						animation.target = target;
						animation.play();
					});
					document.querySelector('polymer-fadeout').addEventListener(
						'complete', function(e) {
							alert('complete!');
						});
      });
    