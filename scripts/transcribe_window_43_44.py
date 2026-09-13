import sys
import miniaudio
import numpy as np
from faster_whisper import WhisperModel
import wave

sys.stdout.reconfigure(encoding='utf-8')

def retranscribe_730_765():
    f = miniaudio.decode_file(r'c:\Users\HP\Desktop\Voice of Spirituality\audio\gita\chapter_1_audio.mp3')
    sr = f.sample_rate
    channels = f.nchannels
    samples = np.frombuffer(f.samples, dtype=np.int16)
    
    start_sec = 728.0
    end_sec = 765.0
    start_sample = int(start_sec * sr * channels)
    end_sample = int(end_sec * sr * channels)
    
    window_samples = samples[start_sample:end_sample]
    
    wav_path = r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\window_728_765.wav'
    with wave.open(wav_path, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(window_samples.tobytes())
        
    model = WhisperModel("base", device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        wav_path,
        beam_size=5,
        language="hi",
        temperature=0.0,
        repetition_penalty=1.2
    )
    
    for s in segments:
        abs_start = start_sec + s.start
        abs_end = start_sec + s.end
        print(f"[{abs_start:6.2f}s -> {abs_end:6.2f}s] {s.text.strip()}")

if __name__ == '__main__':
    retranscribe_730_765()
