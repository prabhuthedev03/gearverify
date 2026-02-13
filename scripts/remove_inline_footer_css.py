import re
import os

# Script to remove all inline footer CSS from HTML files
# This will make all pages use the global footer CSS from globals.css

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
    "guides/ddr5-stability-testing-guide.html",
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
        
        # Remove all <style> blocks that contain .master-footer CSS
        # This pattern matches <style>...</style> blocks that contain footer CSS
        content = re.sub(
            r'<style>\s*\.master-footer\s*\{.*?</style>',
            '',
            content,
            flags=re.DOTALL
        )
        
        # Also remove any standalone style blocks after the footer script
        content = re.sub(
            r'</script>\s*<style>\s*\.master-footer.*?</style>',
            '</script>',
            content,
            flags=re.DOTALL
        )
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            print(f"✅ Removed inline footer CSS: {filename}")
        else:
            print(f"⏭️  No inline footer CSS found: {filename}")
    else:
        print(f"❌ Not found: {filename}")

print(f"\n✅ Removed inline footer CSS from {updated_count} files!")
print("All pages will now use the global footer CSS from globals.css")
