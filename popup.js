// Popup script

console.log('UNews Extension popup loaded');

const status = document.getElementById('status');

// Function to show status messages
function showStatus(message, isError = false) {
  status.textContent = message;
  status.style.background = isError ? '#ffebee' : '#e3f2fd';
  status.style.color = isError ? '#c62828' : '#1976d2';
  setTimeout(() => {
    status.textContent = '';
  }, 3000);
}

// Function to send message to content script
async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    showStatus('No active tab found', true);
    return null;
  }

  try {
    const response = await chrome.tabs.sendMessage(tab.id, message);
    return response;
  } catch (error) {
    showStatus('Error: ' + error.message, true);
    console.error('Error sending message:', error);
    return null;
  }
}

// Get page data button
document.getElementById('getPageData').addEventListener('click', async () => {
  showStatus('Getting page data...');

  const response = await sendMessageToActiveTab({ type: 'GET_PAGE_DATA' });

  if (response) {
    document.getElementById('pageTitle').textContent = response.title;
    document.getElementById('pageUrl').textContent = response.url;
    document.getElementById('linksCount').textContent = response.linksCount;
    document.getElementById('imagesCount').textContent = response.imagesCount;
    showStatus('Page data loaded!');
  }
});

// Highlight page button
document.getElementById('highlightPage').addEventListener('click', async () => {
  showStatus('Highlighting page...');

  const response = await sendMessageToActiveTab({ type: 'HIGHLIGHT_PAGE' });

  if (response) {
    showStatus('Page highlighted!');
  }
});

// Inject content button
document.getElementById('injectContent').addEventListener('click', async () => {
  showStatus('Injecting content...');

  const response = await sendMessageToActiveTab({
    type: 'INJECT_CONTENT',
    content: 'UNews Extension Connected!'
  });

  if (response) {
    showStatus('Content injected!');
  }
});

// Load initial page info when popup opens
(async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    document.getElementById('pageTitle').textContent = tab.title || '-';
    document.getElementById('pageUrl').textContent = tab.url || '-';
  }
})();
