$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

# Find the analysis file
$targetFile = Get-ChildItem -Path "$PWD" -Filter "*.xlsx" | Where-Object { $_.Name -match "分析" } | Select-Object -First 1

if (-not $targetFile) {
    Write-Host "No analysis file found."
    $excel.Quit()
    exit
}

Write-Host "Reading: $($targetFile.Name)"
try {
    $workbook = $excel.Workbooks.Open($targetFile.FullName)
    $sheet = $workbook.Sheets.Item(1) # Read first sheet
    Write-Host "Sheet: $($sheet.Name)"
    
    $rows = $sheet.UsedRange.Rows.Count
    if ($rows -gt 200) { $rows = 200 }
    
    for ($r = 1; $r -le $rows; $r++) {
        $line = ""
        # Read columns 1 to 20
        for ($c = 1; $c -le 20; $c++) {
            $t = $sheet.Cells.Item($r, $c).Text
            if ($t) { $line += $t + " | " }
        }
        if ($line.Trim().Length -gt 0) {
            Write-Host "R$r: $line"
        }
    }
}
catch {
    Write-Host "Error: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
