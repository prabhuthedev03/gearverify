import re

# Solid, vibrant colors matching the screenshot
home_colors = [
    ('gpu/', '#5B8FD8'),  # Blue
    ('cpu/', '#E55A5A'),  # Red/Coral
    ('ram/', '#5FD4A8'),  # Mint/Teal green
    ('display/', '#E678B5'),  # Pink
    ('input/', '#F5D547'),  # Yellow/Gold
    ('webcam/', '#9B6FD8'),  # Purple/Violet
]

# Update index.html (home page) with SOLID colors
index_html = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\index.html"

with open(index_html, 'r', encoding='utf-8') as f:
    content = f.read()

for href, solid_color in home_colors:
    # Remove any existing style attribute and add new solid color
    pattern = rf'(<a href="{href}" class="bento-card")(\s+style="[^"]*")?(.*?)(>)'
    replacement = rf'\1 style="background: {solid_color} !important; border: none;"\4'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(index_html, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated index.html with SOLID vibrant colors!")

# Update guides with solid vibrant colors  
guide_colors = [
    ('hardware-level-privacy-audit.html', '#F5D547'),  # Yellow
    ('nvme-gen5-controller-heat.html', '#FF8A5B'),  # Orange
    ('browser-extensions-benchmarking-impact.html', '#FFD166'),  # Light orange/gold
    ('ddr5-stability-testing-guide.html', '#B084CC'),  # Purple
    ('identifying-ghost-frames.html', '#A8DADC'),  # Light cyan
    ('webgpu-vs-cuda-deep-dive.html', '#90D5A3'),  # Light green
    ('display-lag-vs-system-latency.html', '#5BC0DE'),  # Cyan
    ('gpu-vrm-thermal-soak.html', '#E55A5A'),  # Red
    ('apple-silicon-m-series-validation.html', '#B8B8B8'),  # Gray
    ('detecting-spoofed-gpu-bios.html', '#7B8A99'),  # Blue-gray
    ('client-side-vs-server-diagnostics.html', '#4FC3F7'),  # Light blue
    ('latency-metrics-gaming.html', '#78909C'),  # Dark gray
    ('browser-gpu-stress-testing.html', '#9575CD'),  # Medium purple
    ('silicon-lottery-webgpu.html', '#FFE66D'),  # Bright yellow
    ('nvme-gen5-throttling.html', '#4DB6AC'),  # Teal
    ('signs-graphics-card-failing.html', '#F06292'),  # Hot pink
    ('gpu-stress-test-explained.html', '#7986CB'),  # Soft blue
    ('webgpu-vs-webgl-performance.html', '#FF7043'),  # Deep orange
]

guides_index = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides\index.html"

with open(guides_index, 'r', encoding='utf-8') as f:
    content = f.read()

for filename, solid_color in guide_colors:
    pattern = rf'(<a href="{filename}" class="bento-card")(\s+style="[^"]*")?(.*?)(>)'
    replacement = rf'\1 style="background: {solid_color} !important; border: none;"\4'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(guides_index, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated guides/index.html with SOLID vibrant colors!")
print("\n🎨 All bento cards now have SOLID, VIBRANT colors!")
