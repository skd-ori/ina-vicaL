$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$filePath = "$PWD\分析.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    
    foreach ($sheet in $workbook.Sheets) {
        Write-Host "--- Sheet: $($sheet.Name) ---"
        $rows = $sheet.UsedRange.Rows.Count
        if ($rows -gt 200) { $rows = 200 }
        
        for ($r = 1; $r -le $rows; $r++) {
            $line = ""
            for ($c = 1; $c -le 20; $c++) {
                $line += $sheet.Cells.Item($r, $c).Text + " "
            }
            
            if ($line -match "ザナーク" -or $line -match "風丸" -or $line -match "壁山" -or $line -match "黄名子" -or $line -match "Zanark") {
                Write-Host $line
            }
        }
    }
}
catch {
    Write-Host "Error"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
