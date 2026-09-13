import sys
import miniaudio
import numpy as np
import scipy.signal

sys.stdout.reconfigure(encoding='utf-8')

# Decode the entire MP3 file into raw audio
f = miniaudio.decode_file(r'c:\Users\HP\Desktop\Voice of Spirituality\audio\gita\chapter_1_audio.mp3')
sr = f.sample_rate
channels = f.nchannels

raw = np.frombuffer(f.samples, dtype=np.int16).astype(np.float32) / 32768.0
if channels > 1:
    raw = raw.reshape(-1, channels).mean(axis=1)

duration = len(raw) / sr
print(f"Loaded audio: {duration:.3f} seconds, sample rate {sr} Hz")

# Compute fine-grained energy envelope: 10ms window, 5ms step
win_size = int(0.010 * sr)  # 10ms
hop_size = int(0.005 * sr)  # 5ms
num_frames = (len(raw) - win_size) // hop_size
rms = np.zeros(num_frames)

for i in range(num_frames):
    st = i * hop_size
    rms[i] = np.sqrt(np.mean(raw[st:st + win_size]**2))

# Smooth slightly (15ms window)
b, a = scipy.signal.butter(2, 0.1)
rms_smooth = scipy.signal.filtfilt(b, a, rms)

# Noise floor
noise_floor = np.percentile(rms_smooth, 10)
speech_thresh = noise_floor + 0.008

print(f"Noise floor: {noise_floor:.5f}, Speech threshold: {speech_thresh:.5f}")

def frame_to_time(f_idx):
    return f_idx * hop_size / sr

def time_to_frame(t):
    return int(t * sr / hop_size)

def find_speech_onset(t_approx, search_window=2.0):
    # Search for voice onset (rms rises above speech_thresh) near t_approx
    f_center = time_to_frame(t_approx)
    f_start = max(0, f_center - time_to_frame(search_window))
    f_end = min(num_frames, f_center + time_to_frame(search_window))
    
    # Find local minimum (deepest silence) before speech rise
    silence_idx = f_start + np.argmin(rms_smooth[f_start:f_center])
    
    # Find onset where rms crosses speech_thresh after silence
    for i in range(silence_idx, f_end):
        if rms_smooth[i] >= speech_thresh:
            return round(frame_to_time(i), 2)
    return round(t_approx, 2)

def find_speech_offset(t_approx, search_window=2.0):
    # Search for voice offset (rms drops below speech_thresh) near t_approx
    f_center = time_to_frame(t_approx)
    f_start = max(0, f_center - time_to_frame(search_window))
    f_end = min(num_frames, f_center + time_to_frame(search_window))
    
    # Trace backward from f_end to find where speech was still active, or forward from f_center
    for i in range(f_center, f_end):
        if rms_smooth[i] < speech_thresh and np.all(rms_smooth[i:min(i+30, f_end)] < speech_thresh):
            return round(frame_to_time(i), 2)
    return round(t_approx, 2)

print("Waveform energy analyzer ready.")
