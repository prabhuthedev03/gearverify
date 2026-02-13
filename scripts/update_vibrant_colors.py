import re

# Define vibrant pastel colors for guides
guide_colors = [
    ('hardware-level-privacy-audit.html', 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)', 'rgba(255,235,59,0.5)'),
    ('nvme-gen5-controller-heat.html', 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', 'rgba(255,152,0,0.5)'),
    ('browser-extensions-benchmarking-impact.html', 'linear-gradient(135deg, #FFECB3 0%, #FFE082 100%)', 'rgba(255,193,7,0.5)'),
    ('ddr5-stability-testing-guide.html', 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%)', 'rgba(156,39,176,0.5)'),
    ('identifying-ghost-frames.html', 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)', 'rgba(96,125,139,0.5)'),
    ('webgpu-vs-cuda-deep-dive.html', 'linear-gradient(135deg, #DCEDC8 0%, #C5E1A5 100%)', 'rgba(139,195,74,0.5)'),
    ('display-lag-vs-system-latency.html', 'linear-gradient(135deg, #B2EBF2 0%, #80DEEA 100%)', 'rgba(0,188,212,0.5)'),
    ('gpu-vrm-thermal-soak.html', 'linear-gradient(135deg, #FFCDD2 0%, #EF9A9A 100%)', 'rgba(244,67,54,0.5)'),
    ('apple-silicon-m-series-validation.html', 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)', 'rgba(158,158,158,0.5)'),
    ('detecting-spoofed-gpu-bios.html', 'linear-gradient(135deg, #B0BEC5 0%, #90A4AE 100%)', 'rgba(607,78,91,0.5)'),
    ('client-side-vs-server-diagnostics.html', 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)', 'rgba(3,169,244,0.5)'),
    ('latency-metrics-gaming.html', 'linear-gradient(135deg, #B0BEC5 0%, #90A4AE 100%)', 'rgba(96,125,139,0.5)'),
    ('browser-gpu-stress-testing.html', 'linear-gradient(135deg, #D1C4E9 0%, #B39DDB 100%)', 'rgba(103,58,183,0.5)'),
    ('silicon-lottery-webgpu.html', 'linear-gradient(135deg, #FFECB3 0%, #FFD54F 100%)', 'rgba(255,193,7,0.5)'),
    ('nvme-gen5-throttling.html', 'linear-gradient(135deg, #B2DFDB 0%, #80CBC4 100%)', 'rgba(0,150,136,0.5)'),
    ('signs-graphics-card-failing.html', 'linear-gradient(135deg, #F8BBD0 0%, #F48FB1 100%)', 'rgba(233,30,99,0.5)'),
    ('gpu-stress-test-explained.html', 'linear-gradient(135deg, #C5CAE9 0%, #9FA8DA 100%)', 'rgba(63,81,181,0.5)'),
    ('webgpu-vs-webgl-performance.html', 'linear-gradient(135deg, #FFCCBC 0%, #FFAB91 100%)', 'rgba(255,87,34,0.5)'),
]

# Update guides/index.html
guides_index = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides\index.html"

with open(guides_index, 'r', encoding='utf-8') as f:
    content = f.read()

for filename, bg_color, border_color in guide_colors:
    # Find the href and update its style
    pattern = rf'(<a href="{filename}" class="bento-card")(.*?)(>)'
    replacement = rf'\1 style="background: {bg_color}; border-color: {border_color};"\3'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(guides_index, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated guides/index.html with vibrant colors!")

# Update index.html (home page)
index_html = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\index.html"

home_colors = [
    ('gpu/', 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', 'rgba(33,150,243,0.4)'),
    ('cpu/', 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', 'rgba(244,67,54,0.4)'),
    ('ram/', 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', 'rgba(76,175,80,0.4)'),
    ('display/', 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', 'rgba(156,39,176,0.4)'),
    ('input/', 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', 'rgba(255,152,0,0.4)'),
    ('webcam/', 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)', 'rgba(103,58,183,0.4)'),
]

with open(index_html, 'r', encoding='utf-8') as f:
    content = f.read()

for href, bg_color, border_color in home_colors:
    pattern = rf'(<a href="{href}" class="bento-card")(.*?)(>)'
    replacement = rf'\1 style="background: {bg_color}; border-color: {border_color};"\3'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(index_html, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated index.html with vibrant colors!")
print("\n🎨 All pages now have vibrant, colorful bento cards!")
