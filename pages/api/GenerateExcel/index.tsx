// import { NextApiRequest, NextApiResponse } from 'next'
// import ExcelJS from 'exceljs'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const data = req.query.data as string // Assuming the data array is passed as a query parameter

//   try {
//     const dataArray = JSON.parse(data)

//     const columnWidths = [22, 22, 22, 27, 29, 39, 22, 22, 22, 29 ] // Adjust the widths as needed for each column

//     // Create a new workbook
//     const workbook = new ExcelJS.Workbook()

//     // Add a worksheet to the workbook
//     const worksheet = workbook.addWorksheet('Sheet 1')

//     // Set the header row with background color and adjust column widths
//     const headerRow = worksheet.getRow(1)
//     headerRow.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: 'FF91D2FF' }, // Red color
//     }
//     headerRow.values = ['Asset Code', 'Asset Name', 'Category', 'Serial NO', 'Status', 'AssetLocation', 'IMEI', 'MAC', 'IMSI', 'ICCID']
//     worksheet.columns = columnWidths.map((width) => ({ width }))

//     // Set font properties for header row
//     const headerFont = { bold: true, name: 'soheezy', size: 12 }
//     headerRow.font = headerFont

//     // Add data rows and adjust column widths
//     dataArray.forEach((row: { assetCode: string; assetName: string; category: string; serial: string; status: string; location: string; imei: string; mac: string; imsi: string; iccid: string; }, index: number) => {
//       const dataRow = worksheet.addRow([row.assetCode, row.assetName, row.category, row.serial, row.status, row.location, row.imei, row.mac, row.imsi, row.iccid])
//       dataRow.eachCell((cell, colNumber) => {
//         cell.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: 'FFFFFF00' }, // Yellow color
//         }
//         const column = worksheet.getColumn(colNumber);
//         if (column) {
//           column.width = Math.max(column.width || 0, columnWidths[colNumber - 1]);
//         }
//       })
//     })

//     // Generate a download link and trigger the download
//     const buffer = await workbook.xlsx.writeBuffer()
//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     )
//     res.setHeader('Content-Disposition', 'attachment; filename=generated_file.xlsx')
//     res.send(buffer)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'An error occurred' })
//   }
// }



import { NextApiRequest, NextApiResponse } from 'next';
import ExcelJS from 'exceljs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query.data as string; // Assuming the data array is passed as a query parameter

  try {
    const dataArray = JSON.parse(data);

    const columnWidths = [22, 22, 22, 27, 29, 39, 22, 22, 22, 29]; // Adjust the widths as needed for each column

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet to the workbook
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Set the header row with background color and adjust column widths
    const headerRow = worksheet.getRow(1);
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF91D2FF' }, // Blue color
    };
    headerRow.values = [
      'Asset Code',
      'Asset Name',
      'Category',
      'Serial NO',
      'Status',
      'AssetLocation',
      'IMEI',
      'MAC',
      'IMSI',
      'ICCID',
    ];
    worksheet.columns = columnWidths.map((width) => ({ width }));

    // Set font properties for header row
    const headerFont = { bold: true, name: 'Arial', size: 12 };
    headerRow.font = headerFont;

    // Add data rows and adjust column widths
    dataArray.forEach(
      (row: {
        assetCode: string;
        assetName: string;
        category: string;
        serial: string;
        status: string;
        location: string;
        imei: string;
        mac: string;
        imsi: string;
        iccid: string;
      }, index: number) => {
        const dataRow = worksheet.addRow([
          row.assetCode,
          row.assetName,
          row.category,
          row.serial,
          row.status,
          row.location,
          row.imei,
          row.mac,
          row.imsi,
          row.iccid,
        ]);

        dataRow.eachCell((cell, colNumber) => {
          // Set background color for cells based on the column index
          if (colNumber % 2 === 0) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFCCEEFF' }, // Light blue color
            };
          } else {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFFF00' }, // Yellow color
            };
          }

          const column = worksheet.getColumn(colNumber);
          if (column) {
            column.width = Math.max(column.width || 0, columnWidths[colNumber - 1]);
          }
        });

        // Alternate the background color of adjacent cells in each row
        if (index % 2 === 0) {
          dataRow.eachCell((cell, colNumber) => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFFFFF' }, // White color
            };
          });
        }
      }
    );

    // Generate a download link and trigger the download
    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=generated_file.xlsx');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
