import re
import os
from typing import Dict

# Meta descriptions for all pages (includes "Hardware Validation" or "Diagnostic")
META_DESCRIPTIONS: Dict[str, str] = {
    # Main pages
    "about.html": "Hardware Validation transparency and methodology from GearVerify's diagnostic laboratory. Learn about our zero-server privacy protocol and expert-driven validation approach.",
    "contact.html": "Contact GearVerify's Hardware Validation team for diagnostic inquiries, bug reports, and technical collaboration opportunities.",
    "contributors.html": "Hardware Diagnostic contributors to GearVerify's validation laboratory. Meet the engineering team behind our client-side validation platform.",
    "methodology.html": "GearVerify's Hardware Validation methodology and diagnostic protocols. Learn how we ensure accurate, reproducible hardware testing.",
    "privacy.html": "Privacy policy for GearVerify's client-side Hardware Validation platform. Zero-server diagnostics ensure your hardware data never leaves your device.",
    "terms.html": "Terms of service for GearVerify's Hardware Diagnostic laboratory. Legal framework for using our validation tools and services.",
    
    # Guide pages
    "guides/apple-silicon-m-series-validation.html": "Apple Silicon M-Series Hardware Validation guide. Diagnostic analysis of compute shader throughput, thermal throttling, and memory bandwidth on Mac hardware.",
    "guides/browser-extensions-benchmarking-impact.html": "Browser Extension Performance Diagnostic guide. Hardware validation showing CPU/GPU impact of extensions on benchmark accuracy.",
    "guides/browser-gpu-stress-testing.html": "Browser GPU Stress Test Diagnostic guide. Hardware validation methodology for WebGPU compute shader testing and thermal analysis.",
    "guides/client-side-vs-server-diagnostics.html": "Client-Side vs Server-Side Hardware Diagnostic comparison. Validation methodology showing privacy and accuracy advantages of browser-based testing.",
    "guides/ddr5-stability-testing-guide.html": "DDR5 Memory Stability Diagnostic guide. Hardware validation methodology for testing RAM bandwidth, latency, and error correction.",
    "guides/detecting-spoofed-gpu-bios.html": "Spoofed GPU BIOS Detection Diagnostic guide. Hardware validation techniques to identify fraudulent graphics card firmware modifications.",
    "guides/display-lag-vs-system-latency.html": "Display Lag vs System Latency Diagnostic guide. Hardware validation methodology measuring input-to-photon latency for gaming systems.",
    "guides/gpu-stress-test-explained.html": "GPU Stress Test Diagnostic guide explained. Hardware validation methodology for testing graphics card stability, thermals, and performance limits.",
    "guides/gpu-vrm-thermal-soak.html": "GPU VRM Thermal Soak Diagnostic guide. Hardware validation analysis of voltage regulation heat accumulation under sustained load.",
    "guides/hardware-level-privacy-audit.html": "Hardware-Level Privacy Audit Diagnostic guide. Validation methodology ensuring zero-server data collection during hardware testing.",
    "guides/identifying-ghost-frames.html": "Ghost Frame Identification Diagnostic guide. Hardware validation techniques to detect display refresh artifacts and frame pacing issues.",
    "guides/index.html": "GearVerify Laboratory Hardware Diagnostic guides. Technical analysis of GPU validation, memory testing, storage diagnostics, and privacy auditing.",
    "guides/latency-metrics-gaming.html": "Gaming Latency Metrics Diagnostic guide. Hardware validation methodology for measuring system responsiveness and input lag.",
    "guides/nvme-gen5-controller-heat.html": "NVMe Gen5 Controller Heat Diagnostic guide. Hardware validation analysis of SSD thermal management and performance degradation.",
    "guides/nvme-gen5-throttling.html": "NVMe Gen5 Throttling Diagnostic guide. Hardware validation showing thermal performance limits of high-speed storage controllers.",
    "guides/signs-graphics-card-failing.html": "Failing Graphics Card Diagnostic guide. Hardware validation methodology to identify GPU failure symptoms before catastrophic failure.",
    "guides/silicon-lottery-webgpu.html": "Silicon Lottery WebGPU Diagnostic guide. Hardware validation analysis of chip-to-chip performance variance in identical GPU models.",
    "guides/webgpu-vs-cuda-deep-dive.html": "WebGPU vs CUDA Deep Dive Diagnostic comparison. Hardware validation methodology comparing cross-platform and proprietary compute APIs.",
    "guides/webgpu-vs-webgl-performance.html": "WebGPU vs WebGL Performance Diagnostic comparison. Hardware validation showing modern GPU compute advantages over legacy graphics APIs.",
    
    # Laboratory pages
    "cpu/index.html": "CPU Hardware Diagnostic laboratory. Validate processor performance, instruction throughput, and computation accuracy with WebGPU testing.",
    "gpu/index.html": "GPU Hardware Diagnostic laboratory. Validate graphics card performance, VRAM integrity, and rendering accuracy with WebGPU stress testing.",
    "ram/index.html": "RAM Hardware Diagnostic laboratory. Validate memory bandwidth, latency, and stability with browser-based validation protocols.",
    "audio/index.html": "Audio Hardware Diagnostic laboratory. Validate sound card latency, sample rate accuracy, and buffer performance in real-time.",
    "webcam/index.html": "Webcam Hardware Diagnostic laboratory. Validate camera frame rate, resolution accuracy, and codec performance benchmarking.",
    "input/index.html": "Input Device Hardware Diagnostic laboratory. Validate keyboard and mouse latency, polling rate, and input accuracy with precision testing.",
    "laboratory/methodology.html": "Laboratory Methodology for Hardware Validation. Technical protocols ensuring accurate and reproducible diagnostic testing.",
}

def add_meta_description(filepath: str, description: str) -> bool:
    """Add meta description to HTML file if not present."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if meta description already exists
    if '<meta name="description"' in content:
        print(f"⏭️  Already has meta: {filepath}")
        return False
    
    # Find the </title> tag and insert after it
    title_pattern = r'(</title>)'
    meta_tag = f'\n    <meta name="description" content="{description}">'
    
    new_content = re.sub(title_pattern, r'\1' + meta_tag, content, count=1)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✅ Added meta: {os.path.basename(filepath)}")
        return True
    else:
        print(f"❌ Failed to add meta: {filepath}")
        return False

def main():
    base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"
    updated_count = 0
    
    for relative_path, description in META_DESCRIPTIONS.items():
        filepath = os.path.join(base_dir, relative_path)
        
        if os.path.exists(filepath):
            if add_meta_description(filepath, description):
                updated_count += 1
        else:
            print(f"❌ File not found: {relative_path}")
    
    print(f"\n✅ Added meta descriptions to {updated_count}/{len(META_DESCRIPTIONS)} pages!")
    print(f"📊 Total pages processed: {len(META_DESCRIPTIONS)}")

if __name__ == "__main__":
    main()
