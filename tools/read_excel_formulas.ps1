$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

function Read-ExcelFormulas {
    param (
        [string]$filePath
    )

    Write-Host "Reading Formulas from $filePath..."

    $workbook = $null
    try {
        $workbook = $excel.Workbooks.Open($filePath)
        
        foreach ($sheet in $workbook.Sheets) {
            Write-Host "--- Sheet: $($sheet.Name) ---"
            $usedRange = $sheet.UsedRange
            $rows = $usedRange.Rows.Count
            $cols = $usedRange.Columns.Count

            # Scan first 50 rows and 20 columns specifically looking for calculations
            for ($r = 1; $r -le [Math]::Min($rows, 50); $r++) {
                for ($c = 1; $c -le [Math]::Min($cols, 20); $c++) {
                    $cell = $sheet.Cells.Item($r, $c)
                    $formula = $cell.Formula
                    $text = $cell.Text
                    
                    # Only print if it looks like a formula (starts with =) or has a label
                    if ($formula -like "=*") {
                        Write-Host "R${r}C${c} | $text | Formula: $formula"
                    }
                    elseif ($text -ne "") {
                        # Print labels to identify what the formula belongs to
                        # Output in a compact way
                        # Write-Host "R${r}C${c} Label: $text"
                    }
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
$files = Get-ChildItem -Path $currentDir -Filter "*.xlsx"

foreach ($file in $files) {
    # Read all relevant files
    if ($file.Name -match "TOTAL AT" -or $file.Name -match "技") {
        Read-ExcelFormulas $file.FullName
        Write-Host "`n==============================================`n"
    }
}

$excel.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
