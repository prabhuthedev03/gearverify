import re
import os

# Files to clean up
files_to_update = [
    "about.html",
    "contact.html",
    "contributors.html",
    "methodology.html",
    "terms.html",
    "privacy.html"
]

base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"

for filename in files_to_update:
    filepath = os.path.join(base_dir, filename)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove theme.css link (causes light theme)
        content = re.sub(r'<link rel="stylesheet" href="/css/theme.css">\s*', '', content)
        
        # Ensure body has dark background
        if '<body>' in content:
            content = content.replace('<body>', '<body style="background-color: #000000; color: #f5f5f7;">')
        elif '<body' in content and 'style=' not in content:
            content = re.sub(r'<body([^>]*)>', r'<body\1 style="background-color: #000000; color: #f5f5f7;">', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Cleaned up: {filename}")
    else:
        print(f"❌ Not found: {filename}")

print("\n✅ Static pages cleaned up - removed light theme CSS!")
