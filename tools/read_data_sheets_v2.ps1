$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

function Read-Sheet {
    param([string]$sheetName, [int]$colsToRead = 10)
    
    try {
        $sheet = $workbook.Sheets.Item($sheetName)
        Write-Host " "
        Write-Host "--- Sheet: $sheetName ---"
        
        $usedRange = $sheet.UsedRange
        $rows = $usedRange.Rows.Count
        if ($rows -gt 15) { $rows = 15 }
        
        for ($r = 1; $r -le $rows; $r++) {
            $line = @()
            for ($c = 1; $c -le $colsToRead; $c++) {
                $line += $sheet.Cells.Item($r, $c).Text
            }
            Write-Host ($line -join "`t")
        }
    }
    catch {
        Write-Host "Error reading sheet: $_"
    }
}

try {
    $workbook = $excel.Workbooks.Open($filePath)
    
    Read-Sheet "Characters" 20
    Read-Sheet "Boots" 10
    Read-Sheet "Bracelet" 10
    Read-Sheet "Pendant" 10
}
catch {
    Write-Host "Error opening workbook: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
