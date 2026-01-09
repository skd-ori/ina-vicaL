# UI Refactoring & Modernization Plan

## Goal
Transform the current functional UI into a "Premium" experience with Glassmorphism aesthetics, smooth animations, and better visual hierarchy.

## Design Concept
- **Theme**: Light/Glass (Gradient Backgrounds with Blur) or sleek Dark Mode. Let's aim for a vibrant Light/Blue theme as it fits the "Inazuma Eleven" vibe.
- **Typography**: Inter / Noto Sans JP (already included, but need refining weights/spacing).
- **Components**:
    - **Cards**: Translucent white with backdrop-blur.
    - **Buttons**: Gradient backgrounds, hover lift effects.
    - **Inputs**: Floating labels or cleaner borders.
    - **Sidebar**: Sticky glass panel.

## Changes

### 1. `src/css/style.css` Overhaul
- **Variables**: Define premium colors (Gradients, Shadows).
- **Body**: Add a subtle animated gradient background.
- **Glassmorphism**: Add `.glass` utility class (backdrop-filter: blur).
- **Animations**: Add keyframes for fade-in and slide-up.

### 2. UI Structure (`src/js/ui.js` & `src/index.html`)
- No heavy logic changes, just class updates if necessary.
- Ensure the sidebar doesn't overlap content on mobile.

## Steps
1.  **Backup** existing `style.css` (implied, can use git or just overwrite since we have history).
2.  **Rewrite `style.css`** with new design tokens.
3.  **Verify** mobile responsiveness (Sidebar toggle? or refined grid).
