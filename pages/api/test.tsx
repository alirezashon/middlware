import { NextApiRequest, NextApiResponse } from 'next';
import ExcelJS from 'exceljs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { header, rows, font, headerBgColor, cellBgColor, headerFontColor, cellFontColor, columnWidths } = req.body; // Assuming the header, rows, font, headerBgColor, cellBgColor, headerFontColor, cellFontColor, and columnWidths are provided in the request body

  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet to the workbook
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Set the header row with background color
    const headerRow = worksheet.getRow(1);
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: headerBgColor || 'FF91D2FF' }, // Red color by default if headerBgColor is not provided
   };
    headerRow.values = header;

    // Set font properties for header row
    const headerFont = { bold: true, name: font?.name || 'soheezy', size: font?.size || 12, color: { argb: headerFontColor || '000000FF' } };
    headerRow.font = headerFont;

    // Add data rows
    rows.forEach((row: string[], index: number) => {
      const dataRow = worksheet.addRow(row);
      dataRow.eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: cellBgColor || 'FFFFFF00' }, // Yellow color by default if cellBgColor is not provided
        };
        const cellFont = {
          bold: false,
          name: font?.name || 'soheezy',
          size: font?.size || 12,
          color: { argb: cellFontColor || '000000FF' }, // Black color by default if cellFontColor is not provided
        };
        cell.font = cellFont;
      });
    });

    // Set column widths
    if (columnWidths && Array.isArray(columnWidths)) {
      columnWidths.forEach((width, index) => {
        const column = worksheet.getColumn(index + 1);
        column.width = width;
      });
    }

    // Generate a download link and trigger the download
    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=generated_file.xlsx');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
