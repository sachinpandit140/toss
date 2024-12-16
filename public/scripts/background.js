chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("history", (result) => {
    if (!result.history) {
      chrome.storage.local.set({ history: [] }, () => {
        console.log("History storage initialized.");
      });
    }
  });
});
