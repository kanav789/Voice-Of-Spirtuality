import miniaudio
import numpy as np
import scipy.signal

def analyze_audio(file_path):
    print(f"Decoding {file_path}...")
    f = miniaudio.decode_file(file_path)
    sample_rate = f.sample_rate
    channels = f.nchannels
    
    # Convert to mono float32
    raw = np.frombuffer(f.samples, dtype=np.int16).astype(np.float32) / 32768.0
    if channels > 1:
        raw = raw.reshape(-1, channels).mean(axis=1)
    
    duration = len(raw) / sample_rate
    print(f"Sample rate: {sample_rate} Hz, duration: {duration:.2f} s")
    
    # Window size: 50ms
    win_size = int(0.05 * sample_rate)
    hop_size = int(0.025 * sample_rate) # 25ms hop
    
    num_frames = (len(raw) - win_size) // hop_size
    rms = np.zeros(num_frames)
    
    for i in range(num_frames):
        start = i * hop_size
        frame = raw[start:start + win_size]
        rms[i] = np.sqrt(np.mean(frame**2))
    
    # Smooth RMS
    b, a = scipy.signal.butter(2, 0.05)
    rms_smooth = scipy.signal.filtfilt(b, a, rms)
    
    # Threshold for silence: e.g. 5% of median speech RMS or percentile
    speech_threshold = np.percentile(rms_smooth, 70) * 0.12
    silence_threshold = speech_threshold * 0.5
    
    print(f"Max RMS: {np.max(rms_smooth):.4f}, 70th percentile: {np.percentile(rms_smooth, 70):.4f}, silence threshold: {silence_threshold:.4f}")
    
    # Find silence intervals (where RMS < silence_threshold for >= 0.4s)
    min_silence_frames = int(0.4 / (hop_size / sample_rate))
    
    is_silent = rms_smooth < silence_threshold
    
    silence_intervals = []
    in_silence = False
    silence_start = 0
    
    for i, s in enumerate(is_silent):
        if s and not in_silence:
            in_silence = True
            silence_start = i
        elif not s and in_silence:
            in_silence = False
            if (i - silence_start) >= min_silence_frames:
                t_start = silence_start * hop_size / sample_rate
                t_end = i * hop_size / sample_rate
                silence_intervals.append((t_start, t_end, t_end - t_start))
    
    print(f"Found {len(silence_intervals)} silence intervals (duration >= 0.4s)")
    print("First 20 silence intervals (start, end, duration):")
    for start, end, dur in silence_intervals[:20]:
        print(f"  {start:6.2f}s - {end:6.2f}s (dur: {dur:.2f}s)")
        
    return silence_intervals

if __name__ == '__main__':
    analyze_audio(r'c:\Users\HP\Desktop\Voice of Spirituality\audio\gita\chapter_1_audio.mp3')
