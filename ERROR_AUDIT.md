# VISH BIRTHDAY - COMPLETE ERROR AUDIT

## 🔴 Critical Errors

1. **Broken Backup / Restore System**
   - **File:** `script.js`, `index.html` (Lines 268-273)
   - **Problem:** The `#exportBtn` and `#importBtn` buttons have no JavaScript event listeners attached to them. 
   - **Why it happens:** The HTML UI for backup/restore was built, but the backend functionality was completely omitted from the script.
   - **Recommended fix:** Implement `exportBtn.addEventListener('click', ...)` to serialize IndexedDB contents into a downloadable JSON file, and implement `importInput` change listener to parse and overwrite the database.

2. **Broken Background Customization System**
   - **File:** `script.js`, `index.html` (Lines 407-468)
   - **Problem:** The "Make Your World" panel opens, but the original/photo/gradient tabs, image upload (`#bgDrop`), and the CSS variable sliders (Brightness, Blur, etc.) have no logic.
   - **Why it happens:** The panel logic was stubbed out but never finished.
   - **Recommended fix:** Add listeners for the sliders to map values to CSS variables on `.bgphoto__img`. Implement FileReader for `#bgFile` to change the background image, and persist the choice in IndexedDB (`STORE_SETTINGS`).

3. **Broken Secret Letter Editing**
   - **File:** `script.js`, `index.html` (Lines 342-355)
   - **Problem:** The "Edit this letter", "Save", and "Cancel" buttons (`#letterEditBtn`, etc.) do nothing. 
   - **Why it happens:** Missing event listeners and state management for toggling between the display text (`#letterText`) and the textarea (`#letterEdit`).
   - **Recommended fix:** Implement the edit toggle logic, update the DOM, and save the edited letter to IndexedDB (`STORE_SETTINGS`).

4. **Broken Viewer Navigation (Memory World)**
   - **File:** `script.js`, `index.html` (Lines 474-486)
   - **Problem:** When viewing a memory in fullscreen, the Next (`#vNext`) and Previous (`#vPrev`) buttons do not work.
   - **Why it happens:** The event listeners for these buttons were never written.
   - **Recommended fix:** Store the array of memories in memory state, track the current index, and bind click listeners to the navigation arrows to cycle through the images.

5. **Firestore 1MB Document Limit Crash (Photo Upload)**
   - **File:** `script.js` (Line 395)
   - **Problem:** Saving raw Base64 data from `FileReader` directly to Firestore. High-res mobile photos easily exceed 5-10MB, which will crash the Firebase `add()` call (1MB limit).
   - **Why it happens:** The image isn't being compressed before conversion to Base64.
   - **Recommended fix:** Draw the image to a temporary HTML5 Canvas to scale it down (e.g., max 800px width) and output as a compressed JPEG before saving to LocalStorage and Firestore.

## 🟠 Major Errors

1. **Mobile Navigation Broken**
   - **File:** `index.html` (Lines 98-109), `style.css`, `script.js`
   - **Problem:** The hamburger menu (`#burger`) has no click listener, and `style.css` has no media queries to hide/show `.nav__links` on mobile. The nav bar just breaks horizontally on small screens.
   - **Why it happens:** Mobile responsive CSS and menu toggle logic were left out.
   - **Recommended fix:** Add `@media` queries to position `.nav__links` as a dropdown or side sheet on screens < 768px, and add a toggle listener in `script.js`.

2. **Missing Synthesized Audio Fallback (Web Audio API)**
   - **File:** `audio/README.txt`, `script.js`
   - **Problem:** The README promises a "soft built-in Happy Birthday that it generates itself" if the MP3 is missing, but `script.js` just logs "Audio blocked" and fails if the source is empty/invalid.
   - **Why it happens:** The fallback oscillator logic using `AudioContext` was never written.
   - **Recommended fix:** Implement a simple Web Audio API sequence to play the "Happy Birthday" melody if the `bgm` `<audio>` element encounters an error or has no source.

3. **Speech Synthesis Race Condition**
   - **File:** `script.js` (Line 301)
   - **Problem:** `voiceSynth.getVoices()` is called synchronously right before speaking. In some browsers (like Chrome), voices load asynchronously, so `voices` array might be empty on the first click.
   - **Why it happens:** Not waiting for the `onvoiceschanged` event.
   - **Recommended fix:** Preload voices using the `onvoiceschanged` event listener.

4. **Missing Voice Audio Fallback Handling**
   - **File:** `script.js` (Line 279)
   - **Problem:** `fallbackAudio.src = B.personalVoice;` points to `audio/vish-voice.mp3`. If this file doesn't exist, the audio element throws an error, but the script still tries to check `readyState >= 2` which might hang or cause unexpected behavior if not properly caught.
   - **Why it happens:** No error event listener on the `fallbackAudio` element.
   - **Recommended fix:** Listen for the `error` event on `fallbackAudio` and gracefully fallback to SpeechSynthesis.

5. **Cake Touch Interaction Issues**
   - **File:** `script.js` (Line 326)
   - **Problem:** The cake uses a standard `click` listener. On mobile devices, there's often a 300ms delay or it might feel unresponsive compared to a direct touch.
   - **Why it happens:** Using `click` instead of a faster pointer/touch event.
   - **Recommended fix:** Use `pointerdown` (or `touchstart`) for instantaneous reaction on mobile.

6. **Missing Smooth Scrolling Logic**
   - **File:** `script.js`
   - **Problem:** Links with `data-scroll` (e.g., `#home`, `#message`) just use native CSS scrolling, which doesn't account for the fixed navigation bar height, causing headers to be hidden under the nav.
   - **Why it happens:** No JS interception of anchor clicks.
   - **Recommended fix:** Add a click listener for `data-scroll` links that calculates the offset using `getBoundingClientRect().top` minus the header height.

## 🟡 Minor Errors

1. **Continuous Animation Frame CPU Drain**
   - **File:** `script.js` (Line 187)
   - **Problem:** `requestAnimationFrame(loop)` runs forever, even when the arrays `particles` and `rockets` are empty.
   - **Why it happens:** The loop has no exit condition.
   - **Recommended fix:** Only call `requestAnimationFrame` if `particles.length > 0 || rockets.length > 0`, and re-trigger it from the `launchFirework` or cake cut functions.

2. **Top Button Non-functional**
   - **File:** `script.js`, `index.html` (Line 400)
   - **Problem:** `#topBtn` doesn't do anything when clicked.
   - **Why it happens:** Missing event listener.
   - **Recommended fix:** Add `window.scrollTo({ top: 0, behavior: 'smooth' });`.

3. **Incomplete Form Reset / Hidden Cancel Button**
   - **File:** `script.js` (Line 263)
   - **Problem:** The `#cancelBtn` on the memory creation form is hidden and has no logic to cancel/reset a draft memory.
   - **Why it happens:** Incomplete CRUD logic for memories.
   - **Recommended fix:** Add a listener to clear the preview and form inputs.

4. **Missing Offline/Cloud Fallback UI**
   - **File:** `script.js` (Line 50)
   - **Problem:** When sharing to the creator fails, the error toast is generic. It doesn't explicitly reassure the user about offline mode.
   - **Why it happens:** Hardcoded toast messages.
   - **Recommended fix:** Improve offline detection using `navigator.onLine` and update toast messaging to be clearer.

## 🔵 Improvements

1. **Accessibility (A11y)**
   - **Problem:** Some interactive elements (`.interactive-cake`, `.envelope`) have `tabindex="0"` but lack `keydown` listeners (Enter/Space) for keyboard users.
   - **Recommended fix:** Add `keydown` event handlers to trigger the same actions as clicks for these elements.

2. **Reduced Motion Support**
   - **Problem:** CSS animations (fireworks, cake cut, scrolling) do not respect `prefers-reduced-motion`.
   - **Recommended fix:** Wrap intense CSS animations in a `@media (prefers-reduced-motion: no-preference)` block and disable the fireworks canvas rendering if reduced motion is requested.

3. **Music Preloading**
   - **Problem:** The background music is set to `preload="none"` and its `src` is only set when "Enter" is clicked, which might cause a noticeable delay before playback starts.
   - **Recommended fix:** Set the `src` early or use a Web Audio API buffer for instant playback.
