# ina-vicaL (Inazuma Victory Calculator)

An advanced web-based calculator designed to accurately compute the Total Attack (Total AT) power for Inazuma Eleven: Victory Road characters.

**Repository Name**: `inazuma-victory-calculator`
**Creator**: @skd

## Features

*   **Accurate Calculation Logic**: Computes Shoot Power based on base stats (Kick, Technique/Control), techniques, and multipliers.
*   **Victory Road Mechanics**:
    *   **Super Dimensional Moves (超次元技)**: Exclusive selection for Overdrive (OD), Keshin, Armed, Accel, etc.
    *   **Element Accel Bonus**: Automatically boosts "Advantage" multipliers (1.2x -> 2.0x) when Element Accel is active.
    *   **Boost +30%**: Includes standard boost moves.
*   **Passive Skill Management**:
    *   Dedicated grid for inputting up to 13 different passive skills (Justice, Counter, Team Buffs, etc.).
    *   Automatic positive integer validation.
*   **Detailed Preset System**:
    *   Presets for FW, MF, DF, GK configurations.
    *   Supports Standard (Legendary), BASARA, and HERO categories.
*   **User-Friendly UI**:
    *   Segmented controls for quick selection.
    *   Responsive design for Mobile and PC.
    *   Visual feedback for active multipliers (e.g., "Advantage (2.0)★").
*   **Constraint Logic**:
    *   Automatically locks Evolution and Matchups to "Normal" when Base Power 30 is selected, ensuring valid game states.

## Usage

1.  **Open the Calculator**: Simply open `index.html` in any modern web browser.
2.  **Select Mode**:
    *   **Preset Mode**: Choose from predefined character templates (FW/MF, etc) and rarity.
    *   **Direct Input**: Manually enter total Kick and Control stats.
3.  **Configure Matchups**: Set Character and Technique compatibility (Advantage/Normal/Disadvantage).
4.  **Select Techniques**: Choose Base Power and Evolution level.
5.  **Apply Bonuses**: Toggle Super Dimensional Moves and input Passive Skill percentages.
6.  **View Results**: The "Total AT" is automatically calculated and displayed in the sidebar.

## Project Structure

### Source Code (`src/`)
*   `src/index.html`: Main application entry point.
*   `src/css/style.css`: Styling.
*   `src/js/*.js`: Modular JavaScript components (`data`, `state`, `calc`, `ui`, `main`).

### Distribution
*   `ina-vicaL_single.html`: **Auto-Generated Single File Build**. Use this for simple deployment.

### Tools & Automation
*   `.github/workflows/build.yml`: GitHub Action to automatically rebuild `ina-vicaL_single.html` on push.
*   `tools/build.ps1`: Build script (Powershell).
*   `tools/`: Analysis scripts.
*   `data/`: Raw data assets.

## Development

1.  **Edit**: Modify files in `src/` (e.g., `src/js/calc.js` for logic).
2.  **Test**: Open `src/index.html` locally.
3.  **Build**:
    *   **Manual**: Run `./tools/build.ps1`.
    *   **Auto**: Push to GitHub `main` branch. The Action will auto-build and commit the updated `ina-vicaL_single.html`.

## License

This project is a fan-made tool created by **@skd** and is not affiliated with Level-5.
