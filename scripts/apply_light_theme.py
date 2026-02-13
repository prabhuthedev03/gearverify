import re
import os

# Remove dark background enforcement from static pages
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
        
        # Remove dark background inline styles from body tag
        content = re.sub(
            r'<body([^>]*) style="background-color: #000000; color: #f5f5f7;"([^>]*)>',
            r'<body\1\2>',
            content
        )
        
        content = re.sub(
            r'<body style="background-color: #000000; color: #f5f5f7;">',
            '<body>',
            content
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Removed dark styles from: {filename}")
    else:
        print(f"❌ Not found: {filename}")

print("\n✅ Light theme applied - removed dark background overrides!")
