import os
import re

GUIDES_DIR = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides"

def cleanup_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    filename = os.path.basename(filepath)
    original_len = len(content)
    
    # Debug: print snippet if detecting-spoofed-gpu-bios
    if filename == "detecting-spoofed-gpu-bios.html":
        # Look for the debris anchor
        if "Integrity Hash" in content:
            print(f"Debug: Found anchor in {filename}")
        else:
             print(f"Debug: Anchor NOT found in {filename}")

    # Revised Pattern 1: Debris with more flexible start
    # The div style might be matched loosely
    pattern1 = re.compile(
        r'<div[^>]*>\s*<span[^>]*>\[INFO\]</span> Initializing hardware handshake.*?> End of Stream</div>\s*</div>',
        re.DOTALL
    )
    
    # Revised Pattern 2: 
    # The starting div might be: <div style="margin-bottom: 0.2rem;">
    # And there might be previous siblings?
    # Let's target the inner content specifically
    
    # Block start: <div style="margin-bottom: 0.2rem;"><span style="color: #0f0;">[PASS]</span> Integrity Hash:
    pattern2 = re.compile(
        r'(<div[^>]*>\s*<span[^>]*>\[PASS\]</span> Integrity Hash:.*?\[END_STREAM\] Verified by Dr. A. Thorne</div>\s*</div>\s*</div>)',
        re.DOTALL
    )
    
    match2 = pattern2.search(content)
    if match2:
        print(f"Match found in {filename} for Pattern 2")
        content = content.replace(match2.group(1), "") # clear it
    
    # Pattern 1 target
    match1 = pattern1.search(content)
    if match1:
        print(f"Match found in {filename} for Pattern 1")
        content = content.replace(match1.group(0), "")

    if len(content) < original_len:
        print(f"Cleaned {filename}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    print("Starting cleanup...")
    for filename in os.listdir(GUIDES_DIR):
        if filename.endswith(".html") and filename != "index.html":
            cleanup_file(os.path.join(GUIDES_DIR, filename))

if __name__ == "__main__":
    main()
