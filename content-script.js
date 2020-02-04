webAccessibleResource = document.createElement("script");
webAccessibleResource.src = chrome.runtime.getURL("youtube-script.js");

(document.head || document.documentElement).appendChild(webAccessibleResource);