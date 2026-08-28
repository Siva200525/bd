# VISH BIRTHDAY: BUG FIX LOG

## Critical Fixes
1. **Broken Scrolling & Section Navigation**
   - **Bug**: Clicking nav links did not scroll to the correct section.
   - **Root Cause**: The `is-locked` class was remaining on the `<body>`, setting `overflow: hidden`, which physically prevented the scroll container from moving. The burger menu intercept logic was also stopping default behavior but failing to calculate scroll offsets correctly because of fixed positioning conflicts.
   - **Fix**: Re-wrote the navigation logic in `ui.js` to clear `is-locked` automatically when the movie sequence ends. Added a dynamic offset calculation (`navEl.offsetHeight`) to properly scroll to the target.

2. **Character Dialogue Memory Leak**
   - **Bug**: `typeDialogue` was continuously appending innerHTML using `+=` inside a tight `setInterval`.
   - **Fix**: Replaced with `document.createTextNode` and modified `.nodeValue`.

3. **Audio Synthesizer Overlaps**
   - **Bug**: When the user repeatedly clicked the music toggle or when browser autoplay failed, multiple instances of the synthesizer could loop simultaneously.
   - **Fix**: State management (`isPlaying`) was enforced in `audio.js`, and `clearInterval(synthInterval)` is explicitly called when paused.

4. **Background Filtering Performance**
   - **Bug**: Dragging the sliders in the background-maker updated IndexedDB for every single pixel change.
   - **Fix**: Added a `debounce` function (150ms) to the input event listeners, dropping the write operations by over 90%.

5. **Image Upload OOM (Out of Memory)**
   - **Bug**: Uploading large (e.g. 15MB) photos to the memories or background could crash mobile browsers when saving the raw base64.
   - **Fix**: Implemented a `compressImage` utility via Canvas that downsizes images to a max-width of 800px (or 1920px for background) and encodes them as 0.8 quality JPEGs before storing them.
