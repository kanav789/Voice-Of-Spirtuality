import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Load the raw segments
with open(r'c:\Users\HP\Desktop\Voice of Spirituality\scripts\transcription_raw.json', encoding='utf-8') as f:
    raw_segments = json.load(f)

# Load window retranscription for 635s - 735s
# We know exact timestamps:
# Verse 37: 643.70 to 657.10
# Verse 38: 657.60 to 673.36
# Verse 39: 674.10 to 688.00
# Verse 40: 688.60 to 705.30
# Verse 41: 705.80 to 721.10
# Verse 42: 721.80 to 736.40
# Verse 43: 736.54 to 750.64
# Verse 44: 750.64 to 768.71
# Verse 45: 768.71 to 782.74
# Verse 46: 782.74 to 805.88 (Verse 46 is final verse or 46 & 47? Let's check 46 and 47!)

# Let's inspect 780s to 805.88s carefully:
# In chapter-01.json:
# Verse 46: यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः...
# Verse 47: सञ्जय उवाच एवमुक्त्वाऽर्जुनः संख्ये रथोपस्थ उपाविशत्। विसृज्य सशरं चापं शोकसंविग्नमानसः...
