$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

function Read-ExcelFile {
    param (
        [string]$filePath
    )

    Write-Host "Reading $filePath..."

    $workbook = $null
    try {
        $workbook = $excel.Workbooks.Open($filePath)
        
        foreach ($sheet in $workbook.Sheets) {
            Write-Host "--- Sheet: $($sheet.Name) ---"
            $usedRange = $sheet.UsedRange
            $rows = $usedRange.Rows.Count
            $cols = $usedRange.Columns.Count

            # Read first 20 rows
            for ($r = 1; $r -le [Math]::Min($rows, 20); $r++) {
                $rowData = @()
                for ($c = 1; $c -le $cols; $c++) {
                    $cell = $sheet.Cells.Item($r, $c)
                    $text = $cell.Text
                    $rowData += $text
                }
                Write-Host ($rowData -join "`t")
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
    if ($file.Name -match "TOTAL AT" -or $file.Name -match "技一") {
        Read-ExcelFile $file.FullName
        Write-Host "`n==============================================`n"
    }
}

$excel.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
