import re

# Toned-down colors (reduced vibrancy by ~25%)
# Original -> Toned Down
home_colors = [
    ('gpu/', '#7BA5DD'),  # Blue (was #5B8FD8)
    ('cpu/', '#E8817F'),  # Red/Coral (was #E55A5A)
    ('ram/', '#83DAB8'),  # Mint/Teal green (was #5FD4A8)
    ('display/', '#EB95C6'),  # Pink (was #E678B5)
    ('input/', '#F7DD74'),  # Yellow/Gold (was #F5D547)
    ('webcam/', '#AF90DD'),  # Purple/Violet (was #9B6FD8)
]

# Update index.html with toned-down colors and dark text
index_html = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\index.html"

with open(index_html, 'r', encoding='utf-8') as f:
    content = f.read()

for href, toned_color in home_colors:
    pattern = rf'(<a href="{href}" class="bento-card")(\s+style="[^"]*")?(.*?)(>)'
    replacement = rf'\1 style="background: {toned_color} !important; border: none;"\4'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Update icon colors to dark for contrast
content = re.sub(
    r'(<div class="bento-icon" style="color: )[^;]+(;">)',
    r'\1rgba(0,0,0,0.8)\2',
    content
)

# Update text colors - titles to dark
content = re.sub(
    r'(<div class="bento-title")>',
    r'\1 style="color: rgba(0,0,0,0.9);">',
    content
)

# Update description text to dark
content = re.sub(
    r'(<div class="bento-desc")>',
    r'\1 style="color: rgba(0,0,0,0.7);">',
    content
)

# Update action text to dark
content = re.sub(
    r'(<div class="bento-action")>',
    r'\1 style="color: rgba(0,0,0,0.8); font-weight: 600;">',
    content
)

with open(index_html, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated index.html with toned-down colors and dark text!")

# Toned-down guide colors
guide_colors = [
    ('hardware-level-privacy-audit.html', '#F7DD74'),  # Yellow
    ('nvme-gen5-controller-heat.html', '#FFA37A'),  # Orange
    ('browser-extensions-benchmarking-impact.html', '#FFD98A'),  # Light orange/gold
    ('ddr5-stability-testing-guide.html', '#C09DD6'),  # Purple
    ('identifying-ghost-frames.html', '#BDE3E5'),  # Light cyan
    ('webgpu-vs-cuda-deep-dive.html', '#A8DDBA'),  # Light green
    ('display-lag-vs-system-latency.html', '#7FCFE6'),  # Cyan
    ('gpu-vrm-thermal-soak.html', '#E8817F'),  # Red
    ('apple-silicon-m-series-validation.html', '#C7C7C7'),  # Gray
    ('detecting-spoofed-gpu-bios.html', '#96A3AD'),  # Blue-gray
    ('client-side-vs-server-diagnostics.html', '#73CFF9'),  # Light blue
    ('latency-metrics-gaming.html', '#93A1AD'),  # Dark gray
    ('browser-gpu-stress-testing.html', '#AA91D6'),  # Medium purple
    ('silicon-lottery-webgpu.html', '#FFEC8E'),  # Bright yellow
    ('nvme-gen5-throttling.html', '#70C4BC'),  # Teal
    ('signs-graphics-card-failing.html', '#F381A7'),  # Hot pink
    ('gpu-stress-test-explained.html', '#93A0D8'),  # Soft blue
    ('webgpu-vs-webgl-performance.html', '#FF8C6B'),  # Deep orange
]

guides_index = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides\index.html"

with open(guides_index, 'r', encoding='utf-8') as f:
    content = f.read()

for filename, toned_color in guide_colors:
    pattern = rf'(<a href="{filename}" class="bento-card")(\s+style="[^"]*")?(.*?)(>)'
    replacement = rf'\1 style="background: {toned_color} !important; border: none;"\4'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Update text colors for guides
content = re.sub(
    r'(<div class="bento-icon" style="color: )[^;]+(;">)',
    r'\1rgba(0,0,0,0.8)\2',
    content
)

content = re.sub(
    r'(<div class="bento-title")>',
    r'\1 style="color: rgba(0,0,0,0.9);">',
    content
)

content = re.sub(
    r'(<div class="bento-desc")>',
    r'\1 style="color: rgba(0,0,0,0.7);">',
    content
)

content = re.sub(
    r'(<div class="bento-action")>',
    r'\1 style="color: rgba(0,0,0,0.8); font-weight: 600;">',
    content
)

with open(guides_index, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated guides/index.html with toned-down colors and dark text!")
print("\n🎨 All colors are now 25% less vibrant with clearly visible dark text!")
