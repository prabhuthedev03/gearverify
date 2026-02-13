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

# Solid colors for related articles (toned down versions)
article_colors = {
    'client-side-vs-server-diagnostics.html': '#73CFF9',
    'apple-silicon-m-series-validation.html': '#C7C7C7',
    'detecting-spoofed-gpu-bios.html': '#96A3AD',
    'hardware-level-privacy-audit.html': '#F7DD74',
    'webgpu-vs-cuda-deep-dive.html': '#A8DDBA',
    'nvme-gen5-controller-heat.html': '#FFA37A',
    'browser-extensions-benchmarking-impact.html': '#FFD98A',
    'ddr5-stability-testing-guide.html': '#C09DD6',
    'identifying-ghost-frames.html': '#BDE3E5',
    'display-lag-vs-system-latency.html': '#7FCFE6',
    'gpu-vrm-thermal-soak.html': '#E8817F',
    'latency-metrics-gaming.html': '#93A1AD',
    'browser-gpu-stress-testing.html': '#AA91D6',
    'silicon-lottery-webgpu.html': '#FFEC8E',
    'nvme-gen5-throttling.html': '#70C4BC',
    'signs-graphics-card-failing.html': '#F381A7',
    'gpu-stress-test-explained.html': '#93A0D8',
    'webgpu-vs-webgl-performance.html': '#FF8C6B',
}

guides_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides"

for guide_file in guide_files:
    filepath = os.path.join(guides_dir, guide_file)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Convert guide-list-card to bento-card format
        # Find all guide-list-card instances and convert them
        def replace_card(match):
            href = match.group(1)
            color = article_colors.get(href, '#7BA5DD')  # Default blue if not found
            emoji = match.group(2)
            title = match.group(3)
            
            return f'''<a href="{href}" class="bento-card" style="background: {color}; border: none; padding: 1.5rem;">
                    <div class="bento-icon" style="color: rgba(0,0,0,0.8); font-size: 1.5rem;">{emoji}</div>
                    <div class="bento-title" style="color: rgba(0,0,0,0.9); font-size: 1rem; margin-top: 0.5rem;">{title}</div>
                    <div class="bento-action" style="color: rgba(0,0,0,0.7); margin-top: 0.5rem;">Read Guide →</div>
                </a>'''
        
        # Pattern to match guide-list-card structure
        pattern = r'<a href="([^"]+)" class="guide-list-card">.*?<div class="guide-list-thumb"[^>]*>(.*?)</div>.*?<h4 class="guide-list-title">([^<]+)</h4>.*?</a>'
        content = re.sub(pattern, replace_card, content, flags=re.DOTALL)
        
        # Update guide-list-grid to bento-grid
        content = content.replace('class="guide-list-grid"', 'class="bento-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated: {guide_file}")
    else:
        print(f"❌ Not found: {guide_file}")

print("\n✅ All Related Articles sections converted to bento card format!")
