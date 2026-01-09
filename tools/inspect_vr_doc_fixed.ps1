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
        
        foreach ($sheet in $workbook.Sheets) {
            # Check for Character/Stats sheets
            $isChar = ($sheet.Name -match "キャラ") -or ($sheet.Name -match "ステータス") -or ($sheet.Name -match "選手")
            
            if ($isChar) {
                Write-Host " "
                Write-Host "--- Potential Character Sheet: $($sheet.Name) (First 10 rows) ---"
                $usedRange = $sheet.UsedRange
                # Use simple loop to avoid complex object handling issues
                $rows = $usedRange.Rows.Count
                $cols = $usedRange.Columns.Count
                
                $limitRow = if ($rows -lt 10) { $rows } else { 10 }
                $limitCol = if ($cols -lt 15) { $cols } else { 15 }

                for ($r = 1; $r -le $limitRow; $r++) {
                    $rowStr = ""
                    for ($c = 1; $c -le $limitCol; $c++) {
                        $cell = $sheet.Cells.Item($r, $c)
                        $txt = $cell.Text
                        $rowStr += "$txt`t"
                    }
                    Write-Host $rowStr
                }
            }
            
            # Check for Equipment sheets
            $isEquip = ($sheet.Name -match "装備") -or ($sheet.Name -match "アイテム")
            
            if ($isEquip) {
                Write-Host " "
                Write-Host "--- Potential Equipment Sheet: $($sheet.Name) (First 10 rows) ---"
                $usedRange = $sheet.UsedRange
                $rows = $usedRange.Rows.Count
                $cols = $usedRange.Columns.Count

                $limitRow = if ($rows -lt 10) { $rows } else { 10 }
                $limitCol = if ($cols -lt 10) { $cols } else { 10 }

                for ($r = 1; $r -le $limitRow; $r++) {
                    $rowStr = ""
                    for ($c = 1; $c -le $limitCol; $c++) {
                        $cell = $sheet.Cells.Item($r, $c)
                        $txt = $cell.Text
                        $rowStr += "$txt`t"
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
