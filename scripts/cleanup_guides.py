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

# Pattern to match lab-terminal blocks
lab_terminal_pattern = r'<div class="lab-terminal">.*?</div>\s*\r?\n?'

for guide_file in guide_files:
    filepath = os.path.join(guides_dir, guide_file)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove lab-terminal blocks
        original_content = content
        content = re.sub(lab_terminal_pattern, '', content, flags=re.DOTALL)
        
        # Add table borders to tech-table
        content = re.sub(
            r'<table class="tech-table">',
            '<table class="tech-table" style="border: 1px solid rgba(0,0,0,0.1); border-collapse: collapse; width: 100%;">',
            content
        )
        
        # Add borders to th and td in tech-table
        content = re.sub(
            r'<th>',
            '<th style="border: 1px solid rgba(0,0,0,0.1); padding: 0.75rem; background: var(--surface-color);">',
            content
        )
        
        content = re.sub(
            r'<td>',
            '<td style="border: 1px solid rgba(0,0,0,0.1); padding: 0.75rem;">',
            content
        )
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated: {guide_file}")
        else:
            print(f"⏭️  No changes: {guide_file}")
    else:
        print(f"❌ Not found: {guide_file}")

print("\n✅ Lab-terminal elements removed and table borders added!")
