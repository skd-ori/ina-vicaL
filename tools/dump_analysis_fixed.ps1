$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$filePath = "$PWD\分析.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    
    foreach ($sheet in $workbook.Sheets) {
        Write-Host "--- Sheet: $($sheet.Name) ---"
        $rows = $sheet.UsedRange.Rows.Count
        if ($rows -gt 100) { $rows = 100 }
        
        for ($r = 1; $r -le $rows; $r++) {
            $line = ""
            for ($c = 1; $c -le 20; $c++) {
                $txt = $sheet.Cells.Item($r, $c).Text
                if ($txt) { $line += $txt + " " }
            }
            if ($line.Trim().Length -gt 0) {
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
