/**
 * Injects a hidden IFrame into the website being currently viewed
 */
const iframe = document.createElement("iframe");
iframe.setAttribute("hidden", "hidden");
iframe.setAttribute("id", "permissionsIFrame");
iframe.setAttribute("allow", "microphone");
iframe.src = chrome.runtime.getURL("js/permissions.html");
document.body.appendChild(iframe);

export {};