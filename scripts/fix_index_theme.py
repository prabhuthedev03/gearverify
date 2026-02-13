import re
import os

# Also update index.html and guides/index.html
files_to_fix = [
    "index.html",
    "guides/index.html"
]

base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"

for filename in files_to_fix:
    filepath = os.path.join(base_dir, filename)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove theme.css link
        content = re.sub(r'<link rel="stylesheet" href="/css/theme.css">\s*', '', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Removed theme.css from: {filename}")
    else:
        print(f"❌ Not found: {filename}")

print("\n✅ Removed light theme CSS from all pages!")
