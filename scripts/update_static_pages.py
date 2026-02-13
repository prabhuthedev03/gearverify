import re
import os

static_pages = [
    "about.html",
    "contact.html",
    "contributors.html",
    "methodology.html",
    "terms.html",
    "privacy.html"
]

base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"

# Blue gradient style to match home page hero
blue_gradient_style = 'background: linear-gradient(180deg, #007AFF 0%, #0056B3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #007AFF; font-size: 2.5rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 1.5rem;'

for page_file in static_pages:
    filepath = os.path.join(base_dir, page_file)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update h1 with class="guide-title" or first h1 in article-body
        # Pattern 1: h1 with guide-title class
        content = re.sub(
            r'(<h1 class="guide-title")(\s+style="[^"]*")?(>)',
            rf'\1 style="{blue_gradient_style}"\3',
            content
        )
        
        # Pattern 2: First h1 inside article-body without guide-title class
        content = re.sub(
            r'(<article class="article-body">.*?<h1)(\s+style="[^"]*")?(>)',
            rf'\1 style="{blue_gradient_style}"\3',
            content,
            count=1,
            flags=re.DOTALL
        )
        
        # Add table borders if tables exist
        content = re.sub(
            r'<table',
            '<table style="border: 1px solid rgba(0,0,0,0.1); border-collapse: collapse; width: 100%; margin: 1.5rem 0;"',
            content
        )
        
        content = re.sub(
            r'<th>',
            '<th style="border: 1px solid rgba(0,0,0,0.1); padding: 0.75rem; background: var(--surface-color); font-weight: 600;">',
            content
        )
        
        content = re.sub(
            r'<td>',
            '<td style="border: 1px solid rgba(0,0,0,0.1); padding: 0.75rem;">',
            content
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated: {page_file}")
    else:
        print(f"❌ Not found: {page_file}")

print("\n✅ All static pages updated with blue gradient headings and table borders!")
