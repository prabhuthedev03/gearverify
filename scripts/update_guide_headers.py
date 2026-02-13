import re
import os

# Base directory
guides_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides"

# Guide files:
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

# Add blue gradient to h1
def add_gradient_to_h1(content):
    # Find <h1 class="guide-title">
    pattern = r'(<h1\s+class="guide-title")(>)'
    replacement =r'\1 style="background: linear-gradient(180deg, #007AFF 0%, #0056B3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"\2'
    return re.sub(pattern, replacement, content)

# Process each guide file
for guide_file in guide_files:
    filepath = os.path.join(guides_dir, guide_file)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add gradient to h1 if not already there
        if 'style="background: linear-gradient' not in content:
            content = add_gradient_to_h1(content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated: {guide_file}")
        else:
            print(f"⏭️  Skipped (already has gradient): {guide_file}")
    else:
        print(f"❌ Not found: {guide_file}")

print("\n✅ All guide pages updated with blue gradient on h1!")
