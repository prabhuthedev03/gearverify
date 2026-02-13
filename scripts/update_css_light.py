import re

# Read the current globals.css
with open(r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\styles\globals.css", 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the :root section with light theme
old_root = r''':root \{
    --bg-color: #000000;
    --surface-color: #1d1d1f;
    --surface-dark: #1d1d1f;
    --text-primary: #f5f5f7;
    --text-secondary: #86868b;
    --accent-blue: #2997ff;
   --accent-cyan: #00d9ff;
    --accent-gradient: linear-gradient\(135deg, #2997ff 0%, #007aff 100%\);
    --brand-gradient: linear-gradient\(135deg, #2c3e50 0%, #000000 100%\);
    --glass-bg: rgba\(255, 255, 255, 0.05\);
    --glass-border: rgba\(255, 255, 255, 0.1\);
    --border-color: rgba\(255, 255, 255, 0.1\);
    --card-shadow: 0 4px 6px -1px rgba\(0, 0, 0, 0.3\), 0 2px 4px -1px rgba\(0, 0, 0, 0.2\);
    --hover-shadow: 0 20px 40px rgba\(0, 0, 0, 0.5\);
    --bento-border: 1px solid rgba\(255, 255, 255, 0.05\);
\}'''

new_root = ''':root {
    --bg-color: #ffffff;
    --surface-color: #f5f5f7;
    --surface-dark: #1d1d1f;
    --text-primary: #1d1d1f;
    --text-secondary: #86868b;
    --accent-blue: #007AFF;
    --accent-cyan: #00d9ff;
    --accent-gradient: linear-gradient(135deg, #2997ff 0%, #007aff 100%);
    --brand-gradient: linear-gradient(135deg, #2c3e50 0%, #000000 100%);
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.5);
    --border-color: #d2d2d7;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    --hover-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    --bento-border: 1px solid rgba(0, 0, 0, 0.05);
}'''

content = re.sub(old_root, new_root, content, flags=re.DOTALL)

# Write back
with open(r"c:\Users\prabh\OneDrive\Documents\GitHub\gearverify\styles\globals.css", 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Light theme CSS variables applied!")
