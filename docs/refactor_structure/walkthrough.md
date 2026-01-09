# Walkthrough: Project Structure Refactoring

## Overview
Organized the project root by moving development scripts and raw data into dedicated subdirectories. This separates the production web application files from the analysis tools.

## Changes

### 1. Created `tools/` Directory
Moved all analysis and utility scripts here to declutter the root.
- `*.ps1` (PowerShell Analysis Scripts)
- `*.py` (Python Extraction Scripts)
- `analyze_excel.js`
- `open_with_chrome.bat`

### 2. Created `data/` Directory
Moved all raw data files used for analysis here.
- `*.xlsx` (Source Excel Files)
- `*.csv` (Calculated Data)
- `ステータス/` (Status Data Folder)
- `装備/` (Equipment Data Folder)

### 3. Documentation Updates
- Created `docs/project_structure.md` detailing the new layout.
- Updated `README.md` to reflect the new structure.

## Structure Overview
- **Root**: Web App (`index.html`, `js`, `css`) - *Clean and deploy-ready.*
- **tools/**: Dev scripts and analysis tools.
- **data/**: Raw inputs for tools.
- **docs/**: Project documentation.

## Notes for Future Development
- When running scripts from `tools/`, ensure they can find files in `../data/`. Path adjustments in scripts may be needed if they used relative paths assuming root execution.
