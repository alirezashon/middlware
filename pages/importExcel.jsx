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
	const [showDiagram, setShowDiagram] = useState(false)
	const [checkedItems, setCheckedItems] = useState([])
	const [progress, setProgress] = useState(0)

	const handleUpdateClick = () => {
		setShowDiagram(true)
	}

	const handleCloseClick = () => {
		console.log('eee ali nist' + excelHeader)

		setShowDiagram(false)
	}

	const handleCheckboxChange = (serial) => {
		const isChecked = checkedItems.includes(serial)

		if (isChecked) {
			setCheckedItems(checkedItems.filter((item) => item !== serial))
		} else {
			setCheckedItems([...checkedItems, serial])
		}
	}
const handleCheckAllChange = (event) => {
	const isChecked = event.target.checked

	if (isChecked) {
		const allSerials = existData.map((row) => row.serial)
		setCheckedItems(allSerials)
	} else {
		setCheckedItems([])
	}
}

	const handleUpdateSubmit = () => {
		// Perform your update logic here using the checkedItems state
		console.log('Updating Items:', checkedItems)
		setCheckedItems([])
		setShowDiagram(false)
	}
useEffect(() => {
	const svg = d3.select(svgRef.current)
	const { width, height } = svg.node().getBoundingClientRect()

	if (setHexagonColor) {
		d3.select(svg.current).selectAll('*').remove()
	}
	if (svgRef.current) {
		d3.select(svgRef.current).selectAll('*').remove()
	}

	const hexagonImage = createHexagonImage('/images/logo.jpg', 55, hexagonColor)
	const circleRadius = 2 * 55 // 2 times the hexagon size

	// Append the circle to the SVG
  const Maincircle = svg
		.append('circle')
		.attr('cx', width / 2)
		.attr('cy', height / 3)
		.attr('r', circleRadius)
		.attr('fill', 'none')
		.attr('stroke', '#f0f0f0')
		.attr('stroke-width', 2)

	const circle = svg
		.append('circle')
		.attr('cx', width / 2 )
		.attr('cy', height / 3 )
		.attr('r', circleRadius)
		.attr('fill', 'none')
		.attr('stroke', '#a5cd39')
		.attr('stroke-width', 2)

	const hexagonContainer = svg.append('g')

	// Append the hexagon image to the SVG
	hexagonContainer.node().appendChild(hexagonImage)

	// Position and interact with the hexagon image
	d3.select(hexagonImage)
		.attr('x', width / 2 - 59)
		.attr('y', height / 3 - 59 )
		.attr('cursor', 'grab')
		.call(
			d3
				.drag()
				.on('drag', (event) => {
					const newX = event.x - 33
					const newY = event.y - 33
					d3.select(hexagonImage).attr('x', newX).attr('y', newY)
				})
				.on('end', () => {
					d3.select(hexagonImage)
						.attr('x', width / 2 - 55)
						.attr('y', height / 3 - 55)
				})
		)
		.on('click', () => {
			fileInputRef.current.click()
		})

	// Update the circle based on the progress percentage
	const progressPercentage = progress + '%'
	const circumference = 2 * Math.PI * circleRadius
	const progressOffset = circumference * (1 - progress / 100)

	circle
		.attr('stroke-dasharray', `${circumference} ${circumference}`)
		.attr('stroke-dashoffset', progressOffset)
}, [hexagonColor, progress])

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
				const totalRequests = excelData1.length
				let receivedResponses = 0

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

							receivedResponses++
							setProgress((receivedResponses / totalRequests) * 100)

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
	console.log(progress)

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
	const filteredExistData = existData.filter(
		(obj) => !Contradiction.some((item) => item.serial === obj.serial)
	)
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
		const url = '/api/GenerateCustomExcel' // Replace with the appropriate API URL

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
				downloadLink.download = 'Asset.xlsx'
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

	const sendToast = () => {
		//   toast.info(` selected to this location`)
	}

	return (
		<div>
			{/* {progress > 0 && (
				<div className='progress-bar'>
					<div
						className='progress-bar-value'
						style={{
							width: `${progress}%`,
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
						}}></div>
				</div>
			)} */}
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
				style={{marginTop:'1vh'}}
				width='100%'
				height='40vh'></svg>

			<input
				type='file'
				style={{ display: 'none' }}
				accept='.xlsx, .xls'
				ref={fileInputRef}
				onChange={handleFileChange}
			/>
			<div className='buttons-box'>
				{existData.length > 0 && (
					<button onClick={handleUpdateClick}>Update Data</button>
				)}
				{!existData || (existData && existData.length === 0) ? (
					sendToast()
				) : (
					<button onClick={handleGenerateExcel}>Generate Excel</button>
				)}
			</div>
			<table className='contradiction-table'>
				<thead>
					<tr>
						{existData.length > 0 &&
							Object.keys(existData[0]).map((key) => <th key={key}>{key}</th>)}
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
					{filteredExistData.map((row, index) => (
						<tr key={index}>
							{Object.entries(row).map(([key, value], index) => (
								<td key={index}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{/* UPDATE CODE */}
			<div style={{}}>
				{showDiagram && (
					<div className='diagram-box'>
						<div className='scrollable-container'>
							<div className='buttons-box'>
								<button
									className='update-button'
									onClick={handleCloseClick}>
									Close
								</button>
								<button
									className='update-button'
									style={{ backgroundColor: '#a5cd39' }}
									onClick={handleUpdateSubmit}>
									update
								</button>
							</div>
							<table className='contradiction-table'>
								<thead>
									<tr>
										<th>
											<input
												type='checkbox'
	
												onChange={handleCheckAllChange}
											/>
										</th>
										{existData.length > 0 &&
											Object.keys(existData[0]).map((key) => (
												<th key={key}>{key}</th>
											))}
									</tr>
								</thead>
								<tbody>
									{Contradiction.map((row, index) => (
										<tr key={index}>
											<td>
												<input
													type='checkbox'
													checked={checkedItems.includes(row.serial)}
													onChange={() => handleCheckboxChange(row.serial)}
												/>
											</td>
											{Object.entries(row).map(([key, value], index) => (
												<td
													key={index}
													style={
														key === 'category'
															? { backgroundColor: '#fa7d5a' }
															: null
													}>
													{value}
												</td>
											))}
										</tr>
									))}
									{filteredExistData.map((row, index) => (
										<tr key={index}>
											<td>
												<input
													type='checkbox'
													checked={checkedItems.includes(row.serial)}
													onChange={() => handleCheckboxChange(row.serial)}
												/>
											</td>
											{Object.entries(row).map(([key, value], index) => (
												<td key={index}>{value}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ExcelReader
