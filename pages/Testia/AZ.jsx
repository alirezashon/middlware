import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ExcelJS from 'exceljs';

const ExcelReader = () => {
  const fileInputRef = useRef(null);
  const [response, setResponse] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [excelData1, setExcelData1] = useState([]);
  const [hexagonColor, setHexagonColor] = useState(['yellow', 'green']);
  const [excelHeader, setExcelHeader] = useState([]);
  
  useEffect(() => {
    const svgContainer = d3.select('#hexagon-container');
    if (setHexagonColor) {
      d3.select(svgContainer.current).selectAll('*').remove();
    }

    const hexagon = svgContainer
      .append('path')
      .attr('d', 'M 60 10 L 110 10 L 140 60 L 110 110 L 60 110 L 30 60 Z')
      .attr('fill', hexagonColor[0])
      .attr('stroke', hexagonColor[1])
      .attr('stroke-width', 2)
      .call(
        d3.drag().on('drag', function (event, d) {
          const newY = event.y - 60;
          const newX = event.x - 60;
          d3.select(this).attr('transform', `translate(${newX}, ${newY})`);
        })
      )
      .on('click', () => {
        fileInputRef.current.click();
      });

    return () => {
      hexagon.remove();
    };
  }, [hexagonColor]);
/////////////////////////////end/of/hexagon/creating///////////////////////////////////////////

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  setHexagonColor(['#a5cd39', '#499b01']);
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.getWorksheet(1);
    const jsonData = [];
    const Serials = worksheet
      .getColumn('G')
      .values.map((cell) => (cell ? cell.toString() : ''))
      .filter((item) => item !== 'null');

    worksheet.eachRow( (row) => {
      const rowData = row.values.map((cell) => ( cell.toString()));
      if (row.number === 1) {
        setExcelHeader(rowData.slice(1));
      } else {
        // const filteredArray = rowData.filter((item) => item);
        jsonData.push(rowData);
      }
    });
    setExcelData(jsonData);
    setExcelData1(Serials.slice(1));
  } catch (error) {
    console.error(error);
  }
};

///////////////////////end/of/excel/reading//////////////////////////////////////
useEffect(() => {
  const fetchData = async () => {
    try {
      const responses = await Promise.all(
        excelData1.map(async (serial) => {
          try {
            const requestBody = { serial };
            const response = await fetch('/api/assetCheck', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error:', error);
          }
        })
      );
      setResponse(responses);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (excelData1.length > 0) {
    fetchData();
  }
}, [excelData1]);

const existData = response
  ? response.reduce((acc, array) => {
      if (Array.isArray(array)) { // Add this check to ensure `array` is an array
        const mappedArray = array.map((item) => ({
          assetCode: item.AssetCode,
          assetName: item.AssetName,
          category: item.CategoryName,
          serial: item.Serial,
          status: item.Status,
          location: item.LocationName,
          imei: item.IMEI,
          mac: item.Brand,
          imsi: item.IMSI,
          iccid: item.ICCID,
        }));
        return acc.concat(mappedArray);
      } else {
        return acc;
      }
    }, [])
  : [];

const Contradiction = existData.filter(obj => {
  const matchingArray = excelData.find(array => array[7] == obj.serial);
  return matchingArray && matchingArray[4].split(">").slice(-1)[0] !== obj.category;
  
});
console.log(Contradiction)



const newItems = excelData.filter((item) =>
  item.every((value) => !existData.some((existData) => existData.serial === value))
  );
  const newRows = newItems.map((array) => array.slice(1));

// newData contains rows that exist in rowData but not in existData

   // {  assetCode: 'John Doe', assetName: 77, category: 'john.doe@example.com', serial:'onjash', status:'test', location:'mest', imei:'fest', mac:'jest', imsi:'fest', iccid:'rest' },

  //generateExcelByData

  
 const generateExcel = async () => {
    const url = '/api/test' // Replace with the appropriate API URL

    const requestBody = {
      header:excelHeader,
      rows:  newRows,
      font: { name: 'Arial', size: 12 }, // Optional: Customize the font properties
      headerBgColor: 'ff499b01', // Optional: Provide a custom background color (in ARGB format)
      cellBgColor: 'ffa5cd39',
      headerFontColor : 'ffffffff',
      cellFontColor: 'ffffffff',
      columnWidths:[20,33,22,33,44,55,66,77,11,22,44,33,66,44,22,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,40,40,40,40,70,10,10,10,10,10]
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

  
  
  
  
  
  
  
//////////////////////////end/of/API/Calling///////////////////////////////////
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
<table className="data-table">
  <thead>
    <tr>
      {existData.length > 0 &&
        Object.keys(existData[0]).map((key) => (
          <th key={key}>{key}</th>
        ))
      }
    </tr>
  </thead>
  <tbody>
    {existData.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ))}
  </tbody>
      </table>
      
            <h1>SPLITING data</h1>

      <table className="data-table">
  <thead>
    <tr>
      {excelData.length > 0 &&
        Object.keys(excelData[0]).map((key) => (
          <th key={key}>{key}</th>
        ))
      }
    </tr>
  </thead>
  <tbody>
    {excelData.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
      <div>{JSON.stringify(excelData)}</div>
      <h1>CONTRADICTION</h1>
      {/* <div>{JSON.stringify(excelData)}</div> */}
    <table className="data-table">
  <thead>
    <tr>
      {Contradiction.length > 0 &&
        Object.keys(Contradiction[0]).map((key) => (
          <th key={key}>{key}</th>
        ))
      }
    </tr>
  </thead>
  <tbody>
    {Contradiction.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

      



       <div>
      <button onClick={handleGenerateExcel}>Generate Excel</button>
      </div>
      
    </div>
  );
};

export default ExcelReader;
