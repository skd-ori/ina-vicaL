# Walkthrough: ina-vicaL (Inazuma Victory Calculator)

## Project Overview
This project implements a calculation tool for "Inazuma Eleven: Victory Road" (Beta Test), allowing users to calculate total power, including stats, equipment, techniques, and passives.

## Key Features

### 1. Calculation Engine
- **Base Power**: Character Stats (Kick/Control) + Equipment + Beans.
- **Technique Power**: Lookup table for Base 30-100 power moves with evolution scaling (V2/V3/etc.).
- **Multipliers**: Support for Element/Character advantage, Criticals, and custom manual multipliers.

### 2. Multi-Slot Chain System (New)
- **6-Slot Tabs**: UI to manage 6 distinct Character slots (`[1] [2] [3] [4] [5] [6]`).
- **Daisy Chain Logic**:
    - Slot 1 is the starter.
    - Slot 2 automatically inherits Slot 1's Total Power.
    - Slot 3 inherits Slot 2's, and so on.
- **Independent State**: Switching tabs saves/loads all inputs for that specific slot.

### 3. Battle Mode (AT/DF)
- **Shoot Mode (AT)**: Calculate Kick Power + Chain Bonus vs Opponent (Goal/Blocked result).
- **Defend Mode (DF)**: Calculate Block/Catch Power vs Opponent Shoot.

### 4. UI/UX
- **Preset Mode**: Quick selection for standard character archetypes (FW/MF/DF/GK).
- **Segmented Controls**: Easy-to-tap buttons for Rarity, Evolution, Matchups.
- **Passive Presets**: One-click setup for common passive stacks (e.g., "Advantage Optimized").
- **Single File Distribution**: Entire app contained in `ina-vicaL_single.html`.

## Usage
1.  **Open** `ina-vicaL_single.html` in any modern web browser.
2.  **Select Slot 1** and input your first shooter's stats/technique.
3.  **Check "Chain"** logic if this shooter will pass the ball.
4.  **Select Slot 2**, the input will automatically show "1人目の結果" (Person 1's Result) as the incoming Chain Power.
5.  **Enter Slot 2's technique**, and the Total AT will reflect the sum.
6.  **Repeat** up to Slot 6.

## Verification
- **Browser Checked**: Chrome/Edge on Windows.
- **Logic Verified**:
    - Manual 100 + 50% = 150.
    - Chain 100 -> Slot 2 (Base 100) = 200 Total.
    - Slot 3 (Base 100) -> Inherits 200 -> 300 Total.

![Initial State](initial_state_1767922637827.png)
