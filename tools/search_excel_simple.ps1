$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

function Search-Sheet {
    param([string]$sheetName, [int]$cols = 10)
    
    try {
        $sheet = $workbook.Sheets.Item($sheetName)
        Write-Host " "
        Write-Host "--- Searching $sheetName (Top 50) ---"
        
        $usedRange = $sheet.UsedRange
        $rows = $usedRange.Rows.Count
        if ($rows -gt 50) { $rows = 50 }
        
        for ($r = 1; $r -le $rows; $r++) {
            $line = @()
            for ($c = 1; $c -le $cols; $c++) {
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
    
    # Read Characters again, hoping to spot Tenma (ID or Name)
    # Tenma is likely further down, let's read rows 50-100 too if needed
    
    $sheet = $workbook.Sheets.Item("Characters")
    Write-Host "--- Searching Characters (Rows 1-150) for Tenma/Arion ---"
    for ($r = 1; $r -le 150; $r++) {
        $name = $sheet.Cells.Item($r, 3).Text # Kanji Name column usually
        # Check for Tenma (天馬) or Arion matches manually in output
        # Also just print rows with high stats to identify patterns
        $kick = $sheet.Cells.Item($r, 17).Text
        
        if ($name -match "Tenma" -or $name -match "Arion" -or $name -match "天馬") {
            Write-Host "FOUND TENMA: Row $r"
            # Print whole row
            $line = @()
            for ($c = 1; $c -le 20; $c++) { $line += $sheet.Cells.Item($r, $c).Text }
            Write-Host ($line -join "`t")
        }
    }

    # Dump Equipment tables to just manually pick correct stats from output
    Search-Sheet "Boots" 10
    Search-Sheet "Bracelet" 10
    Search-Sheet "Pendant" 10
    Search-Sheet "Misc" 10
}
catch {
    Write-Host "Error with workbook: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
