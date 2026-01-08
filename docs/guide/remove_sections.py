import re

# Read the file
with open('EDITOR_GUIDE.typ', 'r') as f:
    content = f.read()

# Remove the email verification section (from "=== Complete the Verification" to before "=== Finish Setup")
content = re.sub(
    r'=== Complete the Verification\n\nGitHub will ask you to:\n1\. Verify you\'re human \(solve a puzzle\)\n2\. Verify your email address \(check your inbox for a verification email\)\n\nClick the verification link in the email GitHub sends you\.\n\n#figure\(\n  image\("screenshots/02-email-verification\.png", width: 100%\),\n  caption: "GitHub verification email"\n\)\n\n',
    '',
    content
)

# Remove the language navigation section
content = re.sub(
    r'=== Navigate to Your Language\n\nOn the Decap CMS dashboard, you\'ll see different collections on the left side:\n\n- \*Tools \(English\)\*\n- \*Tools \(Spanish\)\*\n- \*Tools \(German\)\*\n- \*Tools \(Greek\)\*\n- \*UI Translations\*\n\nClick on the language you want to edit \(e\.g\., "Tools \(Spanish\)" if you\'re editing Spanish translations\)\.\n\n#figure\(\n  image\("screenshots/06-language-collection\.png", width: 100%\),\n  caption: "Selecting a language collection"\n\)\n\n',
    '',
    content
)

# Remove the image editing section
content = re.sub(
    r'#pagebreak\(\)\n\n=== Editing Images\n\nEach tool has an image\. To change it:\n\n1\. Click on the image field\n2\. You can either:\n   - \*Upload a new image:\* Click "Upload" and select a file from your computer\n   - \*Choose an existing image:\* Click "Choose existing" to select from uploaded images\n\n#figure\(\n  image\("screenshots/09-image-upload-dialog\.png", width: 100%\),\n  caption: "Uploading or selecting a tool image"\n\)\n\n#colorbox\(\n  title: "Image Guidelines",\n  color: "blue",\n  radius: 5pt,\n  width: auto\n\)\[\n  - \*Format:\* JPG or PNG\n  - \*Size:\* At least 800×600 pixels\n  - \*File size:\* Under 2 MB\n  - \*Content:\* Professional, relevant to the tool\n\]\n\n',
    '#pagebreak()\n\n',
    content
)

# Remove the downloads editing section  
content = re.sub(
    r'=== Editing Downloads/Files\n\nEach tool can have downloadable files \(PDFs, templates, etc\.\)\. To manage them:\n\n1\. Scroll to the "Downloads" section\n2\. Each download has:\n   - \*Title:\* The link text users will see\n   - \*File:\* The actual downloadable file\n\nTo add a new download:\n1\. Click "\+ Add Downloads"\n2\. Enter a title\n3\. Upload the file\n\nTo remove a download:\n1\. Click the ❌ next to the download\n2\. Confirm deletion\n\n#figure\(\n  image\("screenshots/10-downloads-section\.png", width: 100%\),\n  caption: "Managing tool downloads"\n\)\n\n',
    '',
    content
)

# Write back
with open('EDITOR_GUIDE.typ', 'w') as f:
    f.write(content)

print("Sections removed successfully!")
