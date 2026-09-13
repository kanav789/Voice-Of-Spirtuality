import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\segments_readable.txt', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

for line in lines:
    m = line[1:].split('] ')
    times = m[0].split(' - ')
    start = float(times[0].strip())
    if 500.0 <= start <= 645.0:
        print(line)
