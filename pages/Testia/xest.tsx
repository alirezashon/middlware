import React from 'react';

const MyComponent: React.FC = () => {
  const generateExcel = async () => {
    const url = '/api/test' // Replace with the appropriate API URL

    const requestBody = {
      header: ['Asset Code', 'Asset Name', 'Category', 'Serial NO', 'Status', 'AssetLocation', 'IMEI', 'MAC', 'IMSI', 'ICCID'],
      rows: [
        ['AC001', 'Asset 1', 'Category 1', 'SN001', 'Active', 'Location 1', 'IMEI001', 'MAC001' , "",'IMSIee', 'ICCID001'],
        ['AC002', 'Asset 2', 'Category 2', 'SN002', 'Inactive', 'Location 2', 'IMEI002', 'MAC002', 'IMSI002',null ,'ICCID002','ali'],
        // Add more rows as needed
      ],
      font: { name: 'Arial', size: 12 }, // Optional: Customize the font properties
      headerBgColor: 'ff499b01', // Optional: Provide a custom background color (in ARGB format)
      cellBgColor: 'ffa5cd39',
      headerFontColor : 'ffffffff',
      cellFontColor: 'ffffffff',
      columnWidths:[30,33,22,33,44,55,66,77,11,22,44,33,66,44,22]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'generated_file.xlsx';
        downloadLink.click();
      } else {
        console.error('Failed to generate Excel file:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleGenerateExcel = () => {
    generateExcel();
  };

  return (
    <div>
      <button onClick={handleGenerateExcel}>Generate Excel</button>
    </div>
  );
};

export default MyComponent;
