
      function toggle(e) {
        var anchorable = document.querySelector('#anchorable');
        var target = document.querySelector('#target');
        var anchor = e.target;
        if (target.classList.contains('active')) {
          target.classList.remove('active');
        } else {
          var targetAnchorPt = anchor.getAttribute('target-anchor-point');
          target.setAttribute('anchor-point', targetAnchorPt);
          target.innerHTML = 'anchor-point: ' + anchor.getAttribute('anchor-point') + '<br>' + 'target anchor-point: ' + targetAnchorPt;
          anchorable.target = target;
          anchorable.anchor = anchor;
          target.classList.add('active');
          anchorable.apply();
        }
      };
      function toggleCustom(e) {
        var anchorable = document.querySelector('#anchorable');
        var target = document.querySelector('#target');
        var anchor = e.target;
        if (target.classList.contains('active')) {
          target.classList.remove('active');
        } else {
          var anchorPt = document.querySelector('#customAnchorPt').value;
          anchor.setAttribute('anchor-point', anchorPt);
          var targetAnchorPt = document.querySelector('#customTargetAnchorPt').value;
          target.setAttribute('anchor-point', targetAnchorPt);
          target.innerHTML = 'anchor-point: ' + anchorPt + '<br>' + 'target anchor-point: ' + targetAnchorPt;
          anchorable.target = target;
          anchorable.anchor = anchor;
          target.classList.add('active');
          anchorable.apply();
        }
      }
    