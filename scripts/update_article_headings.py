import re
import os

# Guide files
guide_files = [
    "apple-silicon-m-series-validation.html",
    "browser-extensions-benchmarking-impact.html",
    "browser-gpu-stress-testing.html",
    "client-side-vs-server-diagnostics.html",
    "ddr5-stability-testing-guide.html",
    "detecting-spoofed-gpu-bios.html",
    "display-lag-vs-system-latency.html",
    "gpu-stress-test-explained.html",
    "gpu-vrm-thermal-soak.html",
    "hardware-level-privacy-audit.html",
    "identifying-ghost-frames.html",
    "latency-metrics-gaming.html",
    "nvme-gen5-controller-heat.html",
    "nvme-gen5-throttling.html",
    "signs-graphics-card-failing.html",
    "silicon-lottery-webgpu.html",
    "webgpu-vs-cuda-deep-dive.html",
    "webgpu-vs-webgl-performance.html"
]

guides_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides"

for guide_file in guide_files:
    filepath = os.path.join(guides_dir, guide_file)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update h1.guide-title to have light gray color instead of blue gradient
        # Remove blue gradient, add light gray color
        pattern = r'(<h1 class="guide-title")(\s+style="[^"]*")?(>)'
        replacement = r'\1 style="color: #9CA3AF; font-weight: 300; font-size: 2.5rem; letter-spacing: -0.02em;"\3'
        content = re.sub(pattern, replacement, content)
        
        # Update Related Articles heading if it exists
        content = re.sub(
            r'<h3 style="margin-bottom: 1\.5rem;">Related Technical Guides</h3>',
            '<h3 style="margin-bottom: 1.5rem; color: #1d1d1f; font-weight: 600;">Related Technical Guides</h3>',
            content
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated: {guide_file}")
    else:
        print(f"❌ Not found: {guide_file}")

print("\n✅ All guide article h1 headings updated to light gray!")
