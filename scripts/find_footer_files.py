import re
import os

# Files with footer
files_with_footer = []

base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"

# Find all HTML files
for root, dirs, files in os.walk(base_dir):
    # Skip node_modules and hidden directories
    if 'node_modules' in root or '/.git' in root or '\\.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'master-footer' in content:
                    rel_path = os.path.relpath(filepath, base_dir)
                    files_with_footer.append(rel_path)

print(f"Found {len(files_with_footer)} files with master-footer:")
for f in files_with_footer:
    print(f"  - {f}")
