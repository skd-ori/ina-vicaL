$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$filePath = "$PWD\Inazuma Eleven VR Document v2.10.xlsx"

function Search-Sheet {
    param([string]$sheetName, [string[]]$terms, [int]$cols = 10)
    
    try {
        $sheet = $workbook.Sheets.Item($sheetName)
        Write-Host " "
        Write-Host "--- Searching $sheetName ---"
        
        $usedRange = $sheet.UsedRange
        $rows = $usedRange.Rows.Count
        
        # Simple linear search (slow but effective for this size)
        for ($r = 1; $r -le $rows; $r++) {
            $found = $false
            $rowTxt = ""
            for ($c = 1; $c -le $cols; $c++) {
                $cellTxt = $sheet.Cells.Item($r, $c).Text
                $rowTxt += "$cellTxt`t"
                foreach ($term in $terms) {
                    if ($cellTxt -match $term) { $found = $true }
                }
            }
            if ($found) {
                Write-Host "Found: $rowTxt"
            }
        }
    }
    catch {
        Write-Host "Error reading $sheetName: $_"
    }
}

try {
    $workbook = $excel.Workbooks.Open($filePath)
    
    # Search for Matsukaze Tenma in Characters
    Search-Sheet "Characters" @("Tenma", "天馬") 20
    
    # Search for Equipment
    # Note: The user mentioned "Spike Monster" (スパイクモンスター), "Outei" (王帝)
    Search-Sheet "Boots" @("Monster", "モンスター", "Outei", "王帝", "Zeus", "ゼウス") 10
    Search-Sheet "Bracelet" @("Abyss", "深淵", "Genesis", "ジェネシス") 10
    Search-Sheet "Pendant" @("Chrono", "クロノ", "Victory", "勝利", "Magister", "王者のマフラー") 10
    Search-Sheet "Misc" @("Oga", "Orga", "Omega", "オメガ", "Demon", "魔神", "Pegasus", "ペガサス") 10
}
catch {
    Write-Host "Error opening workbook: $_"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
}
