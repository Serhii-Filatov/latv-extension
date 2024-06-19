chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openUrlInCurrentTab") {
    chrome.tabs.update(sender.tab.id, { url: request.url });
    sendResponse({ status: "URL opened in current tab" });
  }
});