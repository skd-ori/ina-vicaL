$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

try {
    $workbook = $excel.Workbooks.Open($filePath)
    $sheet = $workbook.Sheets.Item("Characters")
    
    Write-Host "--- Searching Characters (Rows 300-450) for Tenma/Arion/Matsukaze ---"
    # Tenma is likely in the GO section, which is usually later in the list.
    
    for ($r = 300; $r -le 450; $r++) {
        $name = $sheet.Cells.Item($r, 3).Text
        $romaji = $sheet.Cells.Item($r, 5).Text
        
        if ($name -match "天馬" -or $romaji -match "Tenma" -or $romaji -match "Arion") {
            Write-Host "FOUND TENMA: Row $r"
            $line = @()
            for ($c = 1; $c -le 20; $c++) { $line += $sheet.Cells.Item($r, $c).Text }
            Write-Host ($line -join "`t")
        }
    }
}
catch {
    Write-Host "Error: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
