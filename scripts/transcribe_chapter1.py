import sys
import json
from faster_whisper import WhisperModel

# Reconfigure stdout for utf-8 on Windows
sys.stdout.reconfigure(encoding='utf-8')

def transcribe():
    audio_path = r'c:\Users\HP\Desktop\Voice of Spirituality\audio\gita\chapter_1_audio.mp3'
    print("Loading faster-whisper model (base)...")
    model = WhisperModel("base", device="cpu", compute_type="int8")
    
    print("Transcribing audio...")
    segments, info = model.transcribe(
        audio_path,
        beam_size=5,
        language="hi",
        task="transcribe",
        vad_filter=True, # enables voice activity filter
        vad_parameters=dict(min_silence_duration_ms=400)
    )
    
    print(f"Detected language '{info.language}' with probability {info.language_probability:.2f}")
    
    results = []
    for i, segment in enumerate(segments):
        txt = segment.text.strip()
        print(f"[{segment.start:6.2f}s -> {segment.end:6.2f}s] {txt}")
        results.append({
            "index": i + 1,
            "start": round(segment.start, 2),
            "end": round(segment.end, 2),
            "text": txt
        })
        
    out_file = r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\transcription_raw.json'
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"Done! Saved {len(results)} segments to {out_file}")

if __name__ == '__main__':
    transcribe()
