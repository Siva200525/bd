Birthday (Master Build) 💜

This is the fully customized, cinematic, and interactive birthday experience built for Vish.

## How to Set It Up

1. **Add Music**: Place a `birthday.mp3` inside the `audio/` folder.
2. **Add Voice**: Place a `vish-voice.mp3` inside the `audio/` folder (optional fallback if browser speech synthesis isn't preferred).
3. **Configure**: Open `script.js` and edit the `birthdayConfig` block at the top if you want to change names or default text.

## How to Test

You do **not** need a local server to run the main birthday experience. 
Simply double-click `index.html` to open it in your browser (`file:///.../index.html`).

## Cloud Sharing & Creator Dashboard

This project includes an optional real-time cloud sharing feature using **Firebase**.

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a Web App to the project.
4. Copy the `firebaseConfig` object they provide.

### 2. Enable Firestore
1. In the Firebase console, go to **Firestore Database** and create a database.
2. Start in **Test Mode** (or configure secure rules).
3. Create two collections: `memories` and `wishes`.

### 3. Connect the Code
1. Open `script.js` and paste your config into `birthdayConfig.firebaseConfig` (around line 17).
2. Open `dashboard.html` and paste the identical config in the `<script>` block (around line 46).

### 4. Use the Dashboard
Double-click `dashboard.html` to open your private dashboard. When Vish clicks "Share with Creator" or enables "Live Sharing" on her page, you will see the updates appear here in real-time.

## Offline Resilience & File System

This project was specifically audited and refactored to work completely flawlessly over the `file://` protocol. 
If internet access drops or Firebase is not configured, the site will **not** break. 

- **Local Storage System:** All memories, backgrounds, wishes, and edited letters are saved locally using IndexedDB.
- **Audio Fallbacks:** If the mp3 files are missing, the app uses a built-in Web Audio API synthesizer to gently play "Happy Birthday" so it's never completely silent.
- **Voice Fallbacks:** If the audio file fails, the app degrades gracefully to the browser's built-in `SpeechSynthesis` API.
- **Backup & Restore:** Use the built-in backup and restore features on the Memory page to export all states as a JSON file and store it safely on a USB drive or cloud.
- **Storage Limits Avoided:** Any large photos uploaded are locally downscaled via HTML5 Canvas (max 800px) and converted to optimized JPEGs, ensuring they easily fit in Firebase and local storage limits without crashing.
