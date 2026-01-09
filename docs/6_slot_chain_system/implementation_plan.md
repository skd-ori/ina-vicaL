# Phase 10: Multi-Slot System (Max 6 Chains)

Support up to 6 chain shots in a sequence (Daisy Chain).

## Concept
- **State**: `slots` object stores data for 1 to 6.
- **Flow**: Slot 1 result -> Slot 2 input -> Slot 2 result -> Slot 3 input ...
- **UI**: Compact segmented tabs `[1] [2] [3] [4] [5] [6]`.

## Changes
### 1. UI Update
- Replace "Slot 1 / Slot 2" tabs with a 6-button segmented control.
- Labels: `[SCC 1] [SCC 2] ... [SCC 6]` (SCC = Shoot Chain sequence?). Or just `[1] [2] [3] [4] [5] [6]`.

### 2. Logic Update
- **Initialization**: Create 6 empty slot states.
- **Switching**: `switchSlot(n)`.
- **Calculation**:
  - `slots[n].result = totalAT`.
  - If `n > 1` and Chain Active: `chainBonus = slots[n-1].result`.

### 3. Verification
- 1st: 1000 -> 2nd (+1000) = 2200 -> 3rd (+2200) = 3500...
