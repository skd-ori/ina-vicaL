$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$file = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"
$outFile = "$PWD\data.json"

$data = @{
    boots     = @()
    bracelets = @()
    pendants  = @()
    special   = @()
    presets   = @{
        FW = @()
        MF = @()
        DF = @()
        GK = @()
    }
}

function Get-SheetData {
    param ($sheetName, $type)
    $sheet = $workbook.Sheets.Item($sheetName)
    $usedRange = $sheet.UsedRange
    $rows = $usedRange.Rows.Count
    
    # Starting row 2 to skip header
    for ($r = 2; $r -le $rows; $r++) {
        $name = $sheet.Cells.Item($r, 1).Text
        if ([string]::IsNullOrWhiteSpace($name)) { continue }
        
        $kick = [double]($sheet.Cells.Item($r, 2).Text -replace '[^0-9.]', '')
        $ctrl = [double]($sheet.Cells.Item($r, 3).Text -replace '[^0-9.]', '')
        
        if ($kick + $ctrl -ge 20) {
            $data.$type += @{
                name    = $name
                kick    = $kick
                control = $ctrl
            }
        }
    }
}

try {
    $workbook = $excel.Workbooks.Open($file)

    # Equipment
    Get-SheetData "Boots" "boots"
    Get-SheetData "Bracelet" "bracelets"
    Get-SheetData "Pendant" "pendants"
    Get-SheetData "Misc" "special"
    
    # Characters
    $sheet = $workbook.Sheets.Item("Characters")
    $rows = $sheet.UsedRange.Rows.Count
    for ($r = 2; $r -le $rows; $r++) {
        $name = $sheet.Cells.Item($r, 2).Text
        $pos = $sheet.Cells.Item($r, 9).Text
        
        if ([string]::IsNullOrWhiteSpace($name)) { continue }
        
        # Cols 17 (Kick), 18 (Control)
        $kickStr = $sheet.Cells.Item($r, 17).Text
        $ctrlStr = $sheet.Cells.Item($r, 18).Text

        # Clean strings
        $kick = [double]($kickStr -replace '[^0-9.]', '')
        $ctrl = [double]($ctrlStr -replace '[^0-9.]', '')

        if ($kick -gt 0 -or $ctrl -gt 0) {
            $obj = @{
                name    = $name
                kick    = $kick
                control = $ctrl
            }
           
            if ($pos -match "FW") { $data.presets.FW += $obj }
            elseif ($pos -match "MF") { $data.presets.MF += $obj }
            elseif ($pos -match "DF") { $data.presets.DF += $obj }
            elseif ($pos -match "GK") { $data.presets.GK += $obj }
        }
    }
    
    # Sort and slice presets (Top 5 by sum)
    $data.presets.Keys | ForEach-Object {
        $k = $_
        $data.presets.$k = $data.presets.$k | Sort-Object { $_.kick + $_.control } -Descending | Select-Object -First 5
    }

    $json = $data | ConvertTo-Json -Depth 5
    $json | Set-Content $outFile -Encoding UTF8
    Write-Host "Data extracted to $outFile"
}
catch {
    Write-Host "Error: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
}
