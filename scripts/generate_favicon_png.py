"""
Generate a 32x32 favicon.png from the existing favicon.svg design.
Shield with checkmark in GearVerify blue gradient.
"""
from PIL import Image, ImageDraw

# Create 32x32 transparent image
img = Image.new('RGBA', (32, 32), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# Define GearVerify blue color
blue = (0, 122, 255)
light_blue = (0, 122, 255, 26)  # Semi-transparent

# Draw shield outline
shield_points = [
    (16, 3),   # Top center
    (27, 8),   # Top right
    (27, 16),  # Right middle
    (22, 27),  # Bottom right
    (16, 30),  # Bottom center
    (10, 27),  # Bottom left
    (5, 16),   # Left middle
    (5, 8),    # Top left
]
draw.polygon(shield_points, outline=blue, fill=light_blue)

# Draw checkmark
checkmark_points = [
    (11, 14),  # Left point
    (14, 17),  # Bottom point
    (21, 11),  # Right point (top)
]
draw.line(checkmark_points[:2], fill=blue, width=2)
draw.line(checkmark_points[1:], fill=blue, width=2)

# Save
img.save('favicon.png')
print('✅ Created favicon.png (32x32)')
