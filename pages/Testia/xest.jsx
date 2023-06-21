import { read, utils } from 'xlsx';
import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ExcelReader = () => {
  const fileInputRef = useRef(null);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const svgContainer = d3.select('#hexagon-container');

    // Append a hexagon shape
    const hexagon = svgContainer
      .append('path')
      .attr('d', 'M 60 10 L 110 10 L 140 60 L 110 110 L 60 110 L 30 60 Z')
      .attr('fill', 'steelblue')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on('click', () => {
        fileInputRef.current.click();
      });

    return () => {
      hexagon.remove(); // Remove the hexagon shape when component unmounts
    };
  }, []);

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
      <svg id="hexagon-container" width="200" height="200">
        {/* Hexagon shape will be appended here */}
      </svg>

      <input
        type="file"
        style={{ display: 'none' }}
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

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
