$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

# Find file by size (approx 12MB)
$targetFile = Get-ChildItem -Path "$PWD" -Filter "*.xlsx" | Where-Object { $_.Length -gt 11000000 } | Select-Object -First 1

if (-not $targetFile) {
    Write-Host "No analysis file > 11MB found."
    $excel.Quit()
    exit
}

Write-Host "Reading by Size: $($targetFile.Name)"
try {
    $workbook = $excel.Workbooks.Open($targetFile.FullName)
    $sheet = $workbook.Sheets.Item(1)
    
    $rows = $sheet.UsedRange.Rows.Count
    if ($rows -gt 400) { $rows = 400 } # Increase range to catch Zanark
    
    for ($r = 1; $r -le $rows; $r++) {
        $line = ""
        for ($c = 1; $c -le 20; $c++) {
            $t = $sheet.Cells.Item($r, $c).Text
            if ($t) { $line += $t + " | " }
        }
        if ($line.Trim().Length -gt 0) {
            # Manual filter in output to avoid PS char issues
            # We will just print everything and I (the Agent) will read it
            $out = "Row " + $r + ": " + $line
            Write-Host $out
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
