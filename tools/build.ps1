$ErrorActionPreference = "Stop"

$srcDir = "src"
$indexFile = Join-Path $srcDir "index.html"
$outputFile = "ina-vicaL_single.html"

Write-Host "Reading from: $indexFile"

if (-not (Test-Path $indexFile)) {
    Write-Error "Index file not found at $indexFile"
}

$content = Get-Content -Path $indexFile -Raw -Encoding UTF8

# Function to inline CSS
$content = [Regex]::Replace($content, '<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>', {
    param($match)
    $href = $match.Groups[1].Value
    if ($href -match "^http" -or $href -match "^//") {
        return $match.Value
    }
    
    $cssPath = Join-Path $srcDir $href
    Write-Host "  Inlining CSS: $href"
    if (Test-Path $cssPath) {
        $cssContent = Get-Content -Path $cssPath -Raw -Encoding UTF8
        return "<style>`n$cssContent`n</style>"
    } else {
        Write-Warning "CSS file not found: $cssPath"
        return $match.Value
    }
})

# Function to inline JS
$content = [Regex]::Replace($content, '<script\s+src="([^"]+)"\s*></script>', {
    param($match)
    $src = $match.Groups[1].Value
    if ($src -match "^http" -or $src -match "^//") {
        return $match.Value
    }
    
    $jsPath = Join-Path $srcDir $src
    Write-Host "  Inlining JS: $src"
    if (Test-Path $jsPath) {
        $jsContent = Get-Content -Path $jsPath -Raw -Encoding UTF8
        return "<script>`n$jsContent`n</script>"
    } else {
        Write-Warning "JS file not found: $jsPath"
        return $match.Value
    }
})

Set-Content -Path $outputFile -Value $content -Encoding UTF8
Write-Host "Build complete! Output saved to: $outputFile"
