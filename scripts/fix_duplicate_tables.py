import os
import re

GUIDES_DIR = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides"

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to remove <table class="tech-spec-table">...</table>...</div>
    # BUT ONLY if it is NOT preceded by <div class="tech-spec-header">...</div>
    
    # Let's find all tables and check their context
    # Regex for table block: <table class="tech-spec-table">.*?</table>
    table_pattern = re.compile(r'(<table class="tech-spec-table">.*?</table>\s*</div>)', re.DOTALL)
    
    new_content = user_content = content
    offset = 0
    
    matches = list(table_pattern.finditer(content))
    # Process from end to start to avoid index shift issues
    for match in reversed(matches):
        start = match.start()
        end = match.end()
        
        # Check preceding 150 chars for "tech-spec-header"
        preceding = content[max(0, start-150):start]
        
        if 'class="tech-spec-header"' not in preceding:
            print(f"Removing naked table in {os.path.basename(filepath)} at index {start}")
            # This is a debris table
            new_content = new_content[:start] + new_content[end:]
        else:
             print(f"Keeping valid table in {os.path.basename(filepath)} at index {start}")

    if len(new_content) < len(content):
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    print("Scanning for duplicate tables...")
    for filename in os.listdir(GUIDES_DIR):
        if filename.endswith(".html") and filename != "index.html":
            fix_file(os.path.join(GUIDES_DIR, filename))

if __name__ == "__main__":
    main()
