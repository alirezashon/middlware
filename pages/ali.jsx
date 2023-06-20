import { read, utils } from 'xlsx';
import { useState } from 'react';

const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = new Uint8Array(e.target.result);
        const workbook = read(fileData, { type: 'array' });

        const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData);
      };

      reader.onerror = (error) => {
        console.error(error);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {excelData.length > 0 && (
        <ul>
          {excelData.map((row, index) => (
            <li key={index}>{JSON.stringify(row)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExcelReader;
