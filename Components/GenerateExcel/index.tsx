import React from 'react';

interface GenerateExcelProps {
  rows: any[]; // Replace `any` with the appropriate type for your rows data
  cells: any[]; // Replace `any` with the appropriate type for your cells data
}

const GenerateExcel: React.FC<GenerateExcelProps> = ({ rows, cells }) => {
  const generateExcel = async () => {
    const url = '/api/GenerateCustomExcel'; // Replace with the appropriate API URL

    const requestBody = {
      header: cells,
      rows: rows,
      font: { name: 'Arial', size: 12 },
      headerBgColor: 'ff05254f',
      cellBgColor: 'ff22b8d6',
      headerFontColor: 'ffffffff',
      cellFontColor: 'ffffffff',
      columnWidths: [
        20, 33, 22, 55, 44, 55, 66, 77, 11, 22, 44, 33, 66, 44, 22, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 40, 40, 40, 40, 70, 10, 10, 10, 10,
        10,
      ],
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
        downloadLink.download = 'Asset.xlsx';
        downloadLink.click();
      } else {
        console.error(
          'Failed to generate Excel file:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <button onClick={generateExcel}>
      Generate Excel
    </button>
  );
};

export default GenerateExcel;
