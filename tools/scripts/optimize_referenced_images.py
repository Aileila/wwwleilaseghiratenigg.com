import os
import re
from pathlib import Path
from urllib.parse import unquote, quote
from PIL import Image

def optimize_images():
    html_files = list(Path('.').rglob('*.html'))
    image_pattern = re.compile(r'assets/images/[\w\-/.]+\.(?:png|jpg|jpeg)', re.IGNORECASE)
    
    referenced_images = set()
    html_to_refs = {}

    for html_path in html_files:
        content = html_path.read_text(encoding='utf-8')
        matches = image_pattern.findall(content)
        if matches:
            referenced_images.update(matches)
            html_to_refs[html_path] = matches

    converted_count = 0
    total_size_before = 0
    total_size_after = 0
    conversion_map = {} # Original path string -> WebP path string
    
    for img_ref in referenced_images:
        # Unquote for local file access (e.g. %20 -> space)
        img_path_str = unquote(img_ref)
        img_path = Path(img_path_str)
        
        if img_path.exists() and img_path.is_file():
            webp_path = img_path.with_suffix('.webp')
            
            try:
                size_before = img_path.stat().st_size
                with Image.open(img_path) as img:
                    img.save(webp_path, 'WEBP', quality=80, method=6)
                
                size_after = webp_path.stat().st_size
                
                total_size_before += size_before
                total_size_after += size_after
                converted_count += 1
                
                # Keep original ref format (quoted or not) to replace later
                # We need to preserve the directory and filename structure
                webp_ref = str(Path(img_ref).with_suffix('.webp')).replace('\\', '/')
                conversion_map[img_ref] = webp_ref
                
            except Exception as e:
                print(f"Error converting {img_path}: {e}")

    modified_html_files = []
    
    for html_path, refs in html_to_refs.items():
        content = html_path.read_text(encoding='utf-8')
        original_content = content
        
        for ref in set(refs):
            if ref in conversion_map:
                # Replace exact match
                content = content.replace(ref, conversion_map[ref])
        
        if content != original_content:
            html_path.write_text(content, encoding='utf-8')
            modified_html_files.append(str(html_path))

    print(f"References found: {len(referenced_images)}")
    print(f"Images converted: {converted_count}")
    print(f"Total size before: {total_size_before / 1024:.2f} KB")
    print(f"Total size after: {total_size_after / 1024:.2f} KB")
    print(f"Modified HTML files ({len(modified_html_files)}):")
    for f in modified_html_files:
        print(f" - {f}")

if __name__ == '__main__':
    optimize_images()
