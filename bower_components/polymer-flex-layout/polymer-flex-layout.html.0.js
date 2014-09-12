
    Polymer('polymer-flex-layout', {
      vertical: false,
      isContainer: false,
      layoutContainer: null,
      enteredView: function() {
        this.installControllerStyles();
        this.layoutContainer = this.isContainer ? 
            this : (this.parentNode.host || this.parentNode);
        this.verticalChanged();
        this.alignChanged();
        this.justifyChanged();
      },
      leftView: function() {
        this.layoutContainer = null;
      },
      layoutContainerChanged: function(old) {
        if (old) {
          old.classList.remove('flexbox');
        }
        this.style.display = this.layoutContainer === this ? '' : 'none';
        if (this.layoutContainer) {
          this.layoutContainer.classList.add('flexbox');
        }
      },
      switchContainerClass: function(prefix, old, name) {
        if (this.layoutContainer && name) {
          this.layoutContainer.classList.switch(
              prefix + old, prefix + name);
        }
      },
      verticalChanged: function() {
        if (this.layoutContainer) {
          this.layoutContainer.classList.toggle('column', this.vertical);
        }
      },
      alignChanged: function(old) {
        this.switchContainerClass('align-', old, this.align);
      },
      justifyChanged: function(old) {
        this.switchContainerClass('justify-', old, this.justify);
      }
    });
  