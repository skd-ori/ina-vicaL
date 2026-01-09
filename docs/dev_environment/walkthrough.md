# Walkthrough: Development Environment Setup

## Overview
We have transitioned from a flat, manual-manage project structure to a standard source/build workflow.

## Key Changes

### 1. `src/` Directory
All editable source code is now here.
- `src/index.html`: The main entry point.
- `src/css/`: Stylesheets.
- `src/js/`: JavaScript logic.

**Action**: When making changes, **always edit files in `src/`**, not the root HTML files.

### 2. Automated Build Script
A new script `tools/build.ps1` automates the creation of the single-file version.

**Usage**:
```powershell
./tools/build.ps1
```
This will read `src/index.html`, pull in the CSS/JS files, and overwrite `ina-vicaL_single.html` in the root directory.

### 3. VS Code Recommendations
Added `.vscode/extensions.json` recommending `Live Server` and optimizations.

## How to Develop
1.  Open `src/index.html` with Live Server to test changes rapidly.
2.  When ready to release or share, run the build script.
3.  Share `ina-vicaL_single.html`.
