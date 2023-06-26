/** @format */

import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ExcelJS from 'exceljs'
import { ToastContainer, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import { createHexagonImage } from './HexagonModel/createHexagonImage'

const ExcelReader = () => {
  const fileInputRef = useRef(null)
	const svgRef = useRef(null)
	const [response, setResponse] = useState('')
	const [excelData, setExcelData] = useState([])
	const [excelData1, setExcelData1] = useState([])
	const [hexagonColor, setHexagonColor] = useState('gold')
	const [excelHeader, setExcelHeader] = useState([])

	useEffect(() => {
    const svg = d3.select(svgRef.current)
    const { width, height } = svg.node().getBoundingClientRect()

		if (setHexagonColor) {
			d3.select(svg.current).selectAll('*').remove()
    }
	if (svgRef.current) {
		d3.select(svgRef.current).selectAll('*').remove()
	}
    const hexagonImage = createHexagonImage('/images/logo.jpg', 55,hexagonColor )
	d3.select(hexagonImage)
		.attr('x', width / 2 - 110 )
		.attr('y',  height / 4 - 55 )
    .attr('cursor', 'grab')
		.call(
			d3.drag().on('drag', (event) => {
				const newX = event.x - 33
				const newY = event.y - 33
				d3.select(hexagonImage).attr('x', newX).attr('y', newY)
			})
		)
    .on('click', () => {
      fileInputRef.current.click()
    })

	// Append the hexagon image to the SVG
	svg
		.node()
		.appendChild(hexagonImage)

	}, [hexagonColor])
	/////////////////////////////end/of/hexagon/creating///////////////////////////////////////////

	const handleFileChange = async (event) => {
		const file = event.target.files[0]
		setHexagonColor('silver')
		try {
			const workbook = new ExcelJS.Workbook()
			await workbook.xlsx.load(file)

			const worksheet = workbook.getWorksheet(1)
			const jsonData = []
			const Serials = worksheet
				.getColumn('G')
				.values.map((cell) => (cell ? cell.toString() : ''))
				.filter((item) => item !== 'null')

			worksheet.eachRow((row) => {
				const rowData = row.values.map((cell) => cell.toString())
				if (row.number === 1) {
					setExcelHeader(rowData.slice(1))
				} else {
					// const filteredArray = rowData.filter((item) => item);
					jsonData.push(rowData)
				}
			})
			setExcelData(jsonData)
			setExcelData1(Serials.slice(1))
		} catch (error) {
			console.error(error)
		}
	}

	///////////////////////end/of/excel/reading//////////////////////////////////////
	useEffect(() => {
		const fetchData = async () => {
			try {
				const responses = await Promise.all(
					excelData1.map(async (serial) => {
						try {
							const requestBody = { serial }
							const response = await fetch('/api/assetCheck', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(requestBody),
							})

							const data = await response.json()
							return data
						} catch (error) {
							console.error('Error:', error)
						}
					})
				)
				setResponse(responses)
			} catch (error) {
				console.error('Error:', error)
			}
		}

		if (excelData1.length > 0) {
			fetchData()
		}
	}, [excelData1])

	const existData = response
		? response.reduce((acc, array) => {
				if (Array.isArray(array)) {
					// Add this check to ensure `array` is an array
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
					}))
					return acc.concat(mappedArray)
				} else {
					return acc
				}
		  }, [])
		: []

	const Contradiction = existData.filter((obj) => {
		const matchingArray = excelData.find((array) => array[7] == obj.serial)
		return (
			matchingArray && matchingArray[4].split('>').slice(-1)[0] !== obj.category
		)
	})
	console.log(Contradiction)

	const newItems = excelData.filter((item) =>
		item.every(
			(value) => !existData.some((existData) => existData.serial === value)
		)
	)
	const newRows = newItems.map((array) => array.slice(1))

	// newData contains rows that exist in rowData but not in existData

	// {  assetCode: 'John Doe', assetName: 77, category: 'john.doe@example.com', serial:'onjash', status:'test', location:'mest', imei:'fest', mac:'jest', imsi:'fest', iccid:'rest' },

	//generateExcelByData

	const generateExcel = async () => {
		const url = '/api/test' // Replace with the appropriate API URL

		const requestBody = {
			header: excelHeader,
			rows: newRows,
			font: { name: 'Arial', size: 12 }, // Optional: Customize the font properties
			headerBgColor: 'ff499b01', // Optional: Provide a custom background color (in ARGB format)
			cellBgColor: 'ffa5cd39',
			headerFontColor: 'ffffffff',
			cellFontColor: 'ffffffff',
			columnWidths: [
				20, 33, 22, 33, 44, 55, 66, 77, 11, 22, 44, 33, 66, 44, 22, 10, 10, 10,
				10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
				10, 10, 10, 10, 10, 10, 10, 10, 10, 40, 40, 40, 40, 70, 10, 10, 10, 10,
				10,
			],
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			})

			if (response.ok) {
				const blob = await response.blob()
				const downloadLink = document.createElement('a')
				downloadLink.href = URL.createObjectURL(blob)
				downloadLink.download = 'generated_file.xlsx'
				downloadLink.click()
			} else {
				console.error(
					'Failed to generate Excel file:',
					response.status,
					response.statusText
				)
			}
		} catch (error) {
			console.error('An error occurred:', error)
		}
	}

	const handleGenerateExcel = () => {
		generateExcel()
	}

  const sendToast = () =>{
  toast.info(` selected to this location`)
  }
  
  return (
		<div>
      		<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar
				newestOnTop
				pauseOnFocusLoss
				draggable
				pauseOnHover
				transition={Zoom}
			/>
			<svg
				ref={svgRef}
				width='100%'
				height='40vh'></svg>

			<input
				type='file'
				style={{ display: 'none' }}
				accept='.xlsx, .xls'
				ref={fileInputRef}
				onChange={handleFileChange}
			/>
		{!existData || (existData && existData.length === 0) ? (
      sendToast()
) : (
  <button onClick={handleGenerateExcel}>Generate Excel</button>
)}

			<table className='contradiction-table'>
				<thead>
					<tr>
						{Contradiction.length > 0 &&
							Object.keys(Contradiction[0]).map((key) => (
								<th key={key}>{key}</th>
							))}
					</tr>
				</thead>
				<tbody>
					{Contradiction.map((row, index) => (
						<tr key={index}>
							{Object.entries(row).map(([key, value], index) => (
								<td
									key={index}
									style={
										key === 'category' ? { backgroundColor: '#fa7d5a' } : null
									}>
									{value}
								</td>
							))}
						</tr>
					))}
					{existData.map((row, index) => (
						<tr key={index}>
							{Object.entries(row).map(([key, value], index) => (
								<td key={index}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ExcelReader
