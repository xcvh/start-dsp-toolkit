import re

# Read the file
with open('EDITOR_GUIDE.typ', 'r') as f:
    content = f.read()

# Remove section 7 (Choose a Tool) since no screenshot was specified for it
content = re.sub(
    r'=== Choose a Tool\n\nYou\'ll see a list of all 24 tools\. Click on the tool you want to edit\.\n\nEach tool shows:\n- Tool number \(e\.g\., "01"\)\n- Tool name\n- A preview image\n\n#figure\(\n  image\("screenshots/07-tools-list\.png", width: 100%\),\n  caption: "List of tools in your selected language"\n\)\n\n',
    '',
    content
)

# Update section 8 to use the correct screenshot
content = content.replace(
    'image("screenshots/08-tool-editing-form.png", width: 100%)',
    'image("screenshots/10-decap-tool-edit-page.png", width: 100%)'
)

# Update publish dialog reference
content = content.replace(
    'image("screenshots/12-publish-dialog.png", width: 100%)',
    'image("screenshots/12-publish-button-pressed.png", width: 100%)'
)

# Write back
with open('EDITOR_GUIDE.typ', 'w') as f:
    f.write(content)

print("Screenshots updated successfully!")
