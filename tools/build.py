import os
import re

# Config
SRC_DIR = 'src'
INDEX_FILE = 'index.html'
OUTPUT_FILE = 'ina-vicaL_single.html'

def bundle():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # Root
    src_path = os.path.join(base_dir, SRC_DIR, INDEX_FILE)
    output_path = os.path.join(base_dir, OUTPUT_FILE)

    print(f"Reading from: {src_path}")
    
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Inline CSS
    # Match <link rel="stylesheet" href="...">
    def replace_css(match):
        href = match.group(1)
        if href.startswith('http') or href.startswith('//'):
            return match.group(0) # Skip remote
        
        css_path = os.path.join(base_dir, SRC_DIR, href)
        print(f"  Inlining CSS: {href}")
        try:
            with open(css_path, 'r', encoding='utf-8') as cf:
                css_content = cf.read()
            return f'<style>\n{css_content}\n</style>'
        except FileNotFoundError:
            print(f"  [Error] CSS file not found: {css_path}")
            return match.group(0)

    content = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>', replace_css, content)

    # 2. Inline JS
    # Match <script src="..."></script>
    def replace_js(match):
        src = match.group(1)
        if src.startswith('http') or src.startswith('//'):
            return match.group(0) # Skip remote

        js_path = os.path.join(base_dir, SRC_DIR, src)
        print(f"  Inlining JS: {src}")
        try:
            with open(js_path, 'r', encoding='utf-8') as jf:
                js_content = jf.read()
            return f'<script>\n{js_content}\n</script>'
        except FileNotFoundError:
            print(f"  [Error] JS file not found: {js_path}")
            return match.group(0)

    content = re.sub(r'<script\s+src="([^"]+)"\s*></script>', replace_js, content)

    # Write Output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Build complete! Output saved to: {output_path}")

if __name__ == '__main__':
    bundle()
