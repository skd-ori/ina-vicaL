$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$filePath = "$PWD\分析.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    
    # Iterate all sheets
    foreach ($sheet in $workbook.Sheets) {
        Write-Host "--- Sheet: $($sheet.Name) ---"
        $rows = $sheet.UsedRange.Rows.Count
        if ($rows -gt 100) { $rows = 100 } # Check top 100
        
        for ($r = 1; $r -le $rows; $r++) {
            $line = @()
            for ($c = 1; $c -le 20; $c++) {
                # Read first 20 cols
                $line += $sheet.Cells.Item($r, $c).Text
            }
            $rowStr = $line -join " "
            
            if ($rowStr -match "ザナーク" -or $rowStr -match "風丸" -or $rowStr -match "壁山" -or $rowStr -match "黄名子") {
                Write-Host "Row $r: $rowStr"
            }
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
