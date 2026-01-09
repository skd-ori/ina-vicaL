# Project Structure Refactoring Plan

## Goal
Clean up the root directory and organize files into logical subdirectories (`tools`, `data`, `docs`) to make the project easier to manage.

## Proposed Changes

### Directory Structure
- **`tools/`**: Will contain all analysis scripts and tools.
- **`data/`**: Will contain raw data files (Excel, CSV) and data folders.
- **`docs/`**: Existing documentation.
- **`src/` (Virtual)**: The root directory will remain the home for the Web Application (`index.html`, `js`, `css`).

### Moves

#### To `tools/`
- `*.ps1` (PowerShell scripts for analysis)
- `*.py` (Python scripts for data extraction)
- `open_with_chrome.bat`
- `analyze_excel.js`

#### To `data/`
- `*.xlsx` (Excel data sheets)
- `*.csv` (CSV exports)
- `*.docx` (Word docs)
- `ステータス/` (Status directory)
- `装備/` (Equipment directory)

#### Documentation
- Move `sidebar_css.txt` to `docs/snippets/`
- Create `docs/project_structure.md`

## Verification
- Ensure the Web Application (`index.html`) still loads correctly (it should, as it depends on `legendary_stats.js` which stays in root).
- Verify directory listing looks clean.
