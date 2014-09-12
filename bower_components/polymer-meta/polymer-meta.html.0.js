
    (function() {
      var SKIP_ID = 'meta';
      var metaData = {}, metaArray = {};

      Polymer('polymer-meta', {
        alwaysPrepare: true,
        /**
         * The type of meta-data.  All meta-data with the same type with be
         * stored together.
         * 
         * @attribute type
         * @type string
         * @default 'default'
         */
        type: 'default',
        ready: function() {
          this.register(this.id);
        },
        get metaArray() {
          var t = this.type;
          if (!metaArray[t]) {
            metaArray[t] = [];
          }
          return metaArray[t];
        },
        get metaData() {
          var t = this.type;
          if (!metaData[t]) {
            metaData[t] = {};
          }
          return metaData[t];
        },
        register: function(id, old) {
          if (id && id !== SKIP_ID) {
            this.unregister(this, old);
            this.metaData[id] = this;
            this.metaArray.push(this);
          }
        },
        unregister: function(meta, id) {
          delete this.metaData[id || meta.id];
          var i = this.metaArray.indexOf(meta);
          if (i >= 0) {
            this.metaArray.splice(i, 1);
          }
        },
        /**
         * Returns a list of all meta-data elements with the same type.
         * 
         * @attribute list
         * @type array
         * @default []
         */
        get list() {
          return this.metaArray;
        },
        /**
         * Returns the first `<template>` in the `<polymer-meta>` subtree. This
         * is useful to store element example.
         *
         *     <polymer-meta id="polymer-ui-toolbar" label="Polymer Toolbar">
         *       <template>
         *         <polymer-ui-toolbar theme="polymer-ui-light-theme">
         *           <polymer-ui-icon-button icon="menu"></polymer-ui-icon-button>
         *           <div flex>Title</div>
         *           <polymer-ui-icon-button icon="add"></polymer-ui-icon-button>
         *         </polymer-ui-toolbar>
         *       </template>
         *     </polymer-meta>
         * 
         * @attribute archetype
         * @type node
         * @default null
         */
        get archetype() {
          return this.querySelector('template');
        },
        /**
         * Retrieves meta-data by ID.
         *
         * @method byId
         * @param {String} id The ID of the meta-data to be returned.
         * @returns Returns meta-data.
         */
        byId: function(id) {
          return this.metaData[id];
        },
        get childMetas() {
          return this.querySelectorAll(this.localName);
        }
      });
    })();
  