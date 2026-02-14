"""
Add OpenGraph and Twitter Card meta tags to all HTML files
Optimizes social sharing for Reddit, Twitter, Discord, LinkedIn
"""
import os
import re
from typing import Dict, List

# Page-specific metadata
PAGE_METADATA = {
    "index.html": {
        "title": "GearVerify | The Browser-Based Hardware Laboratory",
        "url": "https://gearverify.com/"
    },
    "about.html": {
        "title": "About Us | GearVerify",
        "url": "https://gearverify.com/about.html"
    },
    "contact.html": {
        "title": "Contact | GearVerify",
        "url": "https://gearverify.com/contact.html"
    },
    "privacy.html": {
        "title": "Privacy Policy | GearVerify",
        "url": "https://gearverify.com/privacy.html"
    },
    "terms.html": {
        "title": "Terms of Service | GearVerify",
        "url": "https://gearverify.com/terms.html"
    },
    "contributors.html": {
        "title": "Contributors | GearVerify",
        "url": "https://gearverify.com/contributors.html"
    },
    "methodology.html": {
        "title": "Methodology | GearVerify",
        "url": "https://gearverify.com/methodology.html"
    },
    "cpu/index.html": {
        "title": "CPU Laboratory | GearVerify",
        "url": "https://gearverify.com/cpu/"
    },
    "gpu/index.html": {
        "title": "GPU Laboratory | GearVerify",
        "url": "https://gearverify.com/gpu/"
    },
    "ram/index.html": {
        "title": "RAM Laboratory | GearVerify",
        "url": "https://gearverify.com/ram/"
    },
    "audio/index.html": {
        "title": "Audio Laboratory | GearVerify",
        "url": "https://gearverify.com/audio/"
    },
    "input/index.html": {
        "title": "Input Laboratory | GearVerify",
        "url": "https://gearverify.com/input/"
    },
    "webcam/index.html": {
        "title": "Webcam Laboratory | GearVerify",
        "url": "https://gearverify.com/webcam/"
    },
    "display/index.html": {
        "title": "Display Laboratory | GearVerify",
        "url": "https://gearverify.com/display/"
    },
    "laboratory/methodology.html": {
        "title": "Laboratory Methodology | GearVerify",
        "url": "https://gearverify.com/laboratory/methodology.html"
    },
}

# Guide pages (auto-generate from list)
GUIDE_PAGES = [
    "index.html",
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
    "silicon-lottery-webgpu.html",
    "signs-graphics-card-failing.html",
    "webgpu-vs-cuda-deep-dive.html",
]

for guide in GUIDE_PAGES:
    page_name = guide.replace('.html', '').replace('-', ' ').title()
    PAGE_METADATA[f"guides/{guide}"] = {
        "title": f"{page_name} | GearVerify",
        "url": f"https://gearverify.com/guides/{guide}"
    }

# Universal description
DESCRIPTION = "Zero-install hardware validation. Detect fake BIOS, verify VRAM signatures, and audit silicon integrity directly in your browser."

def generate_social_meta(title: str, url: str, description: str = DESCRIPTION) -> str:
    """Generate complete social meta tags block"""
    return f'''
    <!-- OpenGraph Meta Tags -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="https://gearverify.com/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="GearVerify Hardware Validation Laboratory">
    <meta property="og:url" content="{url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="GearVerify">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://gearverify.com/og-image.png">
    <meta name="twitter:image:alt" content="GearVerify Hardware Validation Laboratory">

    <!-- Theme Color -->
    <meta name="theme-color" content="#007AFF">'''

def add_social_meta_to_file(filepath: str, title: str, url: str) -> bool:
    """Add social meta tags to HTML file"""
    full_path = os.path.join(".", filepath)
    
    if not os.path.exists(full_path):
        print(f"⚠️  Not found: {filepath}")
        return False
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has OpenGraph tags
    if 'property="og:title"' in content:
        print(f"⏭️  Already has meta: {filepath}")
        return False
    
    # Generate meta tags
    meta_block = generate_social_meta(title, url)
    
    # Insert before </head>
    if '</head>' in content:
        content = content.replace('</head>', meta_block + '\n</head>', 1)
        
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Added meta: {filepath}")
        return True
    else:
        print(f"❌ No </head> found: {filepath}")
        return False

def main():
    """Process all HTML files"""
    updated = 0
    skipped = 0
    
    for filepath, metadata in PAGE_METADATA.items():
        success = add_social_meta_to_file(
            filepath,
            metadata['title'],
            metadata['url']
        )
        
        if success:
            updated += 1
        else:
            skipped += 1
    
    print(f"\n📊 Summary:")
    print(f"✅ Updated: {updated} files")
    print(f"⏭️  Skipped: {skipped} files")
    print(f"📱 Total pages now have social preview optimization!")

if __name__ == "__main__":
    main()
