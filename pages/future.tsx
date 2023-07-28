/** @format */

import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ExcelJS from 'exceljs'
import ProcessData from '../Components/ProcessData'
const ExcelReader = () => {
	const fileInputRef = useRef(null)
	const svgRef = useRef(null)
	const [excelData, setExcelData] = useState([])
	const [excelData1, setExcelData1] = useState([])
	const [hexagonColor, setHexagonColor] = useState('gold')
	const [excelHeader, setExcelHeader] = useState([])
	const [progress, setProgress] = useState(0)

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

		const randomBetween = (min, max) => Math.random() * (max - min) + min

		const createLightning = (direction) => {
			const points = []

			// Define the space from the center for any direction
			const spaceFromCenter = 0.295 * Math.min(width, height)
			const spaceFromCenterSubDirections = 0.21 * Math.min(width, height)

			// Define the x and y coordinates for the starting point and the angle based on the direction
			let x, y, angle, length

			switch (direction) {
				case 'east':
					x = width / 2 + spaceFromCenter
					y = height / 2
					angle = 0
					length = 130 // Specify the length for the east direction
					break
				case 'north':
					x = width / 2
					y = height / 2 - spaceFromCenter
					angle = -Math.PI / 2
					length = 38 // Specify the length for the north direction
					break
				case 'west':
					x = width / 2 - spaceFromCenter
					y = height / 2
					angle = Math.PI
					length = 130 // Specify the length for the west direction
					break
				case 'south':
					x = width / 2
					y = height / 2 + spaceFromCenter
					angle = Math.PI / 2
					length = 35 // Specify the length for the south direction
					break
				case 'west-south':
					x = width / 2 + spaceFromCenterSubDirections
					y = height / 2 + spaceFromCenterSubDirections
					angle = Math.PI / 4
					length = 90 // Specify the length for the west-south direction
					break
				case 'east-south':
					x = width / 2 - spaceFromCenterSubDirections
					y = height / 2 + spaceFromCenterSubDirections
					angle = (3 * Math.PI) / 4
					length = 110 // Specify the length for the east-south direction
					break
				case 'west-north':
					x = width / 2 - spaceFromCenterSubDirections
					y = height / 2 - spaceFromCenterSubDirections
					angle = (-3 * Math.PI) / 4
					length = 100 // Specify the length for the west-north direction
					break
				case 'east-north':
					x = width / 2 + spaceFromCenterSubDirections
					y = height / 2 - spaceFromCenterSubDirections
					angle = -Math.PI / 4
					length = 120 // Specify the length for the east-north direction
					break
				default:
					x = width / 2
					y = height / 2
					angle = 0
					length = 77 // Default length
			}

			points.push([x, y])

			// Generate the lightning path with multiple segments
			for (let i = 0; i < 7; i++) {
				x += length * 0.77 * Math.cos(angle)
				y += length * 0.77 * Math.sin(angle)
				points.push([x, y])
				angle += randomBetween(-Math.PI / 4, Math.PI / 4)
			}

			// Draw the lightning path
			const lineGenerator = d3.line()
			svg
				.append('path')
				.datum(points)
				.attr('d', lineGenerator)
				.attr('fill', 'none')
				.attr('stroke', '#e1fcfb')
				.attr('stroke-width', 2)
		}

		const clearLightningPaths = () => {
			svg.selectAll('path').remove()
		}

		// Create lightning paths for each direction
		const createMultipleLightnings = () => {
			const directions = [
				'east',
				'north',
				'west',
				'south',
				'west-south',
				'east-south',
				'west-north',
				'east-north',
			]
			clearLightningPaths()
			for (let i = 0; i < directions.length; i++) {
				for (let j = 0; j < 3; j++) {
					setTimeout(() => createLightning(directions[i]), i * 220 + j * 300)
				}
			}
			setTimeout(createMultipleLightnings, directions.length * 220 + 3 * 300)
		}

		createMultipleLightnings()

		const createElectron = (
			svg,
			rx,
			ry,
			cx,
			cy,
			color,
			strokeWidth,
			rotate,
			electronRadius,
			electronSpacing,
			electronCount
		) => {
			const orbit = svg
				.append('ellipse')
				.attr('rx', rx)
				.attr('ry', ry)
				.attr('cx', cx)
				.attr('cy', cy)
				.attr('fill', 'none')
				.attr('stroke', color)
				.attr('stroke-width', strokeWidth)
				.attr('transform', `rotate(${rotate} ${cx} ${cy})`)

			const electrons = []
			for (let i = 0; i < electronCount; i++) {
				const electron = svg
					.append('circle')
					.attr('r', electronRadius)
					.attr('fill', color)
				electrons.push(electron)
			}

			// Function to update the position of the electrons along the orbit path
			const updateElectronPosition = () => {
				const angle = (performance.now() / 100) % 360 // Calculate the angle based on time for continuous rotation
				for (let i = 0; i < electrons.length; i++) {
					const electronAngle = angle + (i * 360) / electronCount // Distribute the electrons evenly along the orbit
					const x =
						cx + rx * Math.cos((electronAngle + rotate) * (Math.PI / 180))
					const y =
						cy + ry * Math.sin((electronAngle + rotate) * (Math.PI / 180))
					electrons[i]
						.attr('cx', x)
						.attr('cy', y)
						.attr('transform', `rotate(${rotate} ${cx} ${cy})`)

				}
				requestAnimationFrame(updateElectronPosition) // Request the next animation frame for smooth rotation
			}

			// Call the function to update the electron positions
			updateElectronPosition()

			return { orbit, electrons }
		}
		// Array of Oval configurations (rx, ry, cx, cy, color, strokeWidth, rotate)
		const ovalConfigs = [
			{
				rx: progress === 0 ? 240 : 144,
				ry: 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 0, // Rotate the first oval by 45 degrees
				electronRadius: 7,
				electronSpacing: 20,
				electronCount: 6,
			},
			{
				rx: progress === 0 ? 240 : 144,
				ry: 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 135, // Rotate the second oval by 135 degrees
				electronRadius: 7,
				electronSpacing: 20,
				electronCount: 6,
			},
			{
				rx: progress === 0 ? 240 : 144,
				ry: 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 45, // Rotate the third oval by 90 degrees
				electronRadius: 7,
				electronSpacing: 20,
				electronCount: 6,
			},
			{
				rx: progress === 0 ? 240 : 144,
				ry: 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 90, // Rotate the third oval by 90 degrees
				electronRadius: 7,
				electronSpacing: 20,
				electronCount: 6,
			},
			// Add more oval configurations here as needed
		]
		// Create the ovals based on the array of oval configurations
		const orbits = ovalConfigs.map((config) =>
			createElectron(svg, ...Object.values(config))
		)

		// ovalConfigs.forEach(({ rx, ry, cx, cy, color, strokeWidth, rotate, electronRadius,electronSpacing,electronCount }) => {
		// 	createOval(svg, rx, ry, cx, cy, color, strokeWidth, rotate, electronRadius,electronSpacing,electronCount)
		// })

		// Define a reusable circle generator function
		function createCircle(
			selection,
			cx,
			cy,
			radius,
			fill,
			stroke,
			strokeWidth
		) {
			return selection
				.append('circle')
				.attr('cx', cx)
				.attr('cy', cy)
				.attr('r', radius)
				.attr('fill', fill)
				.attr('stroke', stroke)
				.attr('stroke-width', strokeWidth)
		}

		const circleBg = createCircle(
			svg,
			width / 2,
			height / 2,
			55,
			'#FFFFFF',
			'none',
			0
		)

		const clipPath = svg
			.append('defs')
			.append('clipPath')
			.attr('id', 'circleClipMenu')
		createCircle(clipPath, width / 2, height / 2, 55, 'none', 'none', 0)

		const images = svg
			.append('image')
			.attr('x', width / 2 - 55)
			.attr('y', progress === 0 ? height / 2 - 55 : height / 2 - 55)
			.attr('width', 110)
			.attr('height', 110)
			.attr('clip-path', 'url(#circleClipMenu)')
			.attr('xlink:href', '/images/logo.jpg')
			.on('click', () => {
				fileInputRef.current.click()
			})
			.attr('cursor', 'pointer')

		// Add a red border around the circle image
		const borderCircleRadius = 60
		createCircle(
			svg,
			width / 2,
			height / 2,
			borderCircleRadius,
			'none',
			'#7bb2d1',
			3
		)

		// Add drag functionality to the image
		d3.select(images.node()).call(
			d3
				.drag()
				.on('drag', (event) => {
					const newX = event.x - 33
					const newY = event.y - 33
					images.attr('x', newX).attr('y', newY)
				})
				.on('end', () => {
					images
						.attr('x', width / 2 - 55)
						.attr('y', progress === 0 ? height / 4 - 55 : height / 2 - 55)
				})
		)

		const circleRadius = progress > 0 ? 160 : 247 // 2 times the hexagon size

		// Circle generator method for other circles
		function createMainCircle(selection, radius, strokeColor) {
			return createCircle(
				selection,
				width / 2,
				height / 2,
				radius,
				'none',
				strokeColor,
				2
			)
		}

		const Maincircle = createMainCircle(svg, circleRadius, '#36769c')
		const circle = createMainCircle(
			svg,
			circleRadius,
			progress === 100 ? '#ffffff' : 'yellow'
		)

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
					setExcelHeader(rowData)
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
	const darkColorRange = [
		'#558aab',
		'#34495e',
		'#323d5e',
		'#34495e',
		'#2c3e50',
		'#34495e',
		'#2c3e50',
		'#34495e',
	]

	// Convert the darkColorRange into a string format
	const darkColorStops = darkColorRange.map((color, index) => {
		const percentage = (index / (darkColorRange.length - 1)) * 100
		return `${color} ${percentage}%`
	})

	const darkRadialGradient = `radial-gradient(circle at 50% 48%, ${darkColorStops.join(
		', '
	)})`

	return (
		<>
			<div
				style={
					progress == 0
						? {
								overflowY: 'hidden',
								margin: -10,
								height: '100vh',
								backgroundImage: darkRadialGradient,
								// backgroundImage:
								// 	'radial-gradient(circle at 50% 48%, #cdeb97 24%, #e9fcae 29%, #dae7b9 20%, #e5f3a7 28.67%, #d8e7c0 40.33%, #d7e9a8 60%, #d9ebbd)',
						  }
						: {}
				}>
				<svg
					className='svg-container'
					style={{
						backgroundColor:
							progress === 0 ? 'rgba(0,0,0,0)' : 'rgba(30,90,90,0.6)',
						width: progress === 0 ? '100%' : '22%',
						height: progress === 0 ? '100vh' : '40vh',
						marginLeft: progress === 0 ? '0' : '40%',
						paddingTop: progress === 0 ? '0%' : '0vh',
						borderRadius: progress === 0 ? '0' : '100%',
					}}
					ref={svgRef}></svg>
				{progress > 0 && progress < 100 && <div class='background_gif'> </div>}
				<input
					type='file'
					style={{ display: 'none' }}
					accept='.xlsx, .xls'
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</div>
		</>
	)
}

export default ExcelReader
