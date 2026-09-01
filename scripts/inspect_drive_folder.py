import urllib.request
import re
import json

folder_id = '1d15Y0hqio9BbEzY87omM3vQLSH0tLQxg'
url = f'https://drive.google.com/drive/folders/{folder_id}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print(f"HTML length: {len(html)}")
        
        # Look for file IDs and names in Google Drive serialized data
        file_ids = set(re.findall(r'https://drive\.google\.com/file/d/([a-zA-Z0-9_-]{20,})', html))
        print("Found file links count:", len(file_ids))
        for fid in file_ids:
            print("File ID:", fid)
            
        # Also check for array of items [id, name, mimeType, ...]
        pdf_matches = re.findall(r'\["([a-zA-Z0-9_-]{25,})",\["([^"]+\.pdf)"', html)
        print("PDF matches:", pdf_matches)
        
        # Search for any PDF names mentioned
        pdf_names = set(re.findall(r'([A-Za-z0-9_\s\-\–\—\(\)\[\]\.\,\+]+?\.pdf)', html))
        print("PDF names found:", pdf_names)
except Exception as e:
    print("Error:", e)
