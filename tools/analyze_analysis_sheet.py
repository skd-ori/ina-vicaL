import pandas as pd
import os

file_path = '分析.xlsx'

try:
    xls = pd.ExcelFile(file_path)
    print("Sheet names:", xls.sheet_names)
    
    # Iterate sheets to find relevant data
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name, nrows=200) # Read first 200 rows
        print(f"\n--- Sheet: {sheet_name} ---")
        
        # Search for names
        for index, row in df.iterrows():
            row_str = row.astype(str).str.cat(sep=' ')
            if 'ザナーク' in row_str or '風丸' in row_str or '壁山' in row_str or '黄名子' in row_str:
                print(f"Row {index}: {row_str}")

except Exception as e:
    print(f"Error: {e}")
