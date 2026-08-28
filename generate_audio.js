const fs = require('fs');

// Audio Synthesis parameters
const SAMPLE_RATE = 44100;
const BPM = 80;
const BEAT = 60 / BPM; // seconds per quarter note
const NUM_CHANNELS = 2;

// Note frequencies (Hz)
const NOTES = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
};

// Arrangement of Happy Birthday (3/4 time signature)
const melody = [];
const chords = [];
const sparkles = [];

function addVerse(startBeatOffset, octaveOffset = 0, isSecondVerse = false) {
  const b = startBeatOffset;
  
  // Verse pickups (G4 G4)
  melody.push({ note: 'G4', beat: b + 1.5, dur: 0.7, vel: 0.75 });
  melody.push({ note: 'G4', beat: b + 2.25, dur: 0.65, vel: 0.8 });

  // Bar 2: A4 (1), G4 (1), C5 (1)
  melody.push({ note: 'A4', beat: b + 3, dur: 0.9, vel: 0.85 });
  melody.push({ note: 'G4', beat: b + 4, dur: 0.9, vel: 0.85 });
  melody.push({ note: 'C5', beat: b + 5, dur: 0.9, vel: 0.9 });
  chords.push({ notes: ['C3', 'G3', 'E4'], beat: b + 3, dur: 2.8, vel: 0.45 });

  // Bar 3: B4 (2), . (G4 G4)
  melody.push({ note: 'B4', beat: b + 6, dur: 1.8, vel: 0.85 });
  melody.push({ note: 'G4', beat: b + 7.5, dur: 0.7, vel: 0.75 });
  melody.push({ note: 'G4', beat: b + 8.25, dur: 0.65, vel: 0.8 });
  chords.push({ notes: ['G3', 'D4', 'B4'], beat: b + 6, dur: 2.8, vel: 0.45 });

  // Bar 4: A4 (1), G4 (1), D5 (1)
  melody.push({ note: 'A4', beat: b + 9, dur: 0.9, vel: 0.85 });
  melody.push({ note: 'G4', beat: b + 10, dur: 0.9, vel: 0.85 });
  melody.push({ note: 'D5', beat: b + 11, dur: 0.9, vel: 0.9 });
  chords.push({ notes: ['G3', 'D4', 'B4'], beat: b + 9, dur: 2.8, vel: 0.45 });

  // Bar 5: C5 (2), . (G4 G4)
  melody.push({ note: 'C5', beat: b + 12, dur: 1.8, vel: 0.85 });
  melody.push({ note: 'G4', beat: b + 13.5, dur: 0.7, vel: 0.75 });
  melody.push({ note: 'G4', beat: b + 14.25, dur: 0.65, vel: 0.8 });
  chords.push({ notes: ['C3', 'G3', 'E4'], beat: b + 12, dur: 2.8, vel: 0.45 });

  // Bar 6: G5 (1), E5 (1), C5 (1)
  melody.push({ note: 'G5', beat: b + 15, dur: 0.9, vel: 0.95 });
  melody.push({ note: 'E5', beat: b + 16, dur: 0.9, vel: 0.9 });
  melody.push({ note: 'C5', beat: b + 17, dur: 0.9, vel: 0.85 });
  chords.push({ notes: ['C3', 'E4', 'G4'], beat: b + 15, dur: 2.8, vel: 0.5 });

  // Bar 7: B4 (1), A4 (1), . (F5 F5)
  melody.push({ note: 'B4', beat: b + 18, dur: 0.9, vel: 0.85 });
  melody.push({ note: 'A4', beat: b + 19, dur: 1.2, vel: 0.85 });
  melody.push({ note: 'F5', beat: b + 19.5, dur: 0.7, vel: 0.8 });
  melody.push({ note: 'F5', beat: b + 20.25, dur: 0.65, vel: 0.85 });
  chords.push({ notes: ['F3', 'C4', 'A4'], beat: b + 18, dur: 2.8, vel: 0.5 });

  // Bar 8: E5 (1), C5 (1), D5 (1)
  melody.push({ note: 'E5', beat: b + 21, dur: 0.9, vel: 0.9 });
  melody.push({ note: 'C5', beat: b + 22, dur: 0.9, vel: 0.85 });
  melody.push({ note: 'D5', beat: b + 23, dur: 0.9, vel: 0.85 });
  chords.push({ notes: ['C3', 'G3', 'E4'], beat: b + 21, dur: 2.8, vel: 0.5 });

  // Bar 9: C5 (3) - resolved chord
  melody.push({ note: 'C5', beat: b + 24, dur: 2.8, vel: 0.95 });
  chords.push({ notes: ['C3', 'G3', 'C4', 'E4', 'G4'], beat: b + 24, dur: 3.5, vel: 0.55 });

  // Add decorative arpeggiated chimes on every bar
  for (let bar = 0; bar < 8; bar++) {
    const barBeat = b + 3 + bar * 3;
    sparkles.push({ note: 'C6', beat: barBeat + 0.5, dur: 0.5, vel: 0.3 });
    sparkles.push({ note: 'G5', beat: barBeat + 1.5, dur: 0.5, vel: 0.25 });
    sparkles.push({ note: 'E6', beat: barBeat + 2.5, dur: 0.5, vel: 0.28 });
  }
}

// Intro: 3 bars of ambient chimes
chords.push({ notes: ['C3', 'G3', 'E4'], beat: 0, dur: 3.0, vel: 0.35 });
sparkles.push({ note: 'C5', beat: 0.5, dur: 1.0, vel: 0.4 });
sparkles.push({ note: 'E5', beat: 1.5, dur: 1.0, vel: 0.4 });
sparkles.push({ note: 'G5', beat: 2.5, dur: 1.0, vel: 0.4 });

// Verse 1 (Music box solo + soft warm piano pad)
addVerse(0, 0, false);

// Verse 2 (Richer harmonies + sparkling celeste + counter-melody)
addVerse(27, 0, true);

// Outro (Lush slow resolution)
chords.push({ notes: ['F3', 'A3', 'C4', 'F4'], beat: 55, dur: 3.5, vel: 0.45 });
chords.push({ notes: ['G3', 'B3', 'D4', 'G4'], beat: 58, dur: 3.5, vel: 0.45 });
chords.push({ notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'], beat: 61, dur: 6.0, vel: 0.55 });
sparkles.push({ note: 'E6', beat: 61.5, dur: 2.0, vel: 0.35 });
sparkles.push({ note: 'G6', beat: 63.0, dur: 3.0, vel: 0.3 });
sparkles.push({ note: 'C6', beat: 64.5, dur: 4.0, vel: 0.25 });

const totalDurationBeats = 69;
const totalDurationSeconds = totalDurationBeats * BEAT;
const totalSamples = Math.ceil(totalDurationSeconds * SAMPLE_RATE);

const leftBuffer = new Float32Array(totalSamples);
const rightBuffer = new Float32Array(totalSamples);

// Music Box Synthesizer (Crystal Chimes + Bell Harmonics)
function synthMusicBox(freq, durationSec, velocity, startTimeSec, pan = 0) {
  const startSample = Math.floor(startTimeSec * SAMPLE_RATE);
  const numSamples = Math.floor((durationSec + 1.8) * SAMPLE_RATE);
  
  for (let i = 0; i < numSamples && (startSample + i) < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 3.2) * (1 - Math.exp(-t * 200));
    
    const s1 = Math.sin(2 * Math.PI * freq * t);
    const s2 = 0.4 * Math.sin(2 * Math.PI * (freq * 2.001) * t) * Math.exp(-t * 4.0);
    const s3 = 0.25 * Math.sin(2 * Math.PI * (freq * 3.0) * t) * Math.exp(-t * 6.0);
    const s4 = 0.15 * Math.sin(2 * Math.PI * (freq * 4.07) * t) * Math.exp(-t * 8.0);
    const s5 = 0.1 * Math.sin(2 * Math.PI * (freq * 5.4) * t) * Math.exp(-t * 10.0);
    
    const sample = (s1 + s2 + s3 + s4 + s5) * env * velocity * 0.32;
    
    const leftGain = Math.cos((pan + 1) * Math.PI / 4);
    const rightGain = Math.sin((pan + 1) * Math.PI / 4);
    
    leftBuffer[startSample + i] += sample * leftGain;
    rightBuffer[startSample + i] += sample * rightGain;
  }
}

// Warm Electric Piano / Pad Synthesizer (Deep warm acoustic body)
function synthWarmPad(freq, durationSec, velocity, startTimeSec, pan = 0) {
  const startSample = Math.floor(startTimeSec * SAMPLE_RATE);
  const numSamples = Math.floor((durationSec + 1.5) * SAMPLE_RATE);
  
  for (let i = 0; i < numSamples && (startSample + i) < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const attack = Math.min(1, t * 15);
    const env = attack * Math.exp(-t * (1.2 / durationSec));
    
    const s1 = Math.sin(2 * Math.PI * freq * t);
    const s2 = 0.35 * Math.sin(2 * Math.PI * (freq * 2) * t);
    const s3 = 0.15 * Math.sin(2 * Math.PI * (freq * 3) * t);
    const chorus = 0.1 * Math.sin(2 * Math.PI * (freq * 1.002) * t);
    
    const sample = (s1 + s2 + s3 + chorus) * env * velocity * 0.22;
    
    const leftGain = Math.cos((pan + 1) * Math.PI / 4);
    const rightGain = Math.sin((pan + 1) * Math.PI / 4);
    
    leftBuffer[startSample + i] += sample * leftGain;
    rightBuffer[startSample + i] += sample * rightGain;
  }
}

// Render all tracks
chords.forEach(c => {
  const startTime = c.beat * BEAT;
  const durTime = c.dur * BEAT;
  c.notes.forEach((noteName, idx) => {
    const freq = NOTES[noteName];
    if (freq) {
      synthWarmPad(freq, durTime, c.vel, startTime + idx * 0.04, (idx % 2 === 0 ? -0.2 : 0.2));
    }
  });
});

melody.forEach(m => {
  const startTime = m.beat * BEAT;
  const durTime = m.dur * BEAT;
  const freq = NOTES[m.note];
  if (freq) {
    synthMusicBox(freq, durTime, m.vel, startTime, 0.05);
    synthWarmPad(freq, durTime, m.vel * 0.4, startTime, -0.05);
  }
});

sparkles.forEach(s => {
  const startTime = s.beat * BEAT;
  const durTime = s.dur * BEAT;
  const freq = NOTES[s.note];
  if (freq) {
    synthMusicBox(freq, durTime, s.vel, startTime, (Math.random() * 0.8 - 0.4));
  }
});

// Delay / Reverb effect
const delaySamples = Math.floor(0.24 * SAMPLE_RATE);
const delayFeedback = 0.35;
for (let i = delaySamples; i < totalSamples; i++) {
  leftBuffer[i] += rightBuffer[i - delaySamples] * delayFeedback;
  rightBuffer[i] += leftBuffer[i - delaySamples] * delayFeedback;
}

// Normalize
let peak = 0;
for (let i = 0; i < totalSamples; i++) {
  peak = Math.max(peak, Math.abs(leftBuffer[i]), Math.abs(rightBuffer[i]));
}
const gain = peak > 0 ? (0.92 / peak) : 1;

const wavBuffer = Buffer.alloc(44 + totalSamples * 4);
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + totalSamples * 4, 4);
wavBuffer.write('WAVE', 8);
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16);
wavBuffer.writeUInt16LE(1, 20);
wavBuffer.writeUInt16LE(NUM_CHANNELS, 22);
wavBuffer.writeUInt32LE(SAMPLE_RATE, 24);
wavBuffer.writeUInt32LE(SAMPLE_RATE * NUM_CHANNELS * 2, 28);
wavBuffer.writeUInt16LE(NUM_CHANNELS * 2, 32);
wavBuffer.writeUInt16LE(16, 34);
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(totalSamples * 4, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const l = Math.max(-1, Math.min(1, leftBuffer[i] * gain));
  const r = Math.max(-1, Math.min(1, rightBuffer[i] * gain));
  
  const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
  const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);
  
  wavBuffer.writeInt16LE(intL, offset);
  wavBuffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

fs.writeFileSync('d:/vish-birthday/audio/birthday.mp3', wavBuffer);
fs.writeFileSync('d:/vish-birthday/audio/birthday.wav', wavBuffer);
console.log('Audio files generated successfully! Duration:', totalDurationSeconds.toFixed(1), 'seconds.');
