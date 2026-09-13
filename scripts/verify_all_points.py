import sys
import miniaudio
import numpy as np
import scipy.signal

sys.stdout.reconfigure(encoding='utf-8')

# Decode the entire MP3 file
print("Decoding MP3 for acoustic analysis...")
f = miniaudio.decode_file(r'c:\Users\HP\Desktop\Voice of Spirituality\audio\gita\chapter_1_audio.mp3')
sr = f.sample_rate
channels = f.nchannels

raw = np.frombuffer(f.samples, dtype=np.int16).astype(np.float32) / 32768.0
if channels > 1:
    raw = raw.reshape(-1, channels).mean(axis=1)

duration = len(raw) / sr
print(f"Loaded: {duration:.3f} s, {sr} Hz")

# Compute fine-grained RMS envelope (5ms step, 10ms window)
win_size = int(0.010 * sr)
hop_size = int(0.005 * sr)
num_frames = (len(raw) - win_size) // hop_size
rms = np.zeros(num_frames)

for i in range(num_frames):
    st = i * hop_size
    rms[i] = np.sqrt(np.mean(raw[st:st + win_size]**2))

# Smooth slightly with 30ms window filter
b, a = scipy.signal.butter(2, 0.05)
rms_smooth = scipy.signal.filtfilt(b, a, rms)

noise_floor = np.percentile(rms_smooth, 10)
speech_thresh = noise_floor + 0.006
print(f"Noise floor: {noise_floor:.5f}, Speech threshold: {speech_thresh:.5f}")

def frame_to_time(f_idx):
    return f_idx * hop_size / sr

def time_to_frame(t):
    return int(t * sr / hop_size)

def analyze_boundary(t_approx, label=""):
    """Finds exact silence valley and voice onset around t_approx"""
    f_center = time_to_frame(t_approx)
    w = time_to_frame(1.5) # search +/- 1.5s
    f_min = max(0, f_center - w)
    f_max = min(num_frames, f_center + w)
    
    # Deepest silence frame in window
    f_valley = f_min + np.argmin(rms_smooth[f_min:f_max])
    t_valley = frame_to_time(f_valley)
    
    # Voice offset before valley (where speech drops below thresh)
    f_offset = f_valley
    while f_offset > f_min and rms_smooth[f_offset] < speech_thresh:
        f_offset -= 1
    t_offset = frame_to_time(f_offset)
    
    # Voice onset after valley (where speech rises above thresh)
    f_onset = f_valley
    while f_onset < f_max and rms_smooth[f_onset] < speech_thresh:
        f_onset += 1
    t_onset = frame_to_time(f_onset)
    
    return {
        "approx": t_approx,
        "offset": round(t_offset, 2),
        "valley": round(t_valley, 2),
        "onset": round(t_onset, 2),
        "pause_duration": round(t_onset - t_offset, 2)
    }

# Test the candidate boundaries
print("\n--- Boundary Acoustic Verification ---")
check_points = [
    (2.88, "Verse 1 Sanskrit start (after title)"),
    (11.88, "Verse 1 Sanskrit end / Hindi start"),
    (21.46, "Verse 1 end / Verse 2 Sanskrit start"),
    (31.07, "Verse 2 Sanskrit end / Hindi start"),
    (37.21, "Verse 2 end / Verse 3 Sanskrit start"),
    (43.89, "Verse 3 Sanskrit end / Hindi start"),
    (53.85, "Verse 3 end / Verse 4 Sanskrit start"),
    (61.24, "Verse 4 Sanskrit end / Hindi start"),
    (72.18, "Verse 4 end / Verse 5 Sanskrit start"),
    (79.18, "Verse 5 Sanskrit end / Hindi start"),
    (88.00, "Verse 5 end / Verse 6 Sanskrit start"),
    (94.94, "Verse 6 Sanskrit end / Hindi start"),
    (104.17, "Verse 6 end / Verse 7 Sanskrit start"),
    (113.37, "Verse 7 Sanskrit end / Hindi start"),
    (123.05, "Verse 7 end / Verse 8 Sanskrit start"),
    (130.01, "Verse 8 Sanskrit end / Hindi start"),
    (138.39, "Verse 8 end / Verse 9 Sanskrit start"),
    (145.39, "Verse 9 Sanskrit end / Hindi start"),
    (154.39, "Verse 9 end / Verse 10 Sanskrit start"),
    (162.00, "Verse 10 Sanskrit end / Hindi start"),
    (178.00, "Verse 10 end / Verse 11 Sanskrit start"),
    (186.00, "Verse 11 Sanskrit end / Hindi start"),
    (192.14, "Verse 11 end / Verse 12 Sanskrit start"),
    (200.14, "Verse 12 Sanskrit end / Hindi start"),
    (211.31, "Verse 12 end / Verse 13 Sanskrit start"),
    (220.25, "Verse 13 Sanskrit end / Hindi start"),
    (228.65, "Verse 13 end / Verse 14 Sanskrit start"),
    (236.65, "Verse 14 Sanskrit end / Hindi start"),
    (246.05, "Verse 14 end / Verse 15 Sanskrit start"),
    (253.05, "Verse 15 Sanskrit end / Hindi start"),
    (263.12, "Verse 15 end / Verse 16 Sanskrit start"),
    (269.12, "Verse 16 Sanskrit end / Hindi start"),
    (279.12, "Verse 16 end / Verse 17 Sanskrit start"),
    (287.12, "Verse 17 Sanskrit end / Hindi start"),
    (297.12, "Verse 17 end / Verse 18 Sanskrit start"),
    (305.12, "Verse 18 Sanskrit end / Hindi start"),
    (315.12, "Verse 18 end / Verse 19 Sanskrit start"),
    (323.12, "Verse 19 Sanskrit end / Hindi start"),
    (330.12, "Verse 19 end / Verse 20 Sanskrit start"),
    (338.12, "Verse 20 Sanskrit end / Hindi start"),
    (351.12, "Verse 20 end / Verse 21 Sanskrit start"),
    (359.12, "Verse 21 Sanskrit end / Hindi start"),
    (365.24, "Verse 21 end / Verse 22 Sanskrit start"),
    (371.24, "Verse 22 Sanskrit end / Hindi start"),
    (378.24, "Verse 22 end / Verse 23 Sanskrit start"),
    (385.24, "Verse 23 Sanskrit end / Hindi start"),
    (395.63, "Verse 23 end / Verse 24 Sanskrit start"),
    (401.63, "Verse 24 Sanskrit end / Hindi start"),
    (410.63, "Verse 24 end / Verse 25 Sanskrit start"),
    (417.80, "Verse 25 Sanskrit end / Hindi start"),
    (426.80, "Verse 25 end / Verse 26 Sanskrit start"),
    (435.30, "Verse 26 Sanskrit end / Hindi start"),
    (446.70, "Verse 26 end / Verse 27 Sanskrit start"),
    (453.70, "Verse 27 Sanskrit end / Hindi start"),
    (462.30, "Verse 27 end / Verse 28 Sanskrit start"),
    (472.98, "Verse 28 Sanskrit end / Hindi start"),
    (485.98, "Verse 28 end / Verse 29 Sanskrit start"),
    (492.98, "Verse 29 Sanskrit end / Hindi start"),
    (507.98, "Verse 29 end / Verse 30 Sanskrit start"),
    (514.98, "Verse 30 Sanskrit end / Hindi start"),
    (522.98, "Verse 30 end / Verse 31 Sanskrit start"),
    (529.98, "Verse 31 Sanskrit end / Hindi start"),
    (536.98, "Verse 31 end / Verse 32 Sanskrit start"),
    (544.98, "Verse 32 Sanskrit end / Hindi start"),
    (554.98, "Verse 32 end / Verse 33 Sanskrit start"),
    (564.98, "Verse 33 Sanskrit end / Hindi start"),
    (573.98, "Verse 33 end / Verse 34 Sanskrit start"),
    (581.70, "Verse 34 Sanskrit end / Hindi start"),
    (590.78, "Verse 34 end / Verse 35 Sanskrit start"),
    (598.28, "Verse 35 Sanskrit end / Hindi start"),
    (607.00, "Verse 35 end / Verse 36 Sanskrit start"),
    (615.78, "Verse 36 Sanskrit end / Hindi start"),
    (624.78, "Verse 36 end / Verse 37 Sanskrit start"),
    (634.04, "Verse 37 Sanskrit end / Hindi start"),
    (643.70, "Verse 37 end / Verse 38 Sanskrit start"),
    (650.10, "Verse 38 Sanskrit end / Hindi start"),
    (657.60, "Verse 38 end / Verse 39 Sanskrit start"),
    (664.60, "Verse 39 Sanskrit end / Hindi start"),
    (674.10, "Verse 39 end / Verse 40 Sanskrit start"),
    (680.60, "Verse 40 Sanskrit end / Hindi start"),
    (688.60, "Verse 40 end / Verse 41 Sanskrit start"),
    (695.10, "Verse 41 Sanskrit end / Hindi start"),
    (705.80, "Verse 41 end / Verse 42 Sanskrit start"),
    (711.00, "Verse 42 Sanskrit end / Hindi start"),
    (721.80, "Verse 42 end / Verse 43 Sanskrit start"),
    (729.66, "Verse 43 Sanskrit end / Hindi start"),
    (736.54, "Verse 43 end / Verse 44 Sanskrit start"),
    (743.30, "Verse 44 Sanskrit end / Hindi start"),
    (750.64, "Verse 44 end / Verse 45 Sanskrit start"),
    (758.08, "Verse 45 Sanskrit end / Hindi start"),
    (768.71, "Verse 45 end / Verse 46 Sanskrit start"),
    (775.74, "Verse 46 Sanskrit end / Hindi start"),
    (782.74, "Verse 46 end / Verse 47 Sanskrit start"),
    (796.03, "Verse 47 Sanskrit end / Hindi start"),
    (805.88, "Verse 47 end")
]

results = []
for pt, desc in check_points:
    r = analyze_boundary(pt, desc)
    results.append((pt, desc, r))
    print(f"[{pt:6.2f}s] {desc:<42} -> Offset: {r['offset']:6.2f}s | Silence Valley: {r['valley']:6.2f}s | Onset: {r['onset']:6.2f}s (Pause: {r['pause_duration']}s)")

with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\acoustic_validation_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
