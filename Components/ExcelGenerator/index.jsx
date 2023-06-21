



import { useEffect } from 'react'
import ExcelJS from 'exceljs'

const ExcelGenerator = (data) => {
	useEffect(() => {
		// const data = [
		// 	{ name: 'John Doe', age: 30, email: 'john.doe@example.com' },
		// 	{ name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
		// 	{ name: 'Bob Johnson', age: 35, email: 'bob.johnson@example.com' },
		// ]

		const columnWidths = [20, 10, 30] // Adjust the widths as needed for each column

		// Create a new workbook
		const workbook = new ExcelJS.Workbook()

		// Add a worksheet to the workbook
		const worksheet = workbook.addWorksheet('Sheet 1')

		// Set the header row with background color and adjust column widths
		const headerRow = worksheet.getRow(1)
		headerRow.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF91D2FF' }, // Red color
		}
		headerRow.values = ['Name', 'Age', 'Email']
		worksheet.columns = columnWidths.map((width) => ({ width }))

		// Set font properties for header row
		const headerFont = { bold: true, name: 'soheezy', size: 12 }
		headerRow.font = headerFont

		// Add data rows and adjust column widths
		data.forEach((row, index) => {
			const dataRow = worksheet.addRow([row.name, row.age, row.email])
			dataRow.eachCell((cell, colNumber) => {
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'FFFFFF00' }, // Yellow color
				}
				worksheet.getColumn(colNumber).width = Math.max(
					worksheet.getColumn(colNumber).width,
					columnWidths[colNumber - 1]
				)
			})
		})

		// Generate a download link and trigger the download
		workbook.xlsx.writeBuffer().then((buffer) => {
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			})
			const link = document.createElement('a')
			link.href = URL.createObjectURL(blob)
			link.download = 'generated_file.xlsx'
			link.click()

			// Clean up the temporary link
			URL.revokeObjectURL(link.href)
		})
	}, [])

	return null // This component doesn't render anything visible
}

export default ExcelGenerator
