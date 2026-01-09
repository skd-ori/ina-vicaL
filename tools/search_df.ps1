$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    $sheet = $workbook.Sheets.Item("Characters")
    $rows = $sheet.UsedRange.Rows.Count
    if ($rows -gt 1000) { $rows = 1000 }

    Write-Host "--- Searching for DF Stats (Kabeyama, Kazemaru, Kinako) ---"
    
    for ($r = 1; $r -le $rows; $r++) {
        $name = $sheet.Cells.Item($r, 3).Text
        if ($name -match "壁山" -or $name -match "風丸" -or $name -match "黄名子") {
             $k = $sheet.Cells.Item($r, 17).Text # Kick
             $c = $sheet.Cells.Item($r, 20).Text # Control
             Write-Host "Found $name ($r): Kick=$k, Control=$c"
        }
    }
}
catch { Write-Host "Error: $_" }
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
