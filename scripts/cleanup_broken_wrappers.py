import os
import re

GUIDES_DIR = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\guides"

def clean_broken_wrappers(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern: 
    # <div class="tech-spec-wrapper"> ... header ... </div> 
    # followed immediately by something that is NOT <table
    
    # We can just remove the wrapper start and header if we see it followed by <!-- Related or </article> or similar?
    # Or just remove all tech-spec-wrapper blocks completely, allowing inject_evidence to start fresh?
    
    # Yes, removing ALL tech-spec-wrapper blocks (broken or not) is safer if we are going to re-inject.
    # PROB: If I have a broken wrapper (no closing div), how do I define the end?
    # A broken wrapper in my specific case ends at the regex match point in the *previous* script.
    # The previous script matched `</table>\s*</div>`.
    # So it left the file content: `[Wrapper Start] [Header] [Gap] [Rest of File]`.
    # So `tech-spec-wrapper` is effectively unclosed and spans the rest of the file layout-wise (until next div close which might be main).
    
    # To fix this, I should find `<div class="tech-spec-wrapper">...<div class="tech-spec-header">...</div>`
    # And replace it with empty string.
    
    pattern = re.compile(r'<div class="tech-spec-wrapper">\s*<div class="tech-spec-header">.*?</div>', re.DOTALL)
    
    if pattern.search(content):
        print(f"Removing broken wrapper in {os.path.basename(filepath)}")
        content = pattern.sub('', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    for filename in os.listdir(GUIDES_DIR):
        if filename.endswith(".html") and filename != "index.html":
            clean_broken_wrappers(os.path.join(GUIDES_DIR, filename))

if __name__ == "__main__":
    main()
