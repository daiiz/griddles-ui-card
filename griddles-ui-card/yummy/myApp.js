var YUMMY2 = "griddles_yummy2_a";
var MAINKEY = "ごちそう";
var TAGMANAGE = "タグを管理";
var griddles_apis = {};
var yummy2 = {};

//
// クエリリストをつくる
//
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


//
// クエリに対応するカードを表示する
//
function miils() {
  var g = document.querySelector("griddles-ui-card");
  appStorage({"key": YUMMY2}, "get", function(e, keys) {
    var imageList = []; // ランダム表示するヘッダ画像の候補
    var query = yummy2.query;
    var rg = new RegExp("," + query + ",", "gi");
    var key = keys[0];
    var smpls = e[key];
    for(var i = 0; i < smpls.length; i++) {
       if(i > 0) {
          var obj = smpls[i];
          var tags = smpls[i].tags.ys;
          var str_tags = "," + tags.toString() + ",";
          var res = str_tags.search(rg);
          var src = smpls[i].web;

          var card = g.apis.makeCard(null, 'T', 'photo');
              card = g.apis.makeCard(card, 'S', 0);
              card = g.apis.makeCard(card, 'R', 0);
              card = g.apis.makeCard(card, 'C', src);
              card = g.apis.makeCard(card, 'H', false);
              card = g.apis.makeCard(card, 'D', "webpage:" + smpls[i].page);

          if(res != -1 || query == MAINKEY) {
            imageList.push(src);
            $("griddles-ui-card").append(card);
          }
       }
    }
    var headerBgURL = "";
    if(imageList.length > 0) {
      var r = Math.floor(Math.random() * (imageList.length));
      headerBgURL = imageList[r];
    }else {
      headerBgURL = "src/1frgq.jpg";
    }
    changeHeadImage(headerBgURL);
    document.querySelector("griddles-ui-card").query = query;
  });
};

function isChromeApp() {
    var res = false;
    if(chrome != undefined) {
        if(chrome.app.window != undefined) {
        // 「chrome アプリ」である
        res = true;
        }
    }
  return res;
}

function changeHeadImage(url) {
  var headerBg = document.querySelector("core-scroll-header-panel").headerBg;
  if(isChromeApp() == true) {
      var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = function(e) {
              var blob_url = window.webkitURL.createObjectURL(this.response);
              url = blob_url;
              headerBg.style.backgroundImage = "url('"+ url +"')";
          }
          xhr.send();
  }else {
      headerBg.style.backgroundImage = "url('"+ url +"')";
  }
}

function griddlesAppCardClicked(card) {
   /* open web page */
   changeHeadImage(card[0].src);
   window.open(card[0].data.webpage);
}


function ImportingData() {
   var import_code = document.getElementById("dialog_input_import").value;
   if(import_code != "") {
       var import_code = JSON.parse(import_code);
       appStorage({"key": YUMMY2, "value": import_code}, "set", griddlesAppInit);
   }
}

function removingData() {
   appStorage({"key": YUMMY2}, "remove", griddlesAppInit);
}

function toggleDialog(id) {
    var dialog = document.querySelector('#' + id);
    dialog.toggle();
}

//
// griddles-ui-card の main関数
//
function griddlesAppInit() {
  console.log("appInit..");
  griddles_apis = document.querySelector("griddles-ui-card").apis;
  var smpls = sample_data;

  appStorage({"key": YUMMY2}, "get", function(e, keys) {
    var key = keys[0];
    var json = e[key];
    if(json != undefined && json != null) {
       smpls = json;
       var queries = creatingKeyList(smpls, "menus");
    }else if(json == undefined) {
       appStorage({"key": YUMMY2, "value": smpls}, "set", function() {
           var queries = creatingKeyList(smpls, "menus");
       })
    }
  });
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

document.getElementById("dialog_btn_import").addEventListener("click", function() {
   ImportingData();
}, false);

window.addEventListener("click", function(e) {
   var id = e.target.id;
   var dataset = e.target.dataset;
   if(dataset.label != undefined && dataset.label != TAGMANAGE) {
       var now = document.querySelector("griddles-ui-card").query;
       if(now != dataset.label) {
         yummy2.query = dataset.label;
         miils();
       }else {
         console.log("同一のクエリ.");
       }
   }
},false);
