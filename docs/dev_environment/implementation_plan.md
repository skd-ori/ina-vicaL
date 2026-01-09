# Development Environment Setup Plan

## Goal
Establish a structured development environment to separate source code from build artifacts and tools, enabling safer editing and automated "single-file" distribution.

## Changes

### 1. Source Code Reorganization
Move core application files into a `src/` directory.
- `index.html` -> `src/index.html`
- `style.css` -> `src/css/style.css`
- `script.js` -> `src/js/script.js`
- `legendary_stats.js` -> `src/js/legendary_stats.js`

### 2. Build Automation
Create a PowerShell script (`tools/build.ps1`) to replace the manual "copy-paste" process for creating the single-file version.
- **Input**: `src/index.html`
- **Process**: Inline all referenced CSS and JS files.
- **Output**: `ina-vicaL_single.html` (in root)

### 3. Editor Configuration
Add `.vscode/extensions.json` to recommend useful extensions (Live Server, Prettier) for any user opening this workspace in VS Code.

## Workflow
1.  Edit files in `src/`.
2.  Run `tools/build.ps1` to update the distribution file.
3.  Open `ina-vicaL_single.html` to verify.
