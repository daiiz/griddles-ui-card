
			$ = document.querySelector.bind(document);

			somethingCheck = function() {
				$('#confirmation').opened = (event.target.value == 'something');
			}
			
			changeOpening = function(e) {
				var s = e.target.selectedOptions[0];
				if (s) {
					dialog.className = dialog.className.replace(/polymer-[^\s]*/, '')
					dialog.classList.add(s.textContent);
				}
			}
			
			modalChange = function(e) {
				dialog.autoCloseDisabled = e.target.checked;
			}
			
			scrimChange = function(e) {
				dialog.scrim = e.target.checked;
			}
			
			var overlayButtons = document.querySelectorAll('button[overlay]');
			Array.prototype.forEach.call(overlayButtons, function(b) {
				b.addEventListener('tap', function(e) {
					document.querySelector(e.target.getAttribute('overlay')).toggle();
				})
			});
		