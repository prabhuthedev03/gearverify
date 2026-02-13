import re

# Update icon colors to white for better contrast on vibrant backgrounds
index_html = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\index.html"

with open(index_html, 'r', encoding='utf-8') as f:
    content = f.read()

# Update all bento-icon colors to white
content = re.sub(
    r'(<div class="bento-icon" style="color: )#[0-9a-fA-F]{3,6}(;">)',
    r'\1#ffffff\2',
    content
)

with open(index_html, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated icon colors to white for better contrast!")

# Update guides index icon colors too
guides_index = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides\index.html"

with open(guides_index, 'r', encoding='utf-8') as f:
    content = f.read()

# Update all icon colors to darker for better contrast
content = re.sub(
    r'(<div class="bento-icon" style="color: )#[0-9a-fA-F]{3,6}(;">)',
    r'\1rgba(0,0,0,0.7)\2',
    content
)

with open(guides_index, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated guides icon colors for better contrast!")
print("\n🎨 Icon colors optimized!")
