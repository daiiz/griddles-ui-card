var YUMMY2 = "griddles_yummy2";
var MAINKEY = "ごちそう";
var TAGMANAGE = "タグを管理";
var griddles_apis = {};

function creatingKeyList(data, id) {
	document.getElementById(id).innerHTML = '<paper-item label="すべてのごちそう" class="menu_item" id="btn_all_gochiso" data-label="ごちそう"></paper-item>';
	var tags = [];
	var str_tags = "," + tags.toString() + ",";
    if(data != undefined) {
        for(var j = 0; j < data.length; j++) {
        	if(j > 0) {
                var yss = data[j].tags.ys;
                for(var i = 0; i < yss.length; i++) {
                    var rg = new RegExp("," + yss[i] + ",", "gi");
                    var res = str_tags.search(rg);
                    if(res == -1 && yss[i] != MAINKEY) {
                    	tags.push(yss[i]);
                    	str_tags = str_tags + yss[i] + ",";
                    }
                }
        	}
        }
        var template = '<paper-item label="{L}" class="menu_item" data-label="{DL}"></paper-item>';
        var html = "";
        var max = tags.length;
        if(tags.length > 10) {
        	max = 10;
        }
        for(var j = 0; j < max; j++) {
            var html = html + griddles_apis.make(template, {L: tags[j], DL: tags[j]});
        }
        if(tags.length > 10) {
        	html = html + "<hr>" + griddles_apis.make(template, {L: TAGMANAGE, DL: TAGMANAGE});
        }
        $($("#"+id)).append(html);

        return tags;
    }
}

function miils(query) {
  var cards = [];
  var rg = new RegExp("," + query + ",", "gi");
	smpls = JSON.parse(localStorage[YUMMY2]);
	//var queries = creatingKeyList(smpls, "#menus");
    for(var i = 0; i < smpls.length; i++) {
     if(i > 0) {
    	h = false;
    	var obj = smpls[i];
    	//var local_name = obj.page.split("/");
        //local_name = local_name[local_name.length - 1];
        //var src = "photos/"+ local_name +".jpg";
        var tags = smpls[i].tags.ys;
        var str_tags = "," + tags.toString() + ",";
        var res = str_tags.search(rg);
        var src = smpls[i].web;
    	var j = {"griddles_type": GRID_PHOTO, 
               "shadow_depth": 0,
               "src": src, 
               "contents": "", 
               "className": "text", 
               "height": h,
               "dataset": {"webpage": smpls[i].page}
              }
        if(res != -1 || query == MAINKEY) {
    	   cards.push(j);
    	  }
      }
    }
    /**/
    var headerBgURL = "";
    if(query != MAINKEY && cards.length > 0) {
      var r = Math.floor(Math.random() * (cards.length));
      headerBgURL = cards[r].src;
    }else {
      headerBgURL = "src/1frgq.jpg";
    }
    changeHeadImage(headerBgURL);
    
    return cards;
};

function changeHeadImage(url) {
  var headerBg = document.querySelector("core-scroll-header-panel").headerBg;
  headerBg.style.backgroundImage = "url('"+ url +"')";
}

function griddlesAppCardClicked(card) {
   /* open web page */
   changeHeadImage(card[0].src);
   window.open(card[0].dataset.webpage);
}


function ImportingData() {
   var import_code = document.getElementById("dialog_input_import").value;
   if(import_code != "") {
      localStorage[YUMMY2] = import_code;
      griddlesAppInit();
   }
}

function removingData() {
   localStorage.removeItem(YUMMY2);
   griddlesAppInit();
}

function toggleDialog(id) {
    var dialog = document.querySelector('#' + id);
    dialog.toggle();
}

function griddlesAppInit() {
  console.log("appInit..");
  griddles_apis = document.querySelector("griddles-ui-card").apis;
  document.querySelector("griddles-ui-card").layout = {
    cardWidth: 194,
    cardMarginBottom: 4,
    streamMarginLeft: 2,
    streamMarginRight: 2,
    streamPaddingTop: 10,
    numberReadAtOnce: 20,
    displayFromTopLeftToBottomRight: 0.01
  };
	var smpls = sample_data;
	if(localStorage[YUMMY2] != undefined && localStorage[YUMMY2] != "") {
       var code = JSON.parse(localStorage[YUMMY2]);
       if(code != undefined) {
          smpls = code;
       }
	}else if(localStorage[YUMMY2] == undefined) {
       localStorage[YUMMY2] = JSON.stringify(smpls);
	}
	var queries = creatingKeyList(smpls, "menus");
}

/*　
 * Event Listener
 */

document.getElementById("btn_import").addEventListener("click", function() {
   toggleDialog('dialog_import');
}, false);

document.getElementById("btn_remove").addEventListener("click", function() {
   removingData();
}, false);

document.getElementById("btn_all_gochiso").addEventListener("click", function() {
   //var isRunning = home.new_session(miils(), true);
   //console.log(isRunning);
}, false);

document.getElementById("dialog_btn_import").addEventListener("click", function() {
   ImportingData();
}, false);

window.addEventListener("load", function() {
   console.log(document.querySelector("griddles-ui-card").apis);
   //appInit();
}, false)

window.addEventListener("click", function(e) {
   var id = e.target.id;
   var dataset = e.target.dataset;
   if(dataset.label != undefined && dataset.label != TAGMANAGE) {
       var cards = document.querySelector("griddles-ui-card").cards;//{};
       cards[dataset.label] = miils(dataset.label);
       document.querySelector("griddles-ui-card").cards = cards;
       document.querySelector("griddles-ui-card").query = dataset.label;
       // var isRunning = home.new_session(miils(dataset.label), true);
   }
   
},false);
