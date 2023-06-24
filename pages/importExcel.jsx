import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ExcelJS from 'exceljs';
import Page from './index.tsx'
const ExcelReader = () => {
  const fileInputRef = useRef(null);
  const [response, setResponse] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [excelData1, setExcelData1] = useState([]);
  const [hexagonColor, setHexagonColor] = useState(['yellow', 'green']);
  const [excelRows, setExcelRows] = useState()
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

      worksheet.eachRow({ includeEmpty: true }, (row) => {
        const rowData = row.values.map((cell) => (cell ? cell.toString() : ''));
        setExcelRows(rowData)
        const filteredArray = rowData.filter((item) => item !== 'null');
        jsonData.push(filteredArray);
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
    }, [])
  : [];
const existingSerials = new Set(existData.map((item) => item.serial));

const newData = excelData
  .filter((row) => {
    const rowDataSerial = row[6]; // Assuming the serial is at index 6 in rowData
    return !existingSerials.has(rowDataSerial);
  })
  .map((row) => ({
    assetCode: row[0], // Assuming the assetCode is at index 0 in rowData
    assetName: row[1], // Assuming the assetName is at index 1 in rowData
    category: row[2], // Assuming the category is at index 2 in rowData
    serial: row[6], // Assuming the serial is at index 6 in rowData
    status: row[3], // Assuming the status is at index 3 in rowData
    location: row[4], // Assuming the location is at index 4 in rowData
    imei: row[5], // Assuming the imei is at index 5 in rowData
    mac: row[7], // Assuming the mac is at index 7 in rowData
    imsi: row[8], // Assuming the imsi is at index 8 in rowData
    iccid: row[9], // Assuming the iccid is at index 9 in rowData
  }));


// newData contains rows that exist in rowData but not in existData

   // {  assetCode: 'John Doe', assetName: 77, category: 'john.doe@example.com', serial:'onjash', status:'test', location:'mest', imei:'fest', mac:'jest', imsi:'fest', iccid:'rest' },

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
      
      <h1>SPLIOTING</h1>

      <table className="data-table">
  <thead>
    <tr>
      {newData.length > 0 &&
        Object.keys(newData[0]).map((key) => (
          <th key={key}>{key}</th>
        ))
      }
    </tr>
  </thead>
  <tbody>
    {newData.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
      {/* <div>{JSON.stringify(existData)}</div> */}
      {/* {existData && existData.length > 0 &&
        <button onClick={handleDownload}>Download Excel</button>
      } */}
  
    </div>
  );
};

export default ExcelReader;
