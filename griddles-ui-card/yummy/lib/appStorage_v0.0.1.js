// 
// Copyright (c) 2014 daiz. All rights reserved.
// This code may only be used under the BSD style license.
//
var appStorage = (function(key_value_json, operation, callback) {

    var json = key_value_json;
    var key = "APPSTORAGE_DEFAULT";
    if(typeof json == "object") {
        key = key_value_json.key;
    }else if(typeof json == "string"){
        key = key_value_json;
    }
    var val = key_value_json.value || "";

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
    
    //
    // chrome app の場合の処理
    //
    var chrome_item = {};
    function chromeApp() {
        var storageArea = chrome.storage.local;
        switch(operation) {
           case "set": 
                var item = {};
                item[key] = val;
                chrome_item = item;
                storageArea.set(item, chrome_transactionCompleted);
                break;
           case "get": 
                storageArea.get(key, chrome_transactionCompleted);
                break;
           case "remove": 
                chrome_item[key] = null;
                storageArea.remove(key, chrome_transactionCompleted);
                break;
           default: break;
        }
    }

    function chrome_transactionCompleted(e) {
       var res;
       if(e != undefined) {
           res = e;
       }else {
           res = chrome_item;
       }
       transactionCompleted(res);
    }
    
    //
    // browser の場合の処理
    //
    function browser() {
        // checkDegitを付加しておく
        if(typeof val == "object" || typeof val == "number") {
           val = JSON.stringify(val);
           val = val + "1";
        }else {
           val = val + "0";
        }
        var item = {};

        switch(operation) {
            case "set": 
                 localStorage.setItem(key, val);
                 item[key] = json.value;
                 transactionCompleted(item);
                 break;

            case "get": 
                 var v = localStorage.getItem(key);
                 if(v != undefined) {
                    var checkDigit = +(v[v.length - 1]);
                    var v = v.slice(0, -1);
                    if(checkDigit == 1) {
                        v = JSON.parse(v);
                    }
                 }
                 item[key] = v;
                 transactionCompleted(item);
                 break;

            case "remove":
                 localStorage.removeItem(key);
                 item[key] = null;
                 transactionCompleted(item);
                 break;

            default: break;
        }

    }
    
    //
    // どちらの場合でも実行する処理
    //
    function transactionCompleted(j) {
        console.group("["+operation+"] transaction completed.");
        console.dirxml(j);
        console.dirxml(Object.keys(j));
        if(callback != undefined) {
            console.groupEnd("["+operation+"] transaction completed.");
            callback(j, Object.keys(j));
        }else {
            console.info("'callback' does not exist.");
            console.groupEnd("["+operation+"] transaction completed.");
        }
    }

    function main() {
        if(isChromeApp() == true) {
            chromeApp();
        }else {
            browser();
        }
    }
 
    main();
    //transactionCompleted();
});