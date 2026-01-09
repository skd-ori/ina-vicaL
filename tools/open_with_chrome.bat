@echo off
echo ==========================================
echo Chrome with File Access Launcher
echo ==========================================
echo.
echo Step 1: Closing existing Chrome instances...
taskkill /F /IM chrome.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Step 2: Launching Chrome with file access enabled...
echo.

REM Try multiple possible Chrome paths
set CHROME_PATH=
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe
)

if "%CHROME_PATH%"=="" (
    echo ERROR: Chrome not found in standard locations!
    echo Please manually locate chrome.exe
    pause
    exit /b 1
)

echo Chrome found at: %CHROME_PATH%
echo Opening: %~dp0index.html
echo.
echo Note: This Chrome instance has file access permissions enabled.
echo.

start "" "%CHROME_PATH%" --allow-file-access-from-files --user-data-dir="%TEMP%\chrome_dev_profile" "file:///%~dp0index.html"

echo.
echo Chrome launched successfully!
echo If the page doesn't work, press F12 to check console errors.
pause
