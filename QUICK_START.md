# Quick Start Guide - UNews Extension

## Install the Extension (30 seconds)

### Step 1: Open Chrome Extensions Page
```
1. Open Google Chrome
2. Type in address bar: chrome://extensions/
3. Press Enter
```

### Step 2: Enable Developer Mode
```
Look at the top-right corner
Click the "Developer mode" toggle to ON
```

### Step 3: Load the Extension
```
1. Click "Load unpacked" button (top-left)
2. Navigate to and select this folder: /home/user/UNews
3. Click "Select Folder"
```

✅ **Extension is now installed!** You'll see the UNews Extension icon in your toolbar.

---

## Test It Right Now (2 minutes)

### Test 1: Visit a Website
```
1. Go to any website (try: https://example.com)
2. Open DevTools (press F12)
3. Look at Console tab
4. You should see: "UNews Extension content script loaded on: https://example.com"
```

### Test 2: Use the Popup
```
1. Click the extension icon in Chrome toolbar
2. A popup window opens
3. Click "Get Page Data" button
4. Watch the page info populate:
   - Title: Example Domain
   - URL: https://example.com
   - Links: 1
   - Images: 0
```

### Test 3: Highlight the Page
```
1. In the popup, click "Highlight Page"
2. Look at the website
3. You'll see a red border around the entire page!
```

### Test 4: Inject a Banner
```
1. In the popup, click "Show Banner"
2. A green banner appears at the top: "UNews Extension Connected!"
3. It automatically disappears after 3 seconds
```

---

## Debug/Inspect

### View Background Script Console
```
1. Go to chrome://extensions/
2. Find "UNews Extension"
3. Click "Inspect service worker"
4. DevTools opens showing background.js console
```

### View Content Script Console
```
1. Visit any web page
2. Press F12 to open DevTools
3. Go to Console tab
4. See content.js logs
```

### View Popup Console
```
1. Click extension icon to open popup
2. Right-click anywhere in the popup
3. Select "Inspect"
4. DevTools opens for popup.html
```

---

## What Each Button Does

| Button | What It Does | Where It Runs |
|--------|--------------|---------------|
| **Get Page Data** | Reads page title, URL, and counts links/images | content.js on web page |
| **Highlight Page** | Adds a 5px red border around the page | content.js on web page |
| **Show Banner** | Shows a green banner for 3 seconds | content.js on web page |

---

## File Locations

Current working directory: `/home/user/UNews`

```
/home/user/UNews/
├── manifest.json       ← Extension config
├── background.js       ← Background service worker
├── content.js         ← Runs on web pages
├── popup.html         ← Extension UI
├── popup.js           ← Popup logic
├── icon16.png         ← Icon (16x16)
├── icon48.png         ← Icon (48x48)
└── icon128.png        ← Icon (128x128)
```

---

## Troubleshooting

### Extension Won't Load
- Make sure you selected the `/home/user/UNews` folder
- Check that manifest.json exists in the folder
- Look for errors in chrome://extensions/

### Buttons Don't Work
- Open DevTools (F12) and check for errors
- Make sure you're on a regular web page (not chrome:// pages)
- Try refreshing the extension in chrome://extensions/

### No Console Logs
- Check that DevTools Console is open (F12)
- Make sure "All levels" filter is selected in Console
- Try visiting a new page

---

## Current Status

✅ Extension files created
✅ All files validated
✅ Pushed to branch: `claude/google-extension-web-connect-eLcNt`
✅ Ready to install and test

**Next Step:** Follow the installation steps above and test it in Chrome!
