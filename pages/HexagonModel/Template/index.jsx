/** @format */

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { createHexagonImage } from '../createHexagonImage'
import Marquee from '../Marquee'
const HexagonMarquee = () => {
	const svgRef = useRef(null)
	useEffect(() => {
		const svg = d3.select(svgRef.current)
		const { width, height } = svg.node().getBoundingClientRect()
		const hexagonSize = Math.min(width, height) * 0.055
		if (svgRef.current) {
			d3.select(svgRef.current).selectAll('*').remove()
		}
		const hexColorsRight = [
			'#5C6BC0',
			'#BA68C8',
			'#26C6DA',
			'#FF6B6B',
			'#F9A825',
			'#9CCC65',
		]
		const hexColorsLeft = [
			'#42A5F5',
			'#AB47BC',
			'#00BCD4',
			'#FF4081',
			'#FFD740',
			'#81C784',
		]
		const hexSize = Math.min(width, height) * 0.05 // Responsive hexagon size
		const hexMargin = hexSize * 1.8 // Responsive hexagon margin
		const hexagons = [
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/me.jpg',
			'/images/me.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/me.jpg',
			'/images/me.jpg',
		] // Array of hexagons
		const centerX = width / 2
		const centerY = height / 2

		const leftHexGroup = svg
			.append('g')
			.attr('transform', `translate(0, ${height * 0.1})`)
		const rightHexGroup = svg
			.append('g')
			.attr('transform', `translate(0, ${height * 0.1})`)
		const images = [
			{ url: '/images/akbari.jpg', x: width / 2, y: height / 9, size: 0.077 },
		]

		const linePath = d3.path()
		linePath.moveTo(width / 2, height / 9)
		linePath.lineTo(centerX, centerY / 1.03)

		const line = svg
			.append('path')
			.attr('d', linePath.toString())
			.attr('stroke', '#fff')
			.attr('stroke-width', 2)

		images.forEach(({ url, x, y, size }) => {
			const hexagonSize = Math.min(width, height) * size // Adjust the size as needed
			// Generate the hexagon image
			const hexagonImage = createHexagonImage(url, hexagonSize)

			// Set the position of the hexagon image
			d3.select(hexagonImage)
				.attr('x', x - hexagonSize * 1.1)
				.attr('y', y - hexagonSize)
			svg.node().appendChild(hexagonImage)
		})

		const createHexagon = (group, x, y, color, url) => {
			const angle = (Math.PI * 2) / 6
			const radius = hexSize / Math.sin(angle)
			const hexagonImage = createHexagonImage(url, hexagonSize)
			svg
				.append(() => hexagonImage)
				.attr('x', x - hexSize)
				.attr('y', y - hexSize)
				.attr('cursor', 'grabbing')
				.call(
					d3
						.drag()
						.on('drag', (event) => {
							const newX = event.x - hexagonSize / 2
							const newY = event.y - hexagonSize / 2
							d3.select(hexagonImage).attr('x', newX).attr('y', newY)
						})
						.on('end', () => {
							d3.select(hexagonImage).attr('x', xPosition).attr('y', 0)
						})
				)
			group.append(() => hexagonImage)

			const linePath = d3.path()
			linePath.moveTo(
				x + hexagonSize/2,
				y+ hexagonSize
			)
			linePath.lineTo(centerX, centerY / 1.3)

			const line = group
				.append('path')
				.attr('d', linePath.toString())
				.attr('stroke', '#ffffff')
				.attr('fill', 'none')

			const lineLength = line.node().getTotalLength()
			const littleLineLength = lineLength * 0.1 // Adjust the length of the little line

			const movingLineData = [
				{
					x: x + radius * Math.cos(angle * 0.9),
					y: y + radius * Math.sin(angle),
				}, // Start the little line from the first point of the line
				{ x: centerX, y: centerY / 1.3 }, // End the little line at the desired endpoint
			]

			const lineGenerator = d3
				.line()
				.x((d) => d.x)
				.y((d) => d.y)
			const movingLine = group
				.append('path')
				.datum(movingLineData)
				.attr('d', lineGenerator)
				.attr('stroke', color)
				.attr('stroke-width', 2)
				.attr('fill', 'none')
				.attr(
					'stroke-dasharray',
					littleLineLength + ',' + (lineLength - littleLineLength)
				)
				.attr('stroke-dashoffset', -lineLength)

			const speed = 3000 // Adjust the speed of the little line movement (in milliseconds)

			const animateLine = () => {
				movingLine
					.attr('stroke-dashoffset', lineLength) // Set the initial dash offset to the total length of the line
					.transition()
					.duration(speed)
					.ease(d3.easeLinear)
					.attr('stroke-dashoffset', 0) // Animate the dash offset to 0 (starting from the end of the line)
					.on('end', animateLine)
			}
			animateLine()
		}
		const createCurve = () => {
			const curvePath = d3.path()
			curvePath.moveTo(20, centerY * 1.3)
			curvePath.quadraticCurveTo(
				centerX,
				centerY / 1.57,
				width - 20,
				centerY * 1.3
			)

			svg
				.append('path')
				.attr('d', curvePath.toString())
				.attr('stroke', '#499b01')
				.attr('stroke-opacity', 0.6)
				.attr('fill', 'none')
				.style('box-shadow', '5px 5px  5px 5px red')
		}

		const createHexagons = () => {
			const leftHexagons = hexagons.slice(0, Math.ceil(hexagons.length / 2))
			const rightHexagons = hexagons.slice(Math.ceil(hexagons.length / 2))

			const totalWidth = (hexSize + hexMargin) * hexagons.length
			const leftStartX = centerX - totalWidth / 1.5
			const rightStartX = centerX + totalWidth / 4

			leftHexagons.forEach((hexagon, index) => {
				const color = hexColorsLeft[index % hexColorsLeft.length]
				const x = leftStartX + (hexSize + hexMargin) * index
				createHexagon(leftHexGroup, x, 0, color, hexagon)
			})

			rightHexagons.forEach((hexagon, index) => {
				const color = hexColorsRight[index % hexColorsRight.length]
				const x = rightStartX + (hexSize + hexMargin) * index
				createHexagon(rightHexGroup, x, 0, color, hexagon)
			})
		}

		createHexagons()
		createCurve()
	}, [])

	return (
		<div style={{ position: 'relative' }}>
			<svg
				ref={svgRef}
				width='100%'
				height='100vh'
				style={{
					background:
						'radial-gradient(circle at 0% 50%, #cdeb97 16.67%, #ddf1c8 33.33%, #dae7b9 50%, #e5f3a7 66.67%, #d8e7c0 83.33%, #d7e9a8 100%, #d9ebbd)',
					borderRadius: '5%',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: '100%',
					transform: 'translate(0%, -222%)',
				}}>
				<Marquee />
			</div>
		</div>
	)
}

export default HexagonMarquee
