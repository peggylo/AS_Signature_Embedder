# Download and Delete Signatures Script

This Google Apps Script downloads signature images from URLs stored in a Google Sheet, uploads them to Google Drive, and deletes them after processing. It also inserts the downloaded image back into the sheet.

## How It Works
- Reads URLs from **Sheet2**, column B (signatures) and names from column A.
- Downloads the images from the URLs.
- Saves the images to Google Drive with the format `<name>_簽名.png`.
- Inserts the image back into column C of the sheet.
- Deletes the images from Google Drive after processing.

## Usage
1. Add the script to your Google Apps Script project.
2. Make sure to modify the sheet name (`Sheet2`) in the script if your Google Sheet has a different name.
3. Ensure the sheet's structure matches the expected format:
   - Column A: Names
   - Column B: Signature URLs
4. Run the script to process and clean up signatures.
