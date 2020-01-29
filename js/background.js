// chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([
//         {
//             conditions: [
//                 new chrome.declarativeContent.PageStateMatcher({
//                     pageUrl: { hostContains: "youtube.com" }
//                 })
//             ],
//             actions: [new chrome.declarativeContent.RequestContentScript({js: ["timeSaveCalculation.js"]})]
//         }
//     ]);
// });

// chrome.webNavigation.onCommitted.addListener(
//     function(details) {
//         chrome.tabs.executeScript({
//             code: 'console.log("on Complete fired")',
//         });
//     },
//     {
//         url: [
//             {
//                 // Runs on example.com, example.net, but also example.foo.com
//                 hostContains: "youtube.com"
//             }
//         ]
//     }
// );

// chrome.webNavigation.onCompleted.addListener(function(details) {
//     chrome.tabs.executeScript(details.tabId, {
//         file: "timeSaveCalculation.js"
//     });
// }, {
//     url: [{
//         hostContains: "youtube.com",
//         pathContains: "watch"
//     }]
// });

// chrome.webNavigation.onCompleted.addListener(function(details) {
//     chrome.tabs.executeScript(details.tabID, {
//         code: ' if (document.body.innerText.indexOf("Cat") !=-1) {' +
//             '     alert("Cat not found!");' +
//             ' }'
//     });
// }, {
//     url: [{
//         // Runs on example.com, example.net, but also example.foo.com
//         hostContains: '.example.'
//     }],
// });

// var contextMenus = {};

// contextMenus.createCounterString =
//     chrome.contextMenus.create(
//         {"title":"Generate Counterstring",
//         "contexts" : ["editable"]
//         },
//         function (){
//             if(chrome.runtime.lastError){
//                 console.error(chrome.runtime.lastError.message);
//             }
//         }
//     );

// chrome.contextMenus.onClicked.addListener(contextMenuHandler);

// function contextMenuHandler(info, tab){

//     if(info.menuItemId===contextMenus.createCounterString){
//         chrome.tabs.executeScript({
//             file: 'js/counterstring.js'
//         });
//     }
// }
