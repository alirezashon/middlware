
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { createHexagonImage } from '../createHexagonImage'

const Marquee = () => {
	const svgRef = useRef(null)
	useEffect(() => {
		const svg = d3.select(svgRef.current)
		if (svgRef.current) {
			d3.select(svgRef.current).selectAll('*').remove()
		}
		const hexSize = 50
		const hexMargin = 90
		const hexagons = ['/images/me.jpg', '/images/ali.jpg', '/images/akbari.jpg','/images/logo.jpg', '/images/me.jpg', '/images/ali.jpg','/images/akbari.jpg', '/images/logo.jpg', '/images/me.jpg']
		
		const hexGroup = svg
			.append('g')
			.attr('transform', `translate(${window.innerWidth}, 111)`)
		const createHexagon = (x,imageUrl, index) => {
			const hexagonImage = createHexagonImage(imageUrl, hexSize)
			const hexagon = hexGroup
				.append('g')
				.attr('transform', `translate(${x}, 0)`)
				.attr('cursor', 'pointer')
				.append(() => hexagonImage)

			hexagon.on('mouseover', () => {
				hexGroup.interrupt() // Pause the movement
			})

			hexagon.on('mouseleave', (e) => {
				const currentIndex = index
				const startPoint = e.clientX - (hexSize+hexMargin) * currentIndex
				moveHexagons(startPoint) // Resume the movement
			})
		}

		const createHexagons = () => {
			hexGroup.selectAll('g').remove() // Clear existing hexagons
			hexagons.map((hex,i) =>
				createHexagon((hexSize + hexMargin) * i, hex, i)
			)
		}

		const moveHexagons = (start) => {
			hexGroup
				.attr('transform', `translate(${start}, 111)`)
				.transition()
				.duration(10000)
				.ease(d3.easeLinear)
				.attr(
					'transform',
					`translate(${-hexGroup.node().getBBox().width - hexMargin}, 111)`
				)
				.on('end', () => {
					moveHexagons(window.innerWidth) // Restart the movement
				})
		}

		createHexagons()
		moveHexagons(window.innerWidth)
	}, [])

	return (
		<div>
			<svg
				ref={svgRef}
				width='100%'
				height='300'
			/>
		</div>
	)
}

export default Marquee
