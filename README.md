# UNews Chrome Extension

A Chrome extension that connects to and interacts with web pages.

## Features

- Connects to any open web page
- Communicates between extension and web pages
- Get page information (title, URL, links count, images count)
- Inject content into web pages
- Highlight pages with visual indicators
- Background service worker for extension-level logic
- Content script for page interaction

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension directory (the folder containing manifest.json)
6. The extension should now appear in your extensions list

## Usage

### Basic Usage

1. Click the extension icon in the Chrome toolbar to open the popup
2. Use the buttons to interact with the current web page:
   - **Get Page Data**: Retrieves information about the current page
   - **Highlight Page**: Adds a red border around the page
   - **Show Banner**: Displays a temporary banner at the top of the page

### For Developers

#### Extension Architecture

- **manifest.json**: Extension configuration (Manifest V3)
- **background.js**: Service worker for background tasks and message handling
- **content.js**: Script injected into web pages for interaction
- **popup.html/popup.js**: Extension popup UI and logic

#### Message Passing

The extension uses Chrome's message passing API for communication:

**From content script to background:**
```javascript
chrome.runtime.sendMessage({
  type: 'PAGE_LOADED',
  url: window.location.href
}, (response) => {
  console.log(response);
});
```

**From popup to content script:**
```javascript
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
const response = await chrome.tabs.sendMessage(tab.id, {
  type: 'GET_PAGE_DATA'
});
```

#### Available Message Types

**Content Script Messages:**
- `GET_PAGE_DATA`: Returns page information
- `HIGHLIGHT_PAGE`: Adds visual highlight to page
- `INJECT_CONTENT`: Injects a banner into the page

**Background Script Messages:**
- `PAGE_LOADED`: Sent when a page finishes loading
- `GET_PAGE_INFO`: Returns tab information

## File Structure

```
UNews/
├── manifest.json          # Extension manifest (V3)
├── background.js          # Background service worker
├── content.js            # Content script (runs on pages)
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic
├── icon16.png            # Extension icon (16x16)
├── icon48.png            # Extension icon (48x48)
├── icon128.png           # Extension icon (128x128)
└── README.md             # This file
```

## Permissions

The extension requires the following permissions:

- `activeTab`: Access to the currently active tab
- `scripting`: Ability to inject scripts
- `tabs`: Access to tab information
- `<all_urls>`: Access to all websites

## Development

### Testing

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Debugging

- **Background script**: Right-click extension icon → "Inspect service worker"
- **Content script**: Open DevTools on any page → Console tab
- **Popup**: Right-click popup → "Inspect"

## Customization

You can customize the extension by:

1. Modifying the UI in `popup.html` and `popup.js`
2. Adding new message handlers in `content.js`
3. Updating background logic in `background.js`
4. Changing permissions in `manifest.json`

## Notes

- This extension uses Manifest V3, the latest Chrome extension standard
- The content script runs on all pages (`<all_urls>`)
- Icons are placeholder files - replace with actual images
- The extension is in developer mode - for production, proper icons are required

## License

MIT
