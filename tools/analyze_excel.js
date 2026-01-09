
const XLSX = require('xlsx');
const fs = require('fs');

const filePath = 'TOTAL AT 計算表（50lvシンク）.xlsx';

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

try {
    const workbook = XLSX.readFile(filePath);
    console.log('Sheet Names:', workbook.SheetNames);

    workbook.SheetNames.forEach(sheetName => {
        console.log(`\n--- Sheet: ${sheetName} ---`);
        const worksheet = workbook.Sheets[sheetName];
        // Convert to JSON to see the data structure, limit to first 10 rows
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        data.slice(0, 10).forEach(row => {
            console.log(JSON.stringify(row));
        });
    });

} catch (e) {
    console.error('Error reading file:', e);
}
