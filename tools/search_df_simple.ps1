$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    $sheet = $workbook.Sheets.Item("Characters")
    $rows = $sheet.UsedRange.Rows.Count
    if ($rows -gt 400) { $rows = 400 }

    Write-Host "--- Searching Characters ---"
    
    for ($r = 1; $r -le $rows; $r++) {
        $name = $sheet.Cells.Item($r, 3).Text
        $check = $false
        if ($name -match "壁山") { $check = $true }
        if ($name -match "風丸") { $check = $true }
        if ($name -match "黄名子") { $check = $true }
        
        if ($check) {
            $k = $sheet.Cells.Item($r, 17).Text
            $c = $sheet.Cells.Item($r, 20).Text
            $out = "Found " + $name + ": Kick=" + $k + " Ctrl=" + $c
            Write-Host $out
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
