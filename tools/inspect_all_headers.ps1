$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$file = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

$sheets = @("Characters", "Bracelet", "Pendant", "Misc")

try {
    $workbook = $excel.Workbooks.Open($file)
    
    foreach ($sName in $sheets) {
        $sheet = $workbook.Sheets.Item($sName)
        Write-Host "`n--- Sheet: $($sheet.Name) ---"
        
        # Header
        $header = @()
        for ($c = 1; $c -le 20; $c++) {
            $header += $sheet.Cells.Item(1, $c).Text
        }
        Write-Host "Header: $($header -join ' | ')"
        
        # Rows
        for ($r = 2; $r -le 4; $r++) {
            $row = @()
            for ($c = 1; $c -le 20; $c++) {
                $row += $sheet.Cells.Item($r, $c).Text
            }
            Write-Host "Row $r - $($row -join ' | ')"
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
