import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ExcelJS from 'exceljs';

const ExcelReader = () => {
const fileInputRef = useRef(null);
const [excelData, setExcelData] = useState([]);
const [excelData1, setExcelData1] = useState([]);
const [hexagonColor, setHexagonColor] = useState(["yellow", "green"]);
//------------------------------D3--------------------------------
  useEffect(() => {
    const svgContainer = d3.select('#hexagon-container');
if (setHexagonColor) { 
			d3.select(svgContainer.current).selectAll('*').remove()
		}
    // Append a hexagon shape
const hexagon = svgContainer
  .append('path')
  .attr('d', 'M 60 10 L 110 10 L 140 60 L 110 110 L 60 110 L 30 60 Z')
  .attr('fill', hexagonColor[0])
  .attr('stroke', hexagonColor[1])
  .attr('stroke-width', 2)
  .call(
    d3.drag().on('drag', function(event, d) {
        const newY = event.y -60;
        const newX = event.x -60; // Corrected case sensitivity
        d3.select(this).attr('transform', `translate(${newX}, ${newY})`);
    })
  )
  .on('click', () => {
    fileInputRef.current.click();
  });

    return () => {
      hexagon.remove(); // Remove the hexagon shape when component unmounts
    };

  }, [hexagonColor]);

 const handleFileChange = async (event) => {
  const file = event.target.files[0];
  setHexagonColor(['#a5cd39', '#499b01']);
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.getWorksheet(1); // Assuming you want to read the first sheet
    const jsonData = [];
    const Serials = worksheet.getColumn('G').values
      .map((cell) => (cell ? cell.toString() : ''))
      .filter((item) => item !== 'null');
  
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      const rowData = row.values.map((cell) => (cell ? cell.toString() : ''));
      const filteredArray = rowData.filter((item) => item !== 'null');
      jsonData.push(filteredArray);
    });

    setExcelData(jsonData);
    setExcelData1(Serials.slice(1));
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <svg id="hexagon-container" width="100%" height="40vh">
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

     {excelData1.length > 0 && (
        <ul>
          {excelData1.map((row, index) => (
            <li key={index}>{JSON.stringify(row)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExcelReader;
