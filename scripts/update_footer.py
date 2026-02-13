import re
import os

# Script to update footer HTML across all 35 files
# 1. Remove "Contact" link from Resources section
# 2. Update footer structure for reduced height

files_to_update = [
    "about.html",
    "contact.html",
    "contributors.html",
    "index.html",
    "methodology.html",
    "privacy.html",
    "terms.html",
    "audio/index.html",
    "cpu/index.html",
    "gpu/index.html",
    "guides/apple-silicon-m-series-validation.html",
    "guides/browser-extensions-benchmarking-impact.html",
    "guides/browser-gpu-stress-testing.html",
    "guides/client-side-vs-server-diagnostics.html",
    "guides/ddr5-stability-testing.html",
    "guides/detecting-spoofed-gpu-bios.html",
    "guides/display-lag-vs-system-latency.html",
    "guides/gpu-stress-test-explained.html",
    "guides/gpu-vrm-thermal-soak.html",
    "guides/hardware-level-privacy-audit.html",
    "guides/identifying-ghost-frames.html",
    "guides/index.html",
    "guides/latency-metrics-gaming.html",
    "guides/nvme-gen5-controller-heat.html",
    "guides/nvme-gen5-throttling.html",
    "guides/signs-graphics-card-failing.html",
    "guides/silicon-lottery-webgpu.html",
    "guides/webgpu-vs-cuda-deep-dive.html",
    "guides/webgpu-vs-webgl-performance.html",
    "input/index.html",
    "laboratory/methodology.html",
    "ram/index.html",
    "webcam/index.html"
]

base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"
updated_count = 0

for filename in files_to_update:
    filepath = os.path.join(base_dir, filename)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove the "Contact" link from footer Resources section
        # Pattern to match the Contact list item
        content = re.sub(
            r'\s*<li><a href="/contact\.html">Contact</a></li>\s*\r?\n',
            '\n',
            content
        )
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            print(f"✅ Updated: {filename}")
        else:
            print(f"⏭️  No changes: {filename}")
    else:
        print(f"❌ Not found: {filename}")

print(f"\n✅ Footer updated in {updated_count} files!")
print("Removed 'Contact' link from Resources section")
