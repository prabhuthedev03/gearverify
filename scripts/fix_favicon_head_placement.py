"""
Fix favicon links placement: Move from <body> to <head>
The bulk script incorrectly added them after SVG links which were in body.
This script removes them from body and adds them to head properly.
"""
import os
import re

html_files = [
    "index.html", "about.html", "contact.html", "privacy.html", "terms.html",
    "contributors.html", "methodology.html",
    "cpu/index.html", "gpu/index.html", "ram/index.html", "audio/index.html",
    "input/index.html", "webcam/index.html", "display/index.html",
    "laboratory/methodology.html", "guides/index.html",
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

favicon_links = '''    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" type="image/png" href="/favicon.png">
    <link rel="manifest" href="/site.webmanifest">'''

fixed_count = 0

for filepath in html_files:
    full_path = os.path.join(".", filepath)
    
    if not os.path.exists(full_path):
        print(f"⚠️  Not found: {filepath}")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove favicon links from anywhere in body (after <body> tag)
    # Pattern to match favicon block in body
    body_favicon_pattern = r'\s*<!--\s*Blue Icon Favicon\s*-->\s*<link[^>]*favicon[^>]*>(?:\s*<link[^>]*favicon[^>]*>)*(?:\s*<link[^>]*manifest[^>]*>)?'
    content = re.sub(body_favicon_pattern, '', content, flags=re.IGNORECASE)
    
    # Also remove standalone favicon links in body
    content = re.sub(r'<body>\s*<link rel="icon"[^>]*>\s*<link rel="alternate icon"[^>]*>\s*<link rel="manifest"[^>]*>', '<body>', content)
    content = re.sub(r'<body>\s*<link rel="icon"[^>]*>', '<body>', content)
    
    # Remove any remaining favicon links in body section
    lines = content.split('\n')
    in_body = False
    cleaned_lines = []
    
    for line in lines:
        if '<body>' in line.lower():
            in_body = True
        if '</body>' in line.lower():
            in_body = False
        
        # Skip favicon lines in body
        if in_body and ('favicon' in line.lower() or 'manifest' in line.lower()) and '<link' in line:
            continue
        
        cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    # Now add favicon links to head (before </head>)
    if favicon_links not in content:
        content = re.sub(r'(\s*</head>)', favicon_links + r'\n\1', content, count=1)
        
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Fixed: {filepath}")
        fixed_count += 1
    else:
        print(f"⏭️  Already correct: {filepath}")

print(f"\n📊 Fixed {fixed_count} files")
print("✅ All favicon links now in <head> section!")
