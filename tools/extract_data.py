
import csv
import json
import os

csv_path = '分析.csv'
js_output_path = 'legendary_stats.js'

data_map = {}

def safe_float(val):
    try:
        return float(val)
    except:
        return 0

if os.path.exists(csv_path):
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        try:
            # Skip first 10 lines (headers)
            for _ in range(10):
                next(reader)
            
            for row in reader:
                if not row or not row[0]: # Skip empty rows
                    continue
                
                try:
                    char_id = row[0].strip()
                    name = row[1].strip()
                    board = row[2].strip() # 1 or 2
                    element = row[3].strip()
                    position = row[4].strip()
                    
                    # Store by Name or ID? Using Name is easier for preset mapping, but ID is cleaner.
                    # Let's use Name as primary key for now to match basaraStats style
                    
                    if name not in data_map:
                        data_map[name] = {
                            'id': char_id,
                            'pos': position,
                            'el': element,
                            'r1': {},
                            'r2': {}
                        }
                    
                    # Base Stats (Cols 5-11)
                    stats = {
                        'k': safe_float(row[5]),
                        'c': safe_float(row[6]),
                        't': safe_float(row[7]),
                        'p': safe_float(row[8]),
                        'ph': safe_float(row[9]), 
                        'a': safe_float(row[10]),
                        'i': safe_float(row[11])
                    }

                    # Board Stats (Cols 12-18)
                    # 12: Board Kick, 13: Board Ctrl, ...
                    try:
                        board_k = safe_float(row[12])
                        board_c = safe_float(row[13])
                        board_t = safe_float(row[14])
                        board_p = safe_float(row[15])
                        board_ph = safe_float(row[16])
                        board_a = safe_float(row[17])
                        board_i = safe_float(row[18])

                        stats['k'] += board_k
                        stats['c'] += board_c
                        stats['t'] += board_t
                        stats['p'] += board_p
                        stats['ph'] += board_ph
                        stats['a'] += board_a
                        stats['i'] += board_i
                    except IndexError:
                        pass # Some rows might not have board stats or trailing commas

                    if board == '1':
                        data_map[name]['r1'] = stats
                    elif board == '2':
                        data_map[name]['r2'] = stats
                        
                except IndexError:
                    continue
                    
        except StopIteration:
            pass

# Output JS
with open(js_output_path, 'w', encoding='utf-8') as f:
    f.write('// Data extracted from 分析.csv\n')
    f.write('window.legendaryStats = ')
    f.write(json.dumps(data_map, ensure_ascii=False, indent=2))
    f.write(';')

print(f"Extracted {len(data_map)} characters.")
