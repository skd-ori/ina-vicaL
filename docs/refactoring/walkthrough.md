# Walkthrough: GitHub Migration
**Current State**: Project is ready for GitHub with automated builds.

## What has changed?
1.  **Workflow File**: `.github/workflows/build.yml`
    *   **What it does**: Every time you push changes to the `src/` folder on GitHub, this script runs in the cloud.
    *   **Result**: It automatically rebuilds `ina-vicaL_single.html` and commits it back to your repository.
    *   **Benefit**: You never have to mistakenly distribute an old version.

2.  **Git Ignore**: `.gitignore`
    *   Prevents junk files (`.log`, temporary editor files) from cluttering your repo.

## How to use
1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit with modular structure"
    ```
2.  **Push to GitHub**:
    ```bash
    git remote add origin <your-repo-url>
    git push -u origin main
    ```
3.  **Watch it work**:
    *   Go to the "Actions" tab in your GitHub repository.
    *   You will see "Build Single File HTML" running.
    *   Once green, `ina-vicaL_single.html` in your repo will be updated.

## Next Steps
- Continue editing files in `src/`.
- Commit and push.
- The single-file version updates itself.
