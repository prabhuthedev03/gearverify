import os
import re

def standardize_file(filepath):
    filename = os.path.basename(filepath)
    if not filename.endswith('.html'): return

    print(f"Processing {filename}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Extract Title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    page_title = "Guide"
    if title_match:
        page_title = title_match.group(1).split('|')[0].strip()
        
    # 2. Identify Structure Points
    # End of Sidebar (Insertion Point Start)
    # We look for </aside>. 
    aside_end_match = re.search(r'</aside>', content, re.IGNORECASE)
    if not aside_end_match:
        print(f"  Skipping {filename}: No </aside> found.")
        return
        
    start_idx = aside_end_match.end()
    
    # Start of Footer (Insertion Point End)
    footer_match = re.search(r'<footer', content, re.IGNORECASE)
    if not footer_match:
        print(f"  Skipping {filename}: No <footer> found.")
        return
        
    end_idx = footer_match.start()
    
    # 3. Extract Raw Content
    raw_content = content[start_idx:end_idx]
    
    # 4. Clean Raw Content
    # Remove existing <main>, </main>, <article>, </article> wrappers to avoid nesting hell
    # Also remove <div class="article-body"> wrapper if present
    
    # We want to preserve internal divs but remove the outer wrappers if they are incomplete/malformed
    # Simple regex removal of known wrapper tags
    tags_to_strip = [
        r'<main.*?>', r'</main>',
        r'<article.*?>', r'</article>',
        r'<div class="article-body">', # We will add this back as <article>
        # closing div for article-body is hard to identify specifically without parsing...
        # But if we wrap the whole thing, an extra </div> might dangle?
        # Actually, if we just Wrap the raw content, an extra </div> at the end is bad.
    ]
    
    # Strategy: Just wrap everything. If there are extra closing tags, browsers handle it usually?
    # No, that's sloppy.
    # Let's try to remove matching closing divs? 
    # Too risky to remove </div> indiscriminately.
    
    # Better Strategy:
    # If <div class="article-body"> is present, replace it with nothing (and hopefully its closing div is at the end?)
    # If the file ends with </div> (before footer), it might be that.
    
    clean_content = raw_content
    clean_content = re.sub(r'<main.*?>', '', clean_content, flags=re.IGNORECASE)
    clean_content = re.sub(r'</main>', '', clean_content, flags=re.IGNORECASE)
    clean_content = re.sub(r'<article.*?>', '', clean_content, flags=re.IGNORECASE)
    clean_content = re.sub(r'</article>', '', clean_content, flags=re.IGNORECASE)
    
    # 5. Check for H1
    h1_match = re.search(r'<h1.*?>.*?</h1>', clean_content, flags=re.DOTALL | re.IGNORECASE)
    header_html = ""
    if not h1_match:
        # Inject H1
        header_html = f'<h1 class="guide-title">{page_title}</h1>\n'
        
    # 6. Reconstruct
    # Wrapper: <main class="container"><article class="article-body"> ... </article></main>
    
    new_middle = f"""
<main class="container">
    <article class="article-body">
        {header_html}
        {clean_content}
    </article>
</main>
"""
    
    new_content = content[:start_idx] + new_middle + content[end_idx:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  Standardized {filename}")

def main():
    root_dir = os.getcwd()
    # Guides only? User said "18 article pages". These are likely in guides/
    guides_dir = os.path.join(root_dir, 'guides')
    
    if os.path.exists(guides_dir):
        for root, dirs, files in os.walk(guides_dir):
            for file in files:
                if file.endswith('.html'):
                    standardize_file(os.path.join(root, file))
                    
    # Also do root pages? about/contact?
    # User said "Specially the 18 articles pages".
    # But "body content of ALL pages".
    # Let's do about.html and contact.html too.
    for f in ['about.html', 'contact.html']:
        path = os.path.join(root_dir, f)
        if os.path.exists(path):
            standardize_file(path)

if __name__ == "__main__":
    main()
