

/** @format */

import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ExcelJS from 'exceljs'
import { createAnimatedCircle } from '../Components/AnimatedCircle'
import ProcessData from '../Components/ProcessData'
const ExcelReader = () => {
	const fileInputRef = useRef(null)
	const svgRef = useRef(null)
	const [excelData, setExcelData] = useState([])


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
		Maincircle.attr('stroke', 'rgba(0, 0, 0, 0.9)') // Shadow color (light gray with some transparency)
			.attr('stroke-width', 4) // Adjust the width of the shadow
			.attr('filter', 'blur(7px)') // Apply a blur f
			.attr('fill', progress > 0 ? 'rgba(0, 0, 0, 0.2)' : 'none') //

		const circle = createMainCircle(
			svg,
			circleRadius,
			progress === 100 ? '#ffffff' : 'yellow'
		)

		// Update the circle based on the progress percentage
		const circumference = 2 * Math.PI * circleRadius
		const progressOffset = circumference * (1 - progress / 100)

		circle
			.attr('stroke-dasharray', `${circumference} ${circumference}`)
			.attr('stroke-dashoffset', progressOffset)
			.attr('stroke', 'yellow') // Shadow color (light gray with some transparency)
			.attr('stroke-width', 4) // Adjust the width of the shadow
			.attr('filter', 'blur(7px)') // Apply a blur f
		const randomBetween = (min, max) => Math.random() * (max - min) + min

		const createLightning = (direction, color) => {
			const points = []

			// Define the space from the center for any direction
			const spaceFromCenter =
				progress > 0
					? 0.34 * Math.min(width, height)
					: 0.286 * Math.min(width, height)
			const spaceFromCenterSubDirections =
				progress > 0
					? 0.244 * Math.min(width, height)
					: 0.204 * Math.min(width, height)
			const innerSpaceFromCenter =
				progress > 0
					? 0.066 * Math.min(width, height)
					: 0.047 * Math.min(width, height)
			const innerSpaceFromCenterSubDirections =
				progress > 0
					? 0.05 * Math.min(width, height)
					: 0.033 * Math.min(width, height)

			// Define the x and y coordinates for the starting point and the angle based on the direction
			let x, y, angle, length

			switch () {
				case 'east':
					x = width / 2 + spaceFromCenter
					y = height / 2
					angle = 0
					length = progress > 0 ? 99 : 130 // Specify the length for the east direction
					break
				case 'north':
					x = width / 2
					y = height / 2 - spaceFromCenter
					angle = -Math.PI / 2
					length = progress > 0 ? 14 : 38 // Specify the length for the north direction
					break
				case 'west':
					x = width / 2 - spaceFromCenter
					y = height / 2
					angle = Math.PI
					length = progress > 0 ? 99 : 130 // Specify the length for the west direction
					break
				case 'south':
					x = width / 2
					y = height / 2 + spaceFromCenter
					angle = Math.PI / 2
					length = progress > 0 ? 12 : 35 // Specify the length for the south direction
					break
				case 'west-south':
					x = width / 2 + spaceFromCenterSubDirections
					y = height / 2 + spaceFromCenterSubDirections
					angle = Math.PI / 4
					length = progress > 0 ? 22 : 90 // Specify the length for the west-south direction
					break
				case 'east-south':
					x = width / 2 - spaceFromCenterSubDirections
					y = height / 2 + spaceFromCenterSubDirections
					angle = (3 * Math.PI) / 4
					length = progress > 0 ? 22 : 110 // Specify the length for the east-south direction
					break
				case 'west-north':
					x = width / 2 - spaceFromCenterSubDirections
					y = height / 2 - spaceFromCenterSubDirections
					angle = (-3 * Math.PI) / 4
					length = progress > 0 ? 22 : 100 // Specify the length for the west-north direction
					break
				case 'east-north':
					x = width / 2 + spaceFromCenterSubDirections
					y = height / 2 - spaceFromCenterSubDirections
					angle = -Math.PI / 4
					length = progress > 0 ? 22 : 120 // Specify the length for the east-north direction
					break

				case 'inner-east':
					x = width / 2 + innerSpaceFromCenter
					y = height / 2
					angle = 0
					length = progress > 0 ? 4 : 8 // Specify the length for the east direction

					break
				case 'inner-north':
					x = width / 2
					y = height / 2 - innerSpaceFromCenter
					angle = -Math.PI / 2
					length = progress > 0 ? 4 : 8 // Specify the length for the north direction

					break
				case 'inner-west':
					x = width / 2 - innerSpaceFromCenter
					y = height / 2
					angle = Math.PI
					length = progress > 0 ? 4 : 8 // Specify the length for the west direction

					break
				case 'inner-south':
					x = width / 2
					y = height / 2 + innerSpaceFromCenter
					angle = Math.PI / 2
					length = progress > 0 ? 4 : 8 // Specify the length for the south direction

					break
				case 'inner-west-south':
					x = width / 2 + innerSpaceFromCenterSubDirections
					y = height / 2 + innerSpaceFromCenterSubDirections
					angle = Math.PI / 4
					length = progress > 0 ? 4 : 8 // Specify the length for the west-south direction

					break
				case 'inner-east-south':
					x = width / 2 - innerSpaceFromCenterSubDirections
					y = height / 2 + innerSpaceFromCenterSubDirections
					angle = (3 * Math.PI) / 4
					length = progress > 0 ? 4 : 8 // Specify the length for the east-south direction

					break
				case 'inner-west-north':
					x = width / 2 - innerSpaceFromCenterSubDirections
					y = height / 2 - innerSpaceFromCenterSubDirections
					angle = (-3 * Math.PI) / 4
					length = progress > 0 ? 4 : 8 // Specify the length for the west-north direction

					break
				case 'inner-east-north':
					x = width / 2 + innerSpaceFromCenterSubDirections
					y = height / 2 - innerSpaceFromCenterSubDirections
					angle = -Math.PI / 4
					length = progress > 0 ? 4 : 8 // Specify the length for the east-north direction

					break
			}

			points.push([ ])

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
				.attr('stroke', color ? color : '#f0f0f0')
				.attr('stroke-width', 2)
		}

		const clearLightningPaths = () => {
			svg.selectAll('path').remove()
		}

		// Create lightning paths for each direction
		const createMultipleLightnings = () => {
			const directions = [
				{
					direction: 'inner-east',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-north',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-west',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-south',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-west-south',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-east-south',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-west-north',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{
					direction: 'inner-east-north',
					color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
				},
				{ direction: 'east', color: '#acd3fa' },
				{ direction: 'north', color: '#e0f0ff' },
				{ direction: 'west', color: '#acd3fa' },
				{ direction: 'south', color: '#e0f0ff' },
				{ direction: 'west-south', color: '#c5e0fa' },
				{ direction: 'east-south', color: '#c5e0fa' },
				{ direction: 'west-north', color: '#c5e0fa' },
				{ direction: 'east-north', color: '#c5e0fa' },
			]

			clearLightningPaths()
			directions.forEach((directionInfo, i) => {
				for (let j = 0; j < 3; j++) {
					setTimeout(
						() => createLightning(directionInfo.direction, directionInfo.color),
						i * 220 + j * 300
					)
				}
			})
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
					.attr('fill', progress > 0 ? 'white' : color)
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
				ry: progress > 0 ? 44 : 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 0, // Rotate the first oval by 45 degrees
				electronRadius: progress > 0 ? 3 : 5,
				electronSpacing: 20,
				electronCount: progress > 0 ? 55 : 44,
			},
			{
				rx: progress === 0 ? 240 : 144,
				ry: progress > 0 ? 44 : 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 135, // Rotate the second oval by 135 degrees
				electronRadius: progress > 0 ? 3 : 5,
				electronSpacing: 20,
				electronCount: 44,
			},
			{
				rx: progress === 0 ? 240 : 144,
				ry: progress > 0 ? 44 : 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 45, // Rotate the third oval by 90 degrees
				electronRadius: progress > 0 ? 3 : 5,
				electronSpacing: 20,
				electronCount: 44,
			},
			{
				rx: progress === 0 ? 240 : 144,
				ry: progress > 0 ? 44 : 66,
				cx: width / 2,
				cy: height / 2,
				color: progress === 0 ? '#ffffff' : '#28d7eb',
				strokeWidth: 2,
				rotate: 90, // Rotate the third oval by 90 degrees
				electronRadius: progress > 0 ? 3 : 5,
				electronSpacing: 20,
				electronCount: 44,
			},
			// Add more oval configurations here as needed
		]
		// Create the ovals based on the array of oval configurations
		const orbits = ovalConfigs.map((config) =>
			createElectron(svg, ...Object.values(config))
		)

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
		const atomCore = createAnimatedCircle(
			svg,
			width / 2,
			height / 2,
			progress > 0 ? width / 58 : width / 42,
			'#69f0d3',
			3,
			'/images/logo.jpg',
			700
		)
		atomCore.attr('cursor', 'pointer').on('click', () => {
			fileInputRef.current.click()
		})
	}, [hexagonColor, progress])

	/////////////////////////////end/of/hexagon/creating///////////////////////////////////////////

	const handleFileChanged = async (event) => {
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
						backgroundColor: progress === 0 ? 'rgba(0,0,0,0)' : 'none',
						width: progress === 0 ? '100%' : '100%',
						height: progress === 0 ? '100vh' : '50vh',
						marginLeft: progress === 0 ? '0' : '0%',
						marginTop: '-0.7vh',
						borderRadius: progress === 0 ? '0' : '0%',
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

export default ExcclReader
