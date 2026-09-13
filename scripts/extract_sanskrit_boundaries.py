import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Load the raw segments
with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\transcription_raw.json', encoding='utf-8') as f:
    raw = json.load(f)

print(f"Total raw segments: {len(raw)}")

# Load chapter 1 json
with open(r'c:\Users\HP\Desktop\Voice of Spirituality\books\gita\chapter-01.json', encoding='utf-8') as f:
    gita = json.load(f)

verses = gita['verses']
print(f"Loaded {len(verses)} verses from chapter-01.json")
