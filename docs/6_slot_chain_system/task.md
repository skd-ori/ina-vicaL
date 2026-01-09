# Tasks

- [x] Project Setup
    - [x] Explore existing files
    - [x] Define requirements (formulas, inputs)
    - [x] Create implementation plan
- [ ] Advanced Features Implementation
    - [x] Add Icons (Kick/Control)
    - [/] Implement Character Presets (Fixing Stats for Zanark/DF)
    - [x] Implement Rarity Logic (Updated to 1.4x)
    - [x] Implement Beans (Stat Boost) Toggle (Added Max Button)
    - [x] Implement Equipment Selection
- [x] Core Implementation
    - [x] Create HTML structure
    - [x] Implement calculation logic in JavaScript (LV50 Logic)
    - [x] Style with CSS
- [x] Layout Cleanup & Scaling
    - [x] Fix HTML nesting and remove duplicate headers
    - [x] Slim down sidebar to 120px and fix scaling
    - [x] Ensure vertical stack for results
    - [x] Right-align entire content with left sidebar
- [x] Functional Refinements
    - [x] Split Presets into Categories (Standard/BASARA/HERO)
    - [x] Set default Beans value to 82 (Max)
    - [x] Fix Direct Input mode toggle
    - [x] Move Rarity to Standard Category & Remove Normal option
    - [x] Strict Mode Visibility (Hide Direct Input in Preset Mode)
    - [x] Category Selector Move: Replaced "Rarity" with "Category" (Standard/Basara/Hero)
    - [x] Active Preset Feedback: Added .btn-preset.active styles
    - [x] Logic: Hardcoded Rarity (1.4x) for Standard category
    - [x] Fix Tech Power Display: Update `techniquePowerDisplay` to show the *adjusted* values (after Tech Matchup)
- [x] Mobile Responsiveness
    - [x] Sidebar adjustments for mobile
    - [x] Sticky Mobile Sidebar: Change mobile sidebar to `position: sticky; top: 0`
    - [x] Vertical input stacking on mobile
- [x] Verification
    - [x] Final visual check in browser
- [x] UX/UI Overhaul
    - [x] Tab Navigation (Preset vs Direct Input)
    - [x] Segmented Buttons for Evolution (Replace Dropdown)
    - [x] Segmented Buttons for Matchup (Char & Tech)
    - [x] Copy Result Button in Sidebar
    - [x] Visual Polish (Spacing, Animations)

## Phase 2: Refinements & User Requests
- [x] **Rarity UI**: Rename "Category" to "Rarity" and convert to Segmented Buttons (Standard, Basara, Hero).
- [x] **Beans UI Update**: Remove "All Max/Clear" buttons (Keep specific ones).
- [x] **Equipment UI**: Convert dropdowns to Segmented Buttons for top 3 items.
- [x] **Skills & Tactics**: Add helper buttons to "Multiplier" input (e.g., +10%, +20%).
- [x] **UI Corrections**: Correct Rarity Label, Remove OTH, Fix Equipment Names.

## Phase 3: Calculation Logic
- [x] **Fix Tech Power Table**: Update `techniqueLookup` using values from "TOTAL AT 計算表".
- [x] **Passive Multipliers**: Added specific buttons (+50%, +24%) from CSV data.
- [x] **Victory Road Specifics**: Removed Chouwaza/Kokoroe, added Overdrive/Keshin/Boost.
- [x] **Calculation Safety**: Enforced non-negative inputs for passives.
- [ ] **Verify Total AT Formula**: Match calculation logic to standard GO Galaxy formulas.

## Phase 4: Final UI Refinements
- [x] **Rename Super Dimensional Moves**: Update OD to "オーバードライブ" and Accel to "エレメントアクセル".

## Phase 8: AT/DF Battle Logic & Chain
- [x] **AT/DF Toggle**: Switch between Shoot and Defend modes.
- [x] **Battle Inputs**: Add "Opponent Power" (Block/Shoot) and "Chain Power" (Ally Shoot).
- [x] **Result Logic**: Calculate Win/Lose/Draw and display "GOAL!", "STOP!", "CHAIN OK!".
- [x] **Luck Stat**: Add "Luck Beans" to calculation.

## Phase 9: Chain Workflow (Copy/Add)
- [x] **Copy Button**: Add "▼ 結果をコピー" button to Chain section.
- [x] **Copy Logic**: Copy current `totalAT` to `chainPower` input.
- [x] **Calculation**: Update total display to show "My Power (+Chain Source)" and calculate combined total vs Opponent.

## Phase 10: Multi-Slot System (6-Chain)
- [x] **Slot Tabs**: Implement 6-slot segmented control `[1] [2] [3] [4] [5] [6]`.
- **State Management**:
    - [x] Initialize 6 independent slot states.
    - [x] `saveSlot()` / `loadSlot()` handles 1-6.
- **Daisy Chain Logic**:
    - [x] Slot `n` automatically chains from Slot `n-1` Result.
    - [x] Slot 1 is the Starter.
- [x] **Rarity Buttons**: Convert Rarity (Standard/Basara/Hero) to segmented button control.
- [x] **Single-File Version**: Created `ina-vicaL_single.html` for easy GitHub deployment.
- [x] **Mobile Layout Check**: Ensure long names don't break the layout.

## Phase 5: Verification & Launch
- [x] **Browser Verification**: Final QA on all features.
- [x] **GitHub Ready**: Confirm README and credits.

## Phase 6: BETA Refinements
- [x] **Beans UI Refinement**: Align Kick/Control beans horizontally and increase size for better visibility.
- [x] **Cross-file Sync**: Ensure `ina-vicaL_single.html` also receives these updates.

## Phase 7: Post-BETA Requests
- [x] **Armed Boost Update**: Change Armed boost from 1.3x to 1.5x (and button text).
- [x] **No Technique Logic**: Add '0' (None) option for Base Power and handle calculation.
- [x] **Passive Presets**: Add buttons to quickly set common passive combinations.


- [x] Phase 11: Final Polish & Sync
  - [x] Translate remaining English UI to Japanese
  - [x] Merge `style.css` and `script.js` into single `ina-vicaL_single.html`
  - [x] Verify single-file distribution (styles, scripts, chain logic)
