import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\transcription_raw.json', encoding='utf-8') as f:
    raw_segments = json.load(f)

with open(r'c:\Users\HP\Desktop\Voice of Spirituality\books\gita\chapter-01.json', encoding='utf-8') as f:
    chapter_data = json.load(f)

verses = chapter_data['verses']

# Save all raw segments with their full text to a readable text file
with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\segments_readable.txt', 'w', encoding='utf-8') as f:
    for s in raw_segments:
        f.write(f"[{s['start']:6.2f} - {s['end']:6.2f}] {s['text']}\n")

print(f"Written {len(raw_segments)} segments to segments_readable.txt")
