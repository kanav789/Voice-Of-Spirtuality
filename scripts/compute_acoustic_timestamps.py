import sys
import json
import miniaudio
import numpy as np
import scipy.signal

sys.stdout.reconfigure(encoding='utf-8')

f = miniaudio.decode_file(r'c:\Users\HP\Desktop\Voice of Spirituality\audio\gita\chapter_1_audio.mp3')
sr = f.sample_rate
channels = f.nchannels

raw = np.frombuffer(f.samples, dtype=np.int16).astype(np.float32) / 32768.0
if channels > 1:
    raw = raw.reshape(-1, channels).mean(axis=1)

win_size = int(0.010 * sr)
hop_size = int(0.005 * sr)
num_frames = (len(raw) - win_size) // hop_size
rms = np.zeros(num_frames)

for i in range(num_frames):
    st = i * hop_size
    rms[i] = np.sqrt(np.mean(raw[st:st + win_size]**2))

b, a = scipy.signal.butter(2, 0.05)
rms_smooth = scipy.signal.filtfilt(b, a, rms)

noise_floor = np.percentile(rms_smooth, 10)
speech_thresh = noise_floor + 0.006

def frame_to_time(f_idx):
    return f_idx * hop_size / sr

def time_to_frame(t):
    return int(t * sr / hop_size)

def analyze_boundary(t_approx):
    f_center = time_to_frame(t_approx)
    w = time_to_frame(1.5)
    f_min = max(0, f_center - w)
    f_max = min(num_frames, f_center + w)
    
    f_valley = f_min + np.argmin(rms_smooth[f_min:f_max])
    t_valley = frame_to_time(f_valley)
    
    f_offset = f_valley
    while f_offset > f_min and rms_smooth[f_offset] < speech_thresh:
        f_offset -= 1
    t_offset = frame_to_time(f_offset)
    
    f_onset = f_valley
    while f_onset < f_max and rms_smooth[f_onset] < speech_thresh:
        f_onset += 1
    t_onset = frame_to_time(f_onset)
    
    return {
        "offset": round(t_offset, 2),
        "valley": round(t_valley, 2),
        "onset": round(t_onset, 2),
        "pause": round(t_onset - t_offset, 2)
    }

# 47 verses exact points
# (verse_num, sanskrit_start_approx, sanskrit_end_approx, verse_end_approx)
raw_verse_points = [
    (1, 2.88, 11.88, 21.46),
    (2, 21.46, 31.07, 37.21),
    (3, 37.21, 43.89, 53.85),
    (4, 53.85, 61.24, 72.18),
    (5, 72.18, 79.18, 88.00),
    (6, 88.00, 94.94, 104.17),
    (7, 104.17, 113.37, 123.05),
    (8, 123.05, 130.01, 138.39),
    (9, 138.39, 145.39, 154.39),
    (10, 154.39, 162.00, 178.00),
    (11, 178.00, 186.00, 192.14),
    (12, 192.14, 200.14, 211.31),
    (13, 211.31, 220.25, 228.65),
    (14, 228.65, 236.65, 246.05),
    (15, 246.05, 253.05, 263.12),
    (16, 263.12, 269.12, 279.12),
    (17, 279.12, 287.12, 297.12),
    (18, 297.12, 305.12, 315.12),
    (19, 315.12, 323.12, 330.12),
    (20, 330.12, 338.12, 351.12),
    (21, 351.12, 359.12, 365.24),
    (22, 365.24, 371.24, 378.24),
    (23, 378.24, 385.24, 395.63),
    (24, 395.63, 401.63, 410.63),
    (25, 410.63, 417.80, 426.80),
    (26, 426.80, 435.30, 446.70),
    (27, 446.70, 453.70, 462.30),
    (28, 462.30, 472.98, 485.98),
    (29, 485.98, 492.98, 507.98),
    (30, 507.98, 514.98, 522.98),
    (31, 522.98, 529.98, 536.98),
    (32, 536.98, 544.98, 554.98),
    (33, 554.98, 564.98, 573.98),
    (34, 573.98, 581.70, 590.78),
    (35, 590.78, 598.28, 607.00),
    (36, 607.00, 615.78, 624.78),
    (37, 624.78, 634.04, 643.70),
    (38, 643.70, 650.10, 657.60),
    (39, 657.60, 664.60, 674.10),
    (40, 674.10, 680.60, 688.60),
    (41, 688.60, 695.10, 705.80),
    (42, 705.80, 711.00, 721.80),
    (43, 721.80, 729.66, 736.54),
    (44, 736.54, 743.30, 750.64),
    (45, 750.64, 758.08, 768.71),
    (46, 768.71, 775.74, 782.74),
    (47, 782.74, 796.03, 805.88),
]

final_table = []
for v, s_st, s_ed, v_ed in raw_verse_points:
    r_st = analyze_boundary(s_st)
    r_mid = analyze_boundary(s_ed)
    r_end = analyze_boundary(v_ed)
    
    # Sanskrit start is the actual voice onset of the Sanskrit shloka
    sanskrit_start = r_st["onset"]
    # Sanskrit end is the voice offset of the Sanskrit shloka (before Hindi begins)
    sanskrit_end = r_mid["offset"]
    # Verse end is the voice offset of the Hindi explanation (before next verse onset)
    verse_end = r_end["offset"] if v < 47 else 805.88
    
    final_table.append({
        "verse": v,
        "sanskritStart": sanskrit_start,
        "sanskritEnd": sanskrit_end,
        "verseEnd": verse_end,
        "pauseAfterSanskrit": r_mid["pause"],
        "pauseAfterVerse": r_end["pause"]
    })

with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\final_verified_timestamps.json', 'w', encoding='utf-8') as out:
    json.dump(final_table, out, indent=2)

print("Saved final_verified_timestamps.json!")
for item in final_table:
    print(f"Verse {item['verse']:2d}: Sanskrit [{item['sanskritStart']:6.2f} - {item['sanskritEnd']:6.2f}] | VerseEnd: {item['verseEnd']:6.2f} (Gap to next: {item['pauseAfterVerse']:.2f}s)")
