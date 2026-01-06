// Background service worker for UNews Extension

console.log('UNews Extension background service worker loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('UNews Extension installed');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background:', message);
  console.log('From tab:', sender.tab?.id);

  // Handle different message types
  if (message.type === 'PAGE_LOADED') {
    console.log('Page loaded:', message.url);
    sendResponse({ status: 'received', message: 'Background script acknowledged page load' });
  }

  if (message.type === 'GET_PAGE_INFO') {
    // Send back information about the current tab
    if (sender.tab) {
      sendResponse({
        status: 'success',
        tabId: sender.tab.id,
        url: sender.tab.url,
        title: sender.tab.title
      });
    }
  }

  return true; // Keep the message channel open for async responses
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('Tab completed loading:', tab.url);
  }
});

// Listen for messages from popup
chrome.runtime.onConnect.addListener((port) => {
  console.log('Connected:', port.name);

  port.onMessage.addListener((msg) => {
    console.log('Received message from popup:', msg);
  });
});
