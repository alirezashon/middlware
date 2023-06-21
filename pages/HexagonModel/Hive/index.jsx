/** @format */

import { useEffect, useRef } from 'react'
import { createHexagonImage } from '../createHexagonImage'
import * as d3 from 'd3'

const Hive = () => {
	const svgRef = useRef(null)
	
	useEffect(() => {
		
			if (svgRef.current) {
				d3.select(svgRef.current).selectAll('*').remove()
			}
		const images = [
			{ url: '/images/me.jpg', x: 0.25, y: 0.1 },
			{ url: '/images/me.jpg', x: 0.3, y: 0.16 },
			{ url: '/images/me.jpg', x: 0.35, y: 0.1 },
			{ url: '/images/me.jpg', x: 0.25, y: 0.22 },
			{ url: '/images/me.jpg', x: 0.3, y: 0.278 },
			{ url: '/images/me.jpg', x: 0.351, y: 0.219 },
			{ url: '/images/me.jpg', x: 0.4, y: 0.16 },
			{ url: '/images/me.jpg', x: 0.45, y: 0.22 },
			{ url: '/images/me.jpg', x: 0.5, y: 0.17 },
			{ url: '/images/me.jpg', x: 0.55, y: 0.228 },
			{ url: '/images/me.jpg', x: 0.499, y: 0.288 },
			{ url: '/images/me.jpg', x: 0.6, y: 0.278 },
			{ url: '/images/me.jpg', x: 0.598, y: 0.16 },
			{ url: '/images/me.jpg', x: 0.65, y: 0.215 },
			{ url: '/images/me.jpg', x: 0.3, y: 0.397 },
			{ url: '/images/me.jpg', x: 0.65, y: 0.33 },
			{ url: '/images/me.jpg', x: 0.25, y: 0.455 },
			{ url: '/images/me.jpg', x: 0.3, y: 0.515 },
			{ url: '/images/me.jpg', x: 0.35, y: 0.337 },
			{ url: '/images/me.jpg', x: 0.4, y: 0.28 },
			{ url: '/images/me.jpg', x: 0.449, y: 0.34 },
			{ url: '/images/me.jpg', x: 0.399, y: 0.399 },
			{ url: '/images/me.jpg', x: 0.35, y: 0.455 },
			{ url: '/images/me.jpg', x: 0.551, y: 0.347 },
			{ url: '/images/me.jpg', x: 0.603, y: 0.397 },
			{ url: '/images/me.jpg', x: 0.499, y: 0.405 },
			{ url: '/images/me.jpg', x: 0.45, y: 0.46 },
			{ url: '/images/me.jpg', x: 0.5, y: 0.525 },
			{ url: '/images/me.jpg', x: 0.553, y: 0.467 },
			{ url: '/images/me.jpg', x: 0.655, y: 0.45 },
			{ url: '/images/me.jpg', x: 0.606, y: 0.515 },
			{ url: '/images/me.jpg', x: 0.4, y: 0.518 },
			{ url: '/images/me.jpg', x: 0.35, y: 0.574 },
			{ url: '/images/me.jpg', x: 0.449, y: 0.58 },
			{ url: '/images/me.jpg', x: 0.399, y: 0.637 },
			{ url: '/images/me.jpg', x: 0.349, y: 0.69 },
			{ url: '/images/me.jpg', x: 0.3, y: 0.63 },
			{ url: '/images/me.jpg', x: 0.5, y: 0.64 },
		]

		const hexagonSize =
			0.06 * Math.min(svgRef.current.clientWidth, svgRef.current.clientHeight)
		const svg = d3.select(svgRef.current)
		const { width, height } = svg.node().getBoundingClientRect()

		images.forEach(({ url, x, y }) => {
			// Calculate the actual position based on SVG size
			const xPos = x * width
			const yPos = y * height

			// Generate the hexagon image
			const hexagonImage = createHexagonImage(url, hexagonSize)

			// Set the position of the hexagon image
			d3.select(hexagonImage)
				.attr('x', xPos - hexagonSize / 2)
				.attr('y', yPos - hexagonSize / 2)
				.attr('cursor', 'grab')
				.call(
					d3.drag().on('drag', (event) => {
						const newX = event.x - hexagonSize / 2
						const newY = event.y - hexagonSize / 2
						d3.select(hexagonImage).attr('x', newX).attr('y', newY)
					})
				)

			// Append the hexagon image to the SVG
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

export default Hive
