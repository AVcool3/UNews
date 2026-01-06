// Content script - runs on web pages

console.log('UNews Extension content script loaded on:', window.location.href);

// Notify background script that page has loaded
chrome.runtime.sendMessage({
  type: 'PAGE_LOADED',
  url: window.location.href,
  title: document.title
}, (response) => {
  if (response) {
    console.log('Background response:', response);
  }
});

// Listen for messages from the extension (popup or background)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message);

  if (message.type === 'GET_PAGE_DATA') {
    // Send page data back
    sendResponse({
      url: window.location.href,
      title: document.title,
      bodyText: document.body.innerText.substring(0, 500), // First 500 chars
      linksCount: document.querySelectorAll('a').length,
      imagesCount: document.querySelectorAll('img').length
    });
  }

  if (message.type === 'HIGHLIGHT_PAGE') {
    // Example: Highlight the page
    document.body.style.border = '5px solid red';
    sendResponse({ status: 'highlighted' });
  }

  if (message.type === 'INJECT_CONTENT') {
    // Example: Inject content into the page
    const div = document.createElement('div');
    div.id = 'unews-extension-banner';
    div.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #4CAF50; color: white; padding: 10px; text-align: center; z-index: 10000;';
    div.textContent = message.content || 'UNews Extension Connected!';
    document.body.insertBefore(div, document.body.firstChild);

    // Remove after 3 seconds
    setTimeout(() => {
      div.remove();
    }, 3000);

    sendResponse({ status: 'injected' });
  }

  return true; // Keep message channel open for async responses
});

// Example: Monitor page changes
const observer = new MutationObserver((mutations) => {
  // You can monitor DOM changes here
  // console.log('Page mutated:', mutations.length, 'changes');
});

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Add a custom event listener for page-specific events
window.addEventListener('unews-custom-event', (event) => {
  console.log('Custom event received:', event.detail);
});

// Example function that can be called from the page
window.dispatchEvent(new CustomEvent('unews-extension-loaded', {
  detail: { version: '1.0.0' }
}));
