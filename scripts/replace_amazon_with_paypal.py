import re
import os

# Script to replace Amazon affiliate references with PayPal donation links
# PayPal donation link: https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID

base_dir = r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify"
updated_count = 0
files_updated = []

# PayPal donation button HTML
paypal_button = '''<a href="https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_BUTTON_ID" target="_blank" 
   style="display: inline-block; background: #0070BA; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: background 0.3s;">
    Donate via PayPal
</a>'''

# Walk through all HTML files
for root, dirs, files in os.walk(base_dir):
    # Skip node_modules and hidden directories
    if 'node_modules' in root or '/.git' in root or '\\.git' in root or 'scripts' in root:
        continue
    
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Replace "Amazon Associate Disclosure" with "Support GearVerify"
            content = re.sub(
                r'Amazon Associate Disclosure: As an Amazon Associate, we earn from qualifying purchases\.',
                'Support GearVerify: Help us maintain this free resource by donating via PayPal. Your support keeps our diagnostics open and accessible.',
                content,
                flags=re.IGNORECASE
            )
            
            # Replace shorter Amazon disclosure versions
            content = re.sub(
                r'Amazon Associate Disclosure.*?purchases',
                'Support GearVerify via PayPal donations',
                content,
                flags=re.IGNORECASE | re.DOTALL
            )
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_count += 1
                rel_path = os.path.relpath(filepath, base_dir)
                files_updated.append(rel_path)
                print(f"✅ Updated: {rel_path}")

print(f"\n✅ Updated {updated_count} files!")
print(f"\nNext steps:")
print(f"1. Create a PayPal donation button at: https://www.paypal.com/donate/buttons")
print(f"2. Replace 'YOUR_PAYPAL_BUTTON_ID' with your actual button ID")
print(f"3. Add the PayPal donation button to your footer or contact page")
