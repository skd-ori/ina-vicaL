# Project Structure

This project is organized as follows:

## Root Directory (Web Application)
Contains the source code for the "ina-vicaL" web application.
- `index.html`: Main application file.
- `ina-vicaL_single.html`: Single-file distribution version.
- `style.css`, `script.js`: Core assets.
- `legendary_stats.js`: Character database for the web app.

## tools/
Contains development and data analysis scripts.
- **PowerShell (`*.ps1`)**: Scripts for inspecting Excel files, extracting data, and debugging.
- **Python (`*.py`)**: Data processing scripts.
- **Bat**: Utilities like `open_with_chrome.bat`.

## data/
Contains the raw data used to generate application stats.
- **Excel (`*.xlsx`)**: Source tables for characters, moves, and equipment.
- **CSV**: Data exports.
- **`ステータス/`**, **`装備/`**: Categorized data folders.

## docs/
Project documentation and change logs.
- `6_slot_chain_system/`: Documentation for the 6-chain feature.
- `snippets/`: Code snippets and archived text files.
