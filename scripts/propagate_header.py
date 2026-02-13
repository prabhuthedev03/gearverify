import os
import re

# correct new header HTML
NEW_HEADER_BLOCK = """
    <!-- Blue Icon Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <header class="master-header">
        <div class="header-content">
            <a href="/" class="logo-container">
                <img src="/favicon.svg" alt="GearVerify" class="logo-icon" style="width: 42px; height: 42px;">
                <span class="site-title" style="color: #007AFF;">GearVerify</span>
            </a>

            <!-- Desktop Navigation (Apple Style) -->
            <nav class="desktop-nav">
                <a href="/guides/">Guides</a>
                <a href="/about.html">About Us</a>
                <a href="/contact.html">Contact Us</a>
            </nav>

            <!-- Mobile Burger Trigger -->
            <button class="hamburger-btn" aria-label="Menu" id="menu-trigger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <!-- Sidebar Menu (Simplified & Beautified) -->
    <aside class="sidebar-menu" id="sidebar-menu">
        <div class="sidebar-header">
            <span class="sidebar-title">Menu</span>
            <button class="close-btn" id="menu-close">&times;</button>
        </div>

        <nav class="sidebar-nav">
            <ul class="nav-list" style="max-height: none; padding-left: 0; padding-top: 1rem;">
                <li>
                    <a href="/guides/" class="sidebar-link">
                        <span class="link-icon">📚</span>
                        <span class="link-text">Guides</span>
                    </a>
                </li>
                <li>
                    <a href="/about.html" class="sidebar-link">
                        <span class="link-icon">🏢</span>
                        <span class="link-text">About Us</span>
                    </a>
                </li>
                <li>
                    <a href="/contact.html" class="sidebar-link">
                        <span class="link-icon">📩</span>
                        <span class="link-text">Contact Us</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
"""

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return

    original_len = len(content)
    print(f"Processing {filepath} ({original_len} bytes)...")
    
    # 0. Repair Missing Body (Critical for broken files)
    if not re.search(r'<body.*?>', content, re.IGNORECASE):
        print("  WARNING: No <body> tag. Attempting repair...")
        if '</head>' in content:
            content = content.replace('</head>', '</head>\n<body>')
        else:
            # Last ditch: insert at start if no head?
            content = '<body>\n' + content
            
    # 1. Clean up Favicons
    content = re.sub(r'<link rel="icon".*?>', '', content, flags=re.DOTALL | re.IGNORECASE)

    # 2. STRATEGY: Find Content Anchor using REGEX (Case Insensitive)
    body_match = re.search(r'<body.*?>', content, flags=re.IGNORECASE)
    if not body_match:
        print(f"Skipping {filepath}: No <body> tag found even after repair.")
        return
    
    body_start_idx = body_match.end()
    
    # Potential Anchors Regex Patterns
    # We want to find the FIRST occurrence of any of these AFTER the body tag
    anchor_patterns = [
        r'<main\b.*?>',
        r'<article\b.*?>',
        r'<div class="container".*?>',
        r'<div class="article-container".*?>',
        r'<h1\b.*?>'
    ]
    
    best_anchor_idx = -1
    best_anchor_match = None
    
    for pattern in anchor_patterns:
        match = re.search(pattern, content[body_start_idx:], flags=re.IGNORECASE)
        if match:
            # Calculate absolute index
            abs_start = body_start_idx + match.start()
            # If this is the earliest anchor found so far (or first one), keep it
            if best_anchor_idx == -1 or abs_start < best_anchor_idx:
                best_anchor_idx = abs_start
                best_anchor_match = match
    
    if best_anchor_idx != -1:
        print(f"  Found anchor '{best_anchor_match.group(0)}' at index {best_anchor_idx}. Slicing junk.")
        
        pre_body = content[:body_start_idx]
        post_anchor = content[best_anchor_idx:]
        
        # Inject Header
        content = pre_body + '\n' + NEW_HEADER_BLOCK + '\n' + post_anchor
    else:
        print(f"  No transparent content anchor found. Falling back to simple injection.")
        
        # Fallback: Just append header after body if not present
        if 'master-header' not in content:
             content = content.replace(body_match.group(0), body_match.group(0) + '\n' + NEW_HEADER_BLOCK)


    # 7. Ensure CSS/JS References
    if 'styles/globals.css' not in content:
         if '</head>' in content:
            content = content.replace('</head>', '    <link rel="stylesheet" href="/styles/globals.css">\n</head>')
    
    # Fix paths
    content = content.replace('href="styles/globals.css"', 'href="/styles/globals.css"')
    content = content.replace('href="../styles/globals.css"', 'href="/styles/globals.css"')

    if 'js/main.js' not in content:
        if '</body>' in content:
            content = content.replace('</body>', '    <script src="/js/main.js"></script>\n</body>')
            
    content = content.replace('src="js/main.js"', 'src="/js/main.js"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} (Size: {len(content)} bytes)")

def get_files_from_sitemap(root_dir):
    sitemap_path = os.path.join(root_dir, 'sitemap.xml')
    if not os.path.exists(sitemap_path):
        print("sitemap.xml not found!")
        return []

    files_to_process = []
    try:
        import xml.etree.ElementTree as ET
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        
        # Namespace map might be needed
        ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        for url in root.findall('ns:url', ns):
            loc = url.find('ns:loc', ns).text
            # Convert URL to local path
            # Remove domain
            path_part = loc.replace('https://gearverify.com/', '')
            
            if path_part == '' or path_part == '/':
                local_path = 'index.html'
            elif path_part.endswith('/'):
                local_path = os.path.join(path_part, 'index.html').replace('/', os.sep)
            else:
                local_path = path_part.replace('/', os.sep)
                
            full_path = os.path.join(root_dir, local_path)
            
            # Verify file exists
            if os.path.exists(full_path):
                files_to_process.append(full_path)
            else:
                print(f"Warning: File from sitemap not found: {full_path}")
                
    except Exception as e:
        print(f"Error parsing sitemap: {e}")
        
    return files_to_process

def main():
    root_dir = os.getcwd()
    print(f"Root Dir: {root_dir}")
    
    # Get files from sitemap
    files = get_files_from_sitemap(root_dir)
    print(f"Found {len(files)} files in sitemap.xml")
    
    for filepath in files:
        process_file(filepath)

if __name__ == '__main__':
    main()
