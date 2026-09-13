import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\segments_readable.txt', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

segments = []
for line in lines:
    m = line[1:].split('] ')
    times = m[0].split(' - ')
    start = float(times[0].strip())
    end = float(times[1].strip())
    text = m[1].strip()
    segments.append((start, end, text))

# Let's inspect segments 0 to 60
print("--- Segments 0 to 60 ---")
for i, (s, e, txt) in enumerate(segments[:60]):
    print(f"[{i:2d}] {s:6.2f} - {e:6.2f} : {txt}")
