import re
import os

# Standard footer HTML from guides page
standard_footer = '''<footer class="master-footer">
    <div class="footer-content">
        <!-- Column 1: Mission -->
        <div class="footer-col">
            <h3>GearVerify</h3>
            <p>Browser-based hardware validation. Empowering users with transparent, client-side diagnostics for modern
                hardware.</p>
        </div>

        <!-- Column 2: Links -->
        <div class="footer-col">
            <h3>Resources</h3>
            <ul class="footer-links">
                <li><a href="/methodology.html">Methodology</a></li>
                <li><a href="/privacy.html">Privacy Policy</a></li>
                <li><a href="/terms.html">Terms of Service</a></li>
                <li><a href="/contributors.html">Contributors</a></li>
            </ul>
        </div>

        <!-- Column 3: Trust -->
        <div class="footer-col">
            <h3>Transparency</h3>
            <div class="trust-content">
                <p class="disclosure">Amazon Associate Disclosure: As an Amazon Associate, we earn from qualifying
                    purchases.</p>
                <a href="/about.html#conflict" class="conflict-link">Conflict of Interest Policy</a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; <span id="current-year">2026</span> GearVerify. All rights reserved.</p>
    </div>
</footer>
<script>
    // Update copyright year dynamically
    document.getElementById('current-year').textContent = new Date().getFullYear();
</script>'''

# All files to update
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
        
        # Pattern to match the entire footer section (from <footer> to </footer> and its script)
        footer_pattern = r'<footer class="master-footer">.*?</footer>\s*<script>.*?document\.getElementById\(\'current-year\'\)\.textContent = new Date\(\)\.getFullYear\(\);.*?</script>'
        
        if re.search(footer_pattern, content, re.DOTALL):
            # Replace the footer
            content = re.sub(footer_pattern, standard_footer, content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            print(f"✅ Updated: {filename}")
        else:
            print(f"⚠️  Footer pattern not found: {filename}")
    else:
        print(f"❌ Not found: {filename}")

print(f"\n✅ Standardized footer in {updated_count} files!")
print("All pages now use the guides page footer format")
