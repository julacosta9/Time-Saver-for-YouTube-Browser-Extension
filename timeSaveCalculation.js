webAccessibleResource = document.createElement("script");
webAccessibleResource.src = chrome.runtime.getURL("script.js");

// s.onload = function() {
//     this.remove();
// };
// console.log(webAccessibleResource);
(document.head || document.documentElement).appendChild(webAccessibleResource);



