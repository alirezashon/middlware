/** @format */

import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ExcelJS from 'exceljs'
import { createHexagonImage } from '../Components/createHexagonImage'
import CheckList from '../Components/CheckList'
import Table from '../Components/Table'
import GenerateExcel from '../Components/GenerateExcel'

const ExcelReader = () => {
	const fileInputRef = useRef(null)
	const svgRef = useRef(null)
	const [response, setResponse] = useState('')
	const [excelData, setExcelData] = useState([])
	const [excelData1, setExcelData1] = useState([])
	const [hexagonColor, setHexagonColor] = useState('gold')
	const [excelHeader, setExcelHeader] = useState([])
	const [progress, setProgress] = useState(0)
	const [isDialogVisible, setIsDialogVisible] = useState(false)

	const handleButtonClick = () => {
		setIsDialogVisible(true)
	}

	const handleDialogClose = () => {
		setIsDialogVisible(false)
	}
	//////////////////////////Top codes are about generate buttons dialog//////////////////////////////////////////////
	useEffect(() => {
		const svg = d3.select(svgRef.current)
		const { width, height } = svg.node().getBoundingClientRect()

		if (setHexagonColor) {
			d3.select(svg.current).selectAll('*').remove()
		}
		if (svgRef.current) {
			d3.select(svgRef.current).selectAll('*').remove()
		}

		const hexagonImage = createHexagonImage(
			'/images/logo.jpg',
			55,
			hexagonColor
		)
		const circleRadius = 2 * 55 // 2 times the hexagon size

		// Append the circle to the SVG
		const Maincircle = svg
			.append('circle')
			.attr('cx', width / 2)
			.attr(
				'cy',
				progress === 0 || progress === 100 ? height / 2.5 : height / 2
			)
			.attr('r', circleRadius)
			.attr('fill', 'none')
			.attr('stroke', '#f0f0f0')
			.attr('stroke-width', 2)

		const circle = svg
			.append('circle')
			.attr('cx', width / 2)
			.attr(
				'cy',
				progress === 0 || progress === 100 ? height / 2.5 : height / 2
			)
			.attr('r', circleRadius)
			.attr('fill', 'none')
			.attr('stroke', progress === 100 ? '#f0f0f0' : 'yellow')
			.attr('stroke-width', 2)

		const hexagonContainer = svg.append('g')

		// Append the hexagon image to the SVG
		hexagonContainer.node().appendChild(hexagonImage)

		// Position and interact with the hexagon image
		d3.select(hexagonImage)
			.attr('x', width / 2 - 59)
			.attr(
				'y',
				progress === 0 || progress === 100 ? height / 2.5 - 59 : height / 2 - 59
			)
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
			const sentPy = []
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
					sentPy.push(rowData.slice(1))
				}
				setExcelData(jsonData)

				setExcelData1(Serials.slice(1))
			})
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

	const ContradictionCategory = existData.filter((obj) => {
		const matchingArray = excelData.find((array) => array[7] == obj.serial)
		return (
			matchingArray && matchingArray[4].split('>').slice(-1)[0] !== obj.category
		)
	})
	const ContradictionName = existData.filter((obj) => {
		const matchingArray = excelData.find((array) => array[7] == obj.serial)
		return matchingArray && matchingArray[2] !== obj.assetName
	})

	const removeAssetName = existData.filter(
		(obj) => !ContradictionName.some((item) => item.serial === obj.serial)
	)
	const filteredExistData = removeAssetName.filter(
		(obj) => !ContradictionCategory.some((item) => item.serial === obj.serial)
	)
	const newItems = excelData.filter((item) =>
		item.every(
			(value) => !existData.some((existData) => existData.serial === value)
		)
	)
	const oldItems = excelData.filter((item) =>
		item.some((value) =>
			existData.some((existData) => existData.serial === value)
		)
	)
	const newRows = newItems.map((array) => array.slice(1))
	const oldRows = oldItems.map((array) => array.slice(1))

	return (
		<>
			<div
				style={
					progress == 0
						? {
								height: '120vh',
								backgroundImage:
									'radial-gradient(circle at 50% 50%, #cdeb97 46.67%, #ddf1c8 20.33%, #dae7b9 50%, #e5f3a7 26.67%, #d8e7c0 83.33%, #d7e9a8 10%, #d9ebbd)',
						  }
						: {}
				}>
				<svg
					className='svg-container'
					style={{
						backgroundColor:
							progress === 0 || progress === 100
								? 'rgba(0,0,0,0)'
								: 'rgba(40,40,40,0.9)',
						width: progress === 0 ? '100%' : '20%',
						height: progress === 0 ? '100vh' : '40vh',
						marginLeft: progress === 0 ? '0' : '40%',
						paddingTop: progress === 0 ? '9%' : '0',
						borderRadius: progress === 0 ? '0' : '100%',
					}}
					ref={svgRef}></svg>
				{progress > 0 && progress < 101 && <div class='background_gif'> </div>}
				<input
					type='file'
					style={{ display: 'none' }}
					accept='.xlsx, .xls'
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
				<div className='buttons-box'>
					{progress === 100 && newRows.length > 0 && (
						<>
							<button
								className='dialog-btn'
								onClick={() => handleButtonClick()}
								onMouseEnter={() => handleButtonClick()}>
								Generate excels
							</button>

							{isDialogVisible && (
								<div className='dialog-overlay'>
									<div className='dialog'>
										<div className='generate-btns'>
											<button
												className='excel-btn'
												onClick={() => handleButtonClick()}>
												<GenerateExcel
													rows={newRows}
													cells={excelHeader}
													btnName={'(New Data)'}
												/>
											</button>
											<button
												className='excel-btn'
												onClick={() => handleButtonClick()}>
												<GenerateExcel
													rows={oldRows}
													cells={excelHeader}
													btnName={'(Old Data)'}
												/>
											</button>
										</div>
										<button
											className='close-btn'
											onClick={handleDialogClose}>
											Close
										</button>
									</div>
								</div>
							)}
						</>
					)}
					{existData.length > 0 && <CheckList sampleData={existData} />}
				</div>
				<Table
					existData={filteredExistData}
					contradictionName={ContradictionName}
					contradictionCategory={ContradictionCategory}
				/>
			</div>
		</>
	)
}

export default ExcelReader
