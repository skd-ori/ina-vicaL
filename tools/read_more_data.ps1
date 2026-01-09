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
        if ($rows -gt 40) { $rows = 40 } # Read more rows to find good FW/MFs
        
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
    
    # Read Misc for Special Equipment
    Read-Sheet "Misc" 10
    
    # Read Characters again for FW/MF list
    Read-Sheet "Characters" 20
}
catch {
    Write-Host "Error opening workbook: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
