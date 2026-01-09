$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    foreach ($sheet in $workbook.Sheets) {
        Write-Host $sheet.Name
    }
}
catch {
    Write-Host "Error: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
