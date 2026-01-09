$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$file = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

if (-not (Test-Path $file)) {
    Write-Host "File not found: $file"
    exit
}

try {
    $workbook = $excel.Workbooks.Open($file)
    foreach ($sheet in $workbook.Sheets) {
        Write-Host "Sheet: $($sheet.Name)"
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
