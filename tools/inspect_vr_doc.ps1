$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

function Get-SheetNames {
    param (
        [string]$filePath
    )

    Write-Host "Opening $filePath..."
    $workbook = $null
    try {
        $workbook = $excel.Workbooks.Open($filePath)
        Write-Host "Sheet Names:"
        foreach ($sheet in $workbook.Sheets) {
            Write-Host " - $($sheet.Name)"
        }
        
        # Try to find a sheet likely to have stats, e.g., "Char", "Stats", "List"
        # And Equipment
        
        foreach ($sheet in $workbook.Sheets) {
            if ($sheet.Name -match "キャラ" -or $sheet.Name -match "ステータス" -or $sheet.Name -match "選手") {
                Write-Host "`n--- Potential Character Sheet: $($sheet.Name) (First 10 rows) ---"
                $usedRange = $sheet.UsedRange
                for ($r = 1; $r -le [Math]::Min($usedRange.Rows.Count, 10); $r++) {
                    $rowStr = ""
                    for ($c = 1; $c -le [Math]::Min($usedRange.Columns.Count, 15); $c++) {
                        $rowStr += $sheet.Cells.Item($r, $c).Text + "`t"
                    }
                    Write-Host $rowStr
                }
            }
            
            if ($sheet.Name -match "装備" -or $sheet.Name -match "アイテム") {
                Write-Host "`n--- Potential Equipment Sheet: $($sheet.Name) (First 10 rows) ---"
                $usedRange = $sheet.UsedRange
                for ($r = 1; $r -le [Math]::Min($usedRange.Rows.Count, 10); $r++) {
                    $rowStr = ""
                    for ($c = 1; $c -le [Math]::Min($usedRange.Columns.Count, 10); $c++) {
                        $rowStr += $sheet.Cells.Item($r, $c).Text + "`t"
                    }
                    Write-Host $rowStr
                }
            }
        }
    }
    catch {
        Write-Host "Error reading $filePath : $_"
    }
    finally {
        if ($workbook) {
            $workbook.Close($false)
            [System.Runtime.Interopservices.Marshal]::ReleaseComObject($workbook) | Out-Null
        }
    }
}

$currentDir = Get-Location
$file = "$currentDir\Inazuma Eleven VR Document v2.10.xlsx"
Get-SheetNames $file

$excel.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
