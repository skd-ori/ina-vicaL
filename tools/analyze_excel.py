
import pandas as pd
import os

file_path = "TOTAL AT 計算表（50lvシンク）.xlsx"

if not os.path.exists(file_path):
    print(f"Error: File not found at {file_path}")
    exit(1)

try:
    # Load the Excel file to get sheet names
    xl = pd.ExcelFile(file_path)
    print(f"Sheet names: {xl.sheet_names}")

    # Read the first sheet (assuming it's the main one)
    # If there are multiple relevant sheets, we might need to iterate
    for sheet_name in xl.sheet_names:
        print(f"\n--- Sheet: {sheet_name} (First 10 rows) ---")
        df = xl.parse(sheet_name)
        # Display all columns
        pd.set_option('display.max_columns', None)
        pd.set_option('display.width', 1000)
        print(df.head(10))
        print("\nColumn Types:")
        print(df.dtypes)

except Exception as e:
    print(f"An error occurred: {e}")
