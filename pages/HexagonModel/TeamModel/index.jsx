import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { createHexagonImage } from '../createHexagonImage'

const TeamModel = () => {
	const svgRef = useRef(null)

	useEffect(() => {
		if (svgRef.current) {
			d3.select(svgRef.current).selectAll('*').remove()
		}
		const imageSources = [
			'/images/ali.jpg',
			'/images/ali.jpg',
			'/images/logo.jpg',
			'/images/logo.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/me.jpg',
			'/images/me.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/me.jpg',
			'/images/me.jpg',
			'/images/ali.jpg',
			'/images/ali.jpg',
			'/images/logo.jpg',
			'/images/logo.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/me.jpg',
			'/images/me.jpg',
			'/images/akbari.jpg',
			'/images/ali.jpg',
			'/images/me.jpg',
			'/images/me.jpg',
		]
		const svg = d3.select(svgRef.current)
		const { width, height } = svg.node().getBoundingClientRect()
		const centerX = width / 2
		const centerY = height / 2
		const hexagonSize = Math.min(width, height) * 0.055
		const spaceBetweenHexagons = hexagonSize * 0.5
		const leftGroupX = width * 0.01
		const rightGroupX = width * 0.93
		const topRow = height * 0.01
		const downRow = height * 0.8

		// count of hexagon are specified here

		const topLeftGroupImages = []
		const topRightGroupImages = []
		const bottomLeftGroupImages = []
		const bottomRightGroupImages = []

		imageSources.forEach((source, index) => {
			if (index % 4 === 0) {
				topLeftGroupImages.push(source)
			} else if (index % 4 === 1) {
				topRightGroupImages.push(source)
			} else if (index % 4 === 2) {
				bottomLeftGroupImages.push(source)
			} else {
				bottomRightGroupImages.push(source)
			}
		})

		const createGroup = (images, row, groupX, isRightGroup, isBottomGroup) => {
			const group = svg
				.append('g')
				.attr('transform', `translate(${groupX}, ${row})`)

			images.forEach((url, index) => {
				const hexagonImage = createHexagonImage(url, hexagonSize)
				const xPosition =
					groupX < width / 2
						? index * (hexagonSize + 3 * spaceBetweenHexagons)
						: -index * (hexagonSize + 3 * spaceBetweenHexagons)

				const lineStartPointX = isBottomGroup
					? xPosition + hexagonSize
					: xPosition + hexagonSize
				const lineStartPointY = isBottomGroup
					? hexagonSize / 6
					: hexagonSize * 2.09
				const lineEndPointX = isRightGroup
					? centerX - groupX - hexagonSize / 4
					: centerX
				const lineEndPointY = isBottomGroup ? centerY - downRow * 0.98 : centerY
				const CPX = isBottomGroup ? -centerY + hexagonSize * 2.5 : centerY
				const curvePath = d3.path()
				curvePath.moveTo(lineStartPointX, lineStartPointY)
				curvePath.quadraticCurveTo(xPosition, CPX, lineEndPointX, lineEndPointY)

				const curve = svg
					.append('g')
					.append('path')
					.attr('d', curvePath.toString())
					.attr('stroke', '#a5cd39')
					.attr('stroke-opacity', 0.9)
					.attr('fill', 'none')
					.attr('transform', `translate(${groupX}, ${row})`)

				// hexagons
				const hexagon = svg
					.append(() => hexagonImage)
					.attr('x', xPosition)
					.attr('y', 0)
					.attr('cursor', 'grabbing')
					.call(
						d3
							.drag()
							.on('drag', (event) => {
								const newX = event.x - hexagonSize / 2
								const newY = event.y - hexagonSize / 2
								d3.select(hexagonImage).attr('x', newX).attr('y', newY)

								// Update the curve start and end points during dragging
								const updatedCurvePath = d3.path()
								updatedCurvePath.moveTo(
									newX + hexagonSize,
									newY + hexagonSize / 6
								)
								updatedCurvePath.quadraticCurveTo(
									xPosition,
									CPX,
									lineEndPointX,
									lineEndPointY
								)
								curve.attr('d', updatedCurvePath.toString())
							})
							.on('end', (event) => {
								// Pass the event object as a parameter
								const initialX = xPosition // Initial x-coordinate of the shape
								const initialY = 0 // Initial y-coordinate of the shape

								// Calculate the distance between the initial and new coordinates
								const distance = Math.sqrt(
									Math.pow(event.x - initialX, 2) +
										Math.pow(event.y - initialY, 2)
								)

								const animationDuration = 500 // Duration of each animation cycle in milliseconds
								const numSteps = 7 // Total number of steps for the animation

								// Calculate the distance for each step
								const stepDistance = distance / numSteps

								// Function to animate the shape and curve
								const animate = (currentStep) => {
									if (currentStep <= numSteps) {
										let newX, newY
										if (currentStep % 2 === 0) {
											// Move from dropped point to the first point
											const stepMultiplier = currentStep / numSteps
											newX = event.x - (event.x - initialX) * stepMultiplier
											newY = event.y - (event.y - initialY) * stepMultiplier
										} else {
											newX = initialX
											newY = initialY
										}

										// Animate the shape and curve simultaneously
										d3.select(hexagonImage)
											.transition()
											.duration(animationDuration)
											.attr('x', newX)
											.attr('y', newY)
										const updatedCurvePath = d3.path()
										updatedCurvePath.moveTo(
											newX + hexagonSize,
											newY + hexagonSize / 6
										)
										updatedCurvePath.quadraticCurveTo(
											xPosition,
											CPX,
											lineEndPointX,
											lineEndPointY
										)
										curve
											.transition()
											.duration(animationDuration)
											.attr('d', updatedCurvePath.toString())
											.on('end', () => {
												// Recursively call the animate function for the next step
												animate(currentStep + 1)
											})
									} else {
										// Reset the shape and curve to their initial positions
										d3.select(hexagonImage).attr('x', xPosition).attr('y', 0)
										curve.attr('d', curvePath.toString())
									}
								}

								// Start the animation
								animate(1)
							})
					)

				group.append(() => hexagonImage)
			})

			return group
		}

		createGroup(topLeftGroupImages, topRow, leftGroupX, false, false)
		createGroup(topRightGroupImages, topRow, rightGroupX, true, false)
		createGroup(bottomLeftGroupImages, downRow, leftGroupX, false, true)
		createGroup(bottomRightGroupImages, downRow, rightGroupX, true, true)
		svg
			.append(() => createHexagonImage('/images/ali.jpg', hexagonSize * 1.1))
			.attr('x', centerX - hexagonSize * 1.1)
			.attr('y', centerY - hexagonSize * 1.1)
			.attr('cursor', 'grabbing')
	}, [])

	return (
		<svg
			ref={svgRef}
			width='100%'
			height='100vh'
		/>
	)
}

export default TeamModel