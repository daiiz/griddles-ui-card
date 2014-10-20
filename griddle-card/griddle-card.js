(function () {

var griddle_card_list = [];
var defaults= {
    'griddles_type': 'card', // または'photo_grid'
    'shadow_depth': 1,
    'src': '',
    'contents': '<div>Hello!</div>',
    'className': '',
    'height': false, //Math.floor(Math.random()*200) + 50,
    'stream_index': false,
    'insert_type': 'append', // または'prepend'
    'border_radius': 2,
    'dataset': {'name': 'bar'},
    // NEW!
    'paperColor': '#ffffff'
};

Polymer("griddle-card", {
  ready: function() {
    var new_card = {};

    // type
    if(this.type == undefined) {
      new_card.griddles_type = defaults.griddles_type;
    }else {
      if(this.type == 'photo_grid' || this.type == 'photo') {
         new_card.griddles_type = 'photo_grid';
      }else {
         new_card.griddles_type = this.type;
      }
    }
    // typeの補正
    var content = this.querySelector('content');
    if(content == null) {
      new_card.griddles_type = defaults.griddles_type;
    }else {
      if(content.innerHTML == undefined) {
        new_card.griddles_type = defaults.griddles_type;
      }
    }

    // shadowDepth
    if(this.shadowDepth == undefined) {
      new_card.shadow_depth = defaults.shadow_depth;
    }else {
      new_card.shadow_depth = this.shadowDepth;
    }

    // content
    if(new_card.griddles_type == 'card') {
      if(content == null) {
        new_card.contents = defaults.contents;
      }else {
        new_card.contents = content.innerHTML;
      }
      new_card.src = defaults.src;
    }else if(new_card.griddles_type == 'photo_grid') {
      new_card.src = content.innerHTML;
      new_card.contents = '';
    }

    // className(非推奨)
    new_card.className = defaults.className;

    // height
    if(this.height == undefined) {
      if(new_card.griddles_type == 'photo_grid') {
        new_card.height = defaults.height;
      }else {
        new_card.height = Math.floor(Math.random()*200) + 50;
      }
    }else {
      if(this.height == 'random') {
        new_card.height = Math.floor(Math.random()*200) + 50;
      }else {
        new_card.height = this.height;
      }
    }

    //streamIndex
    if(this.streamIndex == undefined) {
      new_card.stream_index = defaults.stream_index;
    }else {
      new_card.stream_index = this.streamIndex;
    }

    // insert
    if(this.insert == undefined) {
      new_card.insert_type = defaults.insert_type;
    }else {
      new_card.insert_type = this.insert;
    }

    // borderRadius
    if(this.borderRadius == undefined) {
      new_card.border_radius = defaults.border_radius;
    }else {
      new_card.border_radius = this.borderRadius;
    }

    // dataset
    if(this.dataset == undefined) {
      new_card.dataset = defaults.dataset;
    }else {
      new_card.dataset = this.dataset;
    }


    // paperColor
    if(this.paperColor == undefined) {
      new_card.paperColor = defaults.paperColor;
    }else {
      new_card.paperColor = this.paperColor;
    }


    griddle_card_list.push(new_card);
    // console.log("added: %s", content);
  },

  get getList() {
    return griddle_card_list;
  },

  get clearList() {
    griddle_card_list = [];
    return 1;
  }
});

})();