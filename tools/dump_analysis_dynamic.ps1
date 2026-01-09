$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

# Find the file dynamically to avoid encoding issues with "分析.xlsx" literal
$targetFile = Get-ChildItem -Path "$PWD" -Filter "*.xlsx" | Where-Object { $_.Name -match "分析" } | Select-Object -First 1

if (-not $targetFile) {
    Write-Host "File not found via pattern match."
    $excel.Quit()
    exit
}

$filePath = $targetFile.FullName
Write-Host "Opening: $filePath"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    
    foreach ($sheet in $workbook.Sheets) {
        Write-Host "--- Sheet: $($sheet.Name) ---"
        $rows = $sheet.UsedRange.Rows.Count
        if ($rows -gt 200) { $rows = 200 }
        
        for ($r = 1; $r -le $rows; $r++) {
            $line = ""
            for ($c = 1; $c -le 20; $c++) {
                $txt = $sheet.Cells.Item($r, $c).Text
                if ($txt) { $line += $txt + " " }
            }
            
            # Simple check for keywords
            if ($line -match "ザナーク" -or $line -match "風丸" -or $line -match "壁山" -or $line -match "黄名子" -or $line -match "Zanark") {
                $out = "Row " + $r + ": " + $line
                Write-Host $out
            }
        }
    }
}
catch {
    Write-Host "Excel Error: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
