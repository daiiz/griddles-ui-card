/*
 * Copyright (c) 2014 daiz. All rights reserved.
 * This code may only be used under the BSD style license.
 */
var griddles = griddles || {};

griddles.apis = {
	bind: function(template, json) {
		return griddles.make(template, json);
	},

	make: function(template, json) {
		return griddles.make(template, json);
	},
	
	cac: function(card_json) {
	  return griddles.card_auto_complete(card_json);
	}
};


/*
 * You can get some events by `griddles-ui-card` element.
 * When a status of this element is ready, the function `griddlesAppInit` will be called.
 * And when the card object is clicked, the function `griddlesAppCardClicked`
 * will be launched.
 * You can define these functions as below here OR in your application script file 
 * which is loaded later.
 *
 *  function griddlesAppInit() {
 *  }
 *
 *  function griddlesAppCardClicked(card) {
 *    console.log(card)
 *  }
 *
 */