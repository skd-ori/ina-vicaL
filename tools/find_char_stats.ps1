$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$file = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($file)
    $sheet = $workbook.Sheets.Item("Characters")
    
    # Search header in first 50 columns
    for ($c = 1; $c -le 50; $c++) {
        $val = $sheet.Cells.Item(1, $c).Text
        if ($val -match "Kick" -or $val -match "Control" -or $val -match "Catch" -or $val -match "Speed" -or $val -match "キック" -or $val -match "コントロール") {
            Write-Host "Found '$val' at Column $c"
        }
    }
}
catch {
    Write-Host "Error: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
}
