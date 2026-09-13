import json
import re

# Load raw transcription
with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\transcription_raw.json', encoding='utf-8') as f:
    raw_segments = json.load(f)

# Load chapter 1 json
with open(r'c:\Users\HP\Desktop\Voice of Spirituality\books\gita\chapter-01.json', encoding='utf-8') as f:
    chapter_data = json.load(f)

verses = chapter_data['verses']
print(f"Total verses: {len(verses)}")

# Print first 25 segments
print("--- Raw Segments Sample ---")
for s in raw_segments[:25]:
    print(f"[{s['start']:6.2f} - {s['end']:6.2f}] {s['text']}")
