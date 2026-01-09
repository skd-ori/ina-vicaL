$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$file = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($file)
    $sheet = $workbook.Sheets.Item("Boots")
    Write-Host "Sheet: $($sheet.Name)"
    
    # Header
    $header = @()
    for ($c = 1; $c -le 15; $c++) {
        $header += $sheet.Cells.Item(1, $c).Text
    }
    Write-Host "Header: $($header -join ' | ')"
    
    # First few rows to see data format
    for ($r = 2; $r -le 5; $r++) {
        $row = @()
        for ($c = 1; $c -le 15; $c++) {
            $row += $sheet.Cells.Item($r, $c).Text
        }
        Write-Host "Row $r - $($row -join ' | ')"
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
