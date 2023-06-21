/** @format */

import { useEffect, useRef } from 'react'
import { createHexagonImage } from '../createHexagonImage'
import * as d3 from 'd3'

const HexagonDrag = () => {
	const svgRef = useRef(null)

	useEffect(() => {
		if (svgRef.current) {
			d3.select(svgRef.current).selectAll('*').remove()
		}
		const generateHiveCoordinates = (numHexagons, radius, centerX, centerY) => {
			const coordinates = []

			for (let i = 0; i < numHexagons; i++) {
				const angle = (2 * Math.PI * i) / numHexagons
				const x = centerX + radius * Math.cos(angle)
				const y = centerY + radius * Math.sin(angle)
				coordinates.push({ x, y })
			}

			return coordinates
		}

		const numHexagons = 6 // Number of hexagons in the hive
		const hiveRadius =
			0.15 * Math.min(svgRef.current.clientWidth, svgRef.current.clientHeight)
		const hiveCenterX = svgRef.current.clientWidth / 2
		const hiveCenterY = svgRef.current.clientHeight / 2

		const hiveCoordinates = generateHiveCoordinates(
			numHexagons,
			hiveRadius,
			hiveCenterX,
			hiveCenterY
		)

		const hexagonSize =
			0.088 * Math.min(svgRef.current.clientWidth, svgRef.current.clientHeight)
		const svg = d3.select(svgRef.current)

		hiveCoordinates.forEach(({ x, y }) => {
			const xPos = x - hexagonSize / 2
			const yPos = y - hexagonSize / 2

			const hexagonImage = createHexagonImage('/images/me.jpg', hexagonSize)
			d3.select(hexagonImage)
				.attr('x', xPos)
				.attr('y', yPos)
				.attr('cursor', 'grabbing')
				.call(
					d3.drag().on('drag', (event) => {
						const newX = event.x - hexagonSize / 2
						const newY = event.y - hexagonSize / 2
						d3.select(hexagonImage).attr('x', newX).attr('y', newY)
					})
				)
			svg.node().appendChild(hexagonImage)
		})
	}, [])

	return (
		<svg
			ref={svgRef}
			width='100%'
			height='100vh'
		/>
	)
}

export default HexagonDrag
