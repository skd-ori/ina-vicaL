$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    $sheet = $workbook.Sheets.Item("Characters")
    
    # Just check first 400 rows
    for ($r = 1; $r -le 400; $r++) {
        $name = $sheet.Cells.Item($r, 3).Text
        if ($name -match "Kabeyama" -or $name -match "Kazemaru" -or $name -match "Kirino" -or $name -match "Nathan" -or $name -match "Wallside" -or $name -match "Gabriel" -or $name -match "Goldie" -or $name -match "Kinako") {
            $k = $sheet.Cells.Item($r, 17).Text
            $c = $sheet.Cells.Item($r, 20).Text
            Write-Host $name
            Write-Host $k
            Write-Host $c
            Write-Host "---"
        }
    }
}
catch {
    Write-Host "Err"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
