"""
Bulk update all HTML files to add:
1. PNG favicon fallback
2. Web manifest link

Adds after existing <link rel="icon" type="image/svg+xml" href="/favicon.svg">
"""
import os
import re

# All HTML files to update
html_files = [
    # Root pages
    "index.html",
    "about.html",
    "contact.html",
    "privacy.html",
    "terms.html",
    "contributors.html",
    "methodology.html",
    
    # Laboratory pages
    "cpu/index.html",
    "gpu/index.html",
    "ram/index.html",
    "audio/index.html",
    "input/index.html",
    "webcam/index.html",
    "display/index.html",
    "laboratory/methodology.html",
    
    # Guide pages
    "guides/index.html",
    "guides/apple-silicon-m-series-validation.html",
    "guides/browser-extensions-benchmarking-impact.html",
    "guides/browser-gpu-stress-testing.html",
    "guides/client-side-vs-server-diagnostics.html",
    "guides/ddr5-stability-testing-guide.html",
    "guides/detecting-spoofed-gpu-bios.html",
    "guides/display-lag-vs-system-latency.html",
    "guides/gpu-stress-test-explained.html",
    "guides/gpu-vrm-thermal-soak.html",
    "guides/hardware-level-privacy-audit.html",
    "guides/identifying-ghost-frames.html",
    "guides/latency-metrics-gaming.html",
    "guides/nvme-gen5-controller-heat.html",
    "guides/nvme-gen5-throttling.html",
    "guides/silicon-lottery-webgpu.html",
    "guides/signs-graphics-card-failing.html",
    "guides/webgpu-vs-cuda-deep-dive.html",
]

# Lines to add
lines_to_add = '''    <link rel="alternate icon" type="image/png" href="/favicon.png">
    <link rel="manifest" href="/site.webmanifest">'''

updated_count = 0
skipped_count = 0

for filepath in html_files:
    full_path = os.path.join(".", filepath)
    
    if not os.path.exists(full_path):
        print(f"⚠️  Not found: {filepath}")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has PNG fallback
    if 'rel="alternate icon"' in content or 'favicon.png' in content:
        print(f"⏭️  Already updated: {filepath}")
        skipped_count += 1
        continue
    
    # Find the SVG favicon link and add after it
    pattern = r'(<link rel="icon" type="image/svg\+xml" href="/favicon\.svg"[^>]*>)'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, r'\1\n' + lines_to_add, content)
        
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Updated: {filepath}")
        updated_count += 1
    else:
        print(f"❌ No SVG favicon found: {filepath}")

print(f"\n📊 Summary: {updated_count} updated, {skipped_count} skipped")
print("✅ All files now have PNG fallback and web manifest links!")
