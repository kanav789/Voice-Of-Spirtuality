import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Load the readable segments
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

# We'll also cross-reference with our window transcriptions:
# v10: 154.39 - 162.00 (Sanskrit), 162.00 - 178.00 (Hindi)
# v11: 178.00 - 186.00 (Sanskrit), 186.00 - 192.14 (Hindi)
# v25: 410.63 - 417.80 (Sanskrit), 417.80 - 426.80 (Hindi)
# v26: 426.80 - 435.30 (Sanskrit), 435.30 - 446.70 (Hindi)
# v27: 446.70 - 453.70 (Sanskrit), 453.70 - 462.30 (Hindi)
# v34: 573.00 - 581.70 (Sanskrit), 581.70 - 590.78 (Hindi)
# v35: 590.78 - 598.28 (Sanskrit), 598.28 - 607.00 (Hindi)
# v36: 607.00 - 615.78 (Sanskrit), 615.78 - 624.78 (Hindi)
# v37: 624.78 - 634.04 (Sanskrit), 634.04 - 643.70 (Hindi)
# v38: 643.70 - 650.10 (Sanskrit), 650.10 - 657.60 (Hindi)
# v39: 657.60 - 664.60 (Sanskrit), 664.60 - 674.10 (Hindi)
# v40: 674.10 - 680.60 (Sanskrit), 680.60 - 688.60 (Hindi)
# v41: 688.60 - 695.10 (Sanskrit), 695.10 - 705.80 (Hindi)
# v42: 705.80 - 711.00 (Sanskrit), 711.00 - 721.80 (Hindi)
# v43: 721.80 - 729.66 (Sanskrit), 729.66 - 736.54 (Hindi)
# v44: 736.54 - 743.30 (Sanskrit), 743.30 - 750.64 (Hindi)
# v45: 750.64 - 758.08 (Sanskrit), 758.08 - 768.71 (Hindi)
# v46: 768.71 - 775.74 (Sanskrit), 775.74 - 782.74 (Hindi)
# v47: 782.74 - 796.03 (Sanskrit), 796.03 - 805.88 (Hindi)

# Let's write a comprehensive inspection script to get exact Sanskrit end for all verses 1 to 24 and 28 to 33.
print("Analyzing Sanskrit and Hindi transitions for all verses...")
