import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    needs_fix = False
    
    # Check 1: Inverted Structure (Body before Doctype)
    if content.strip().startswith('<body') and '<!DOCTYPE' in content:
        needs_fix = True
        print(f"Fixing INVERTED file: {filepath}")
        
        # Extract Doctype/Head
        # Look for <!DOCTYPE until <body (the original body, if present) or just until some known start?
        # Actually, in the observed broken state: <body>...Header... <!DOCTYPE ... <head> ... 
        # The content seems to follow head.
        
        # Regex to capture from DOCTYPE to end? Or DOCTYPE to </head>?
        head_match = re.search(r'(<!DOCTYPE.*?</head>)', content, flags=re.DOTALL | re.IGNORECASE)
        head_block = ""
        
        if head_match:
            head_block = head_match.group(1)
            content = content.replace(head_block, '')
        else:
            # Maybe </head> is missing? Try DOCTYPE to <body?
            # Or DOCTYPE to end of file? (Unlikely)
            start_doc = content.find('<!DOCTYPE')
            if start_doc != -1:
                # Assuming head ends before the next tag that isn't meta/link/title?
                # Or just grab everything from whitespace?
                # Let's panic-match: everything from DOCTYPE to next <div or <main or <body?
                end_head = content.find('<body', start_doc + 10)
                if end_head == -1: end_head = content.find('<div', start_doc)
                if end_head == -1: end_head = content.find('<main', start_doc)
                
                if end_head != -1:
                    head_block = content[start_doc:end_head]
                    content = content.replace(head_block, '')
                    # Add closing head if missing
                    if '</head>' not in head_block:
                        head_block += '\n</head>'
        
        if not head_block:
             print(f"  Failed to extract head from {filepath}. Using DEFAULT.")
             head_block = get_default_head(filename)

        # Clean "Fake" Body (the one at start)
        # It's usually '<body>' + HeaderBlock.
        # Header block starts with <!-- Blue Icon... --> or similar.
        # We want to keep the HeaderBlock!
        # Just remove the leading <body>.
        content = re.sub(r'^\s*<body.*?>', '', content, flags=re.IGNORECASE).strip()
        
        # Construct
        new_content = head_block + '\n<body>\n' + content + '\n</body>'
        
        # Cleanup double tags
        new_content = re.sub(r'</body>\s*</body>', '</body>', new_content, flags=re.IGNORECASE)
        new_content = re.sub(r'</html>\s*</html>', '</html>', new_content, flags=re.IGNORECASE)
        new_content = new_content.replace('<body>\n<body>', '<body>')
        
        # Ensure </html> at end
        if '</html>' not in new_content:
            new_content += '\n</html>'
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  Fixed INVERTED {filepath}")
        return

    # Check 2: Missing Head (Deleted)
    if content.strip().startswith('<body') and '<!DOCTYPE' not in content:
        needs_fix = True
        print(f"Fixing HEADLESS file: {filepath}")
        
        head_block = get_default_head(filename)
        
        # Remove leading body
        content = re.sub(r'^\s*<body.*?>', '', content, flags=re.IGNORECASE).strip()
        
        new_content = head_block + '\n<body>\n' + content + '\n</body>'
        
         # Cleanup double tags
        new_content = re.sub(r'</body>\s*</body>', '</body>', new_content, flags=re.IGNORECASE)
        new_content = re.sub(r'</html>\s*</html>', '</html>', new_content, flags=re.IGNORECASE)
        
        if '</html>' not in new_content:
            new_content += '\n</html>'

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  Fixed HEADLESS {filepath}")
        return

def get_default_head(filename):
    title = "GearVerify Laboratory"
    if 'contact' in filename: title = "Contact | GearVerify"
    elif 'about' in filename: title = "About Us | GearVerify"
    elif 'stress' in filename: title = "GPU Stress Test Guide | GearVerify"
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="/styles/globals.css">
</head>"""

def main():
    root_dir = os.getcwd()
    # Target recursively
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
