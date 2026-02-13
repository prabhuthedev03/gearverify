import re
import os

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

# Google AdSense replacement HTML
adsense_html = '''<div class="ad-slot-featured" style="background: var(--surface-color); padding: 2rem; border-radius: 12px; margin: 2rem 0; text-align: center;">
    <span class="ad-label" style="display: block; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1rem;">Advertisement</span>
    <div style="min-height: 250px; display: flex; align-items: center; justify-content: center; color: #ccc;">
        [GOOGLE_ADSENSE_SLOT]
    </div>
</div>'''

# Diagnostic console pattern to find and replace
diagnostic_pattern = r'<div class="test-console-wrapper">.*?</div>\s*</div>\s*</div>'

# Hero heading blue gradient style
hero_gradient_style = 'background: linear-gradient(180deg, #007AFF 0%, #0056B3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #007AFF;'

for guide_file in guide_files:
    filepath = os.path.join(guides_dir, guide_file)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace diagnostic console with AdSense
        content = re.sub(diagnostic_pattern, adsense_html, content, flags=re.DOTALL)
        
        # Update guide-title to use hero gradient (replace existing style)
        content = re.sub(
            r'(<h1 class="guide-title")(\s+style="[^"]*")?(>)',
            rf'\1 style="{hero_gradient_style}"\3',
            content
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated: {guide_file}")
    else:
        print(f"❌ Not found: {guide_file}")

print("\n✅ All guide articles updated!")
print("  - Diagnostic console → Google AdSense placeholder")
print("  - Guide title color → Blue gradient (matching hero heading)")
