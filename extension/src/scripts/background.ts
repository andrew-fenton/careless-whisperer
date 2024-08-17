chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: "js/permissions.html" });
});

export {};