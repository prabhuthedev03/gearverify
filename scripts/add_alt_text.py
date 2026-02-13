import re
import os
from typing import Dict

# Alt text for hero images
ALT_TEXT_MAP: Dict[str, str] = {
    "guides/apple-silicon-m-series-validation.html": "Thermal imaging of MacBook Air M2 showing VRM heat zones during WebGPU compute validation",
    "guides/browser-extensions-benchmarking-impact.html": "Browser performance diagnostic showing extension CPU/GPU impact metrics",
    "guides/ddr5-stability-testing-guide.html": "DDR5 memory diagnostic showing bandwidth saturation and error correction visualization",
    "guides/detecting-spoofed-gpu-bios.html": "GPU BIOS validation diagnostic showing firmware verification and authenticity checksum",
    "guides/display-lag-vs-system-latency.html": "Input-to-photon latency diagnostic visualization for gaming hardware validation",
    "guides/gpu-vrm-thermal-soak.html": "GPU VRM thermal diagnostic showing voltage regulation heat under sustained load",
   "guides/hardware-level-privacy-audit.html": "Client-side hardware validation diagnostic with zero-server processing visualization",
    "guides/identifying-ghost-frames.html": "Display refresh diagnostic showing frame doubling artifacts and ghost frames",
    "guides/nvme-gen5-controller-heat.html": "NVMe Gen5 SSD thermal diagnostic showing controller temperature under load",
    "guides/webgpu-vs-cuda-deep-dive.html": "WebGPU vs CUDA compute performance diagnostic comparison visualization",
}

def add_alt_text(filepath: str, alt_text: str) -> bool:
    """Add alt attribute to hero image if not present."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find img tags with class="article-hero-image" that don't have alt
    pattern = r'(<img[^>]*class="article-hero-image"[^>]*)(>)'
    
    def add_alt_if_missing(match):
        img_tag = match.group(1)
        closing = match.group(2)
        
        # Check if alt already exists
        if 'alt=' in img_tag:
            return match.group(0)  # Return unchanged
        
        # Add alt before closing >
        return f'{img_tag} alt="{alt_text}"{closing}'
    
    new_content = re.sub(pattern, add_alt_if_missing, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✅ Added alt text: {os.path.basename(filepath)}")
        return True
    else:
        print(f"⏭️  Already has alt or no hero image: {os.path.basename(filepath)}")
        return False

def main():
    base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"
    updated_count = 0
    
    for relative_path, alt_text in ALT_TEXT_MAP.items():
        filepath = os.path.join(base_dir, relative_path)
        
        if os.path.exists(filepath):
            if add_alt_text(filepath, alt_text):
                updated_count += 1
        else:
            print(f"❌ File not found: {relative_path}")
    
    print(f"\n✅ Added alt text to {updated_count}/{len(ALT_TEXT_MAP)} images!")
    print(f"📊 Total images processed: {len(ALT_TEXT_MAP)}")

if __name__ == "__main__":
    main()
