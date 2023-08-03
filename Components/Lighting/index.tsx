/** @format */

// /** @format */

// // LightningElectronSVG.js

// import * as d3 from 'd3'

// export const LightningElectronSVG = (svg, progress, width, height) => {
// 	const randomBetween = (min, max) => Math.random() * (max - min) + min

// 	if (progress > 0) {
// 		d3.select(svg.current).selectAll('*').remove()
// 	}
// 	const createLightning = (direction, color) => {
// 		const points = []

// 		// Define the space from the center for any direction
// 		const spaceFromCenter =
// 			progress > 0
// 				? 0.34 * Math.min(width, height)
// 				: 0.286 * Math.min(width, height)
// 		const spaceFromCenterSubDirections =
// 			progress > 0
// 				? 0.244 * Math.min(width, height)
// 				: 0.204 * Math.min(width, height)
// 		const innerSpaceFromCenter =
// 			progress > 0
// 				? 0.066 * Math.min(width, height)
// 				: 0.047 * Math.min(width, height)
// 		const innerSpaceFromCenterSubDirections =
// 			progress > 0
// 				? 0.05 * Math.min(width, height)
// 				: 0.033 * Math.min(width, height)

// 		// Define the x and y coordinates for the starting point and the angle based on the direction
// 		let x, y, angle, length
// 		const rx = progress === 0 ? width * 0.14 : width * 0.083
// 		const ry = progress > 0 ? width * 0.022 : width * 0.037

// 		const cx = width / 2
// 		const cy = height / 2

// 		const x1 = cx + rx
// 		const y1 = cy
// 		const x2 = cx - rx
// 		const y2 = cy

// 		const rotate = [0,135,45,]
// 		switch (direction) {
// 			case 'east':
// 				x = width / 2 + spaceFromCenter
// 				y = height / 2
// 				angle = 0
// 				length = progress > 0 ? 77 : 130 // Specify the length for the east direction
// 				break
// 			case 'north':
// 				x = width / 2
// 				y = height / 2 - spaceFromCenter
// 				angle = -Math.PI / 2
// 				length = progress > 0 ? 14 : 38 // Specify the length for the north direction
// 				break
// 			case 'west':
// 				x = width / 2 - spaceFromCenter
// 				y = height / 2
// 				angle = Math.PI
// 				length = progress > 0 ? 77 : 130 // Specify the length for the west direction
// 				break
// 			case 'south':
// 				x = width / 2
// 				y = height / 2 + spaceFromCenter
// 				angle = Math.PI / 2
// 				length = progress > 0 ? 12 : 35 // Specify the length for the south direction
// 				break
// 			case 'west-south':
// 				x = width / 2 + spaceFromCenterSubDirections
// 				y = height / 2 + spaceFromCenterSubDirections
// 				angle = Math.PI / 4
// 				length = progress > 0 ? 22 : 90 // Specify the length for the west-south direction
// 				break
// 			case 'east-south':
// 				x = width / 2 - spaceFromCenterSubDirections
// 				y = height / 2 + spaceFromCenterSubDirections
// 				angle = (3 * Math.PI) / 4
// 				length = progress > 0 ? 22 : 110 // Specify the length for the east-south direction
// 				break
// 			case 'west-north':
// 				x = width / 2 - spaceFromCenterSubDirections
// 				y = height / 2 - spaceFromCenterSubDirections
// 				angle = (-3 * Math.PI) / 4
// 				length = progress > 0 ? 22 : 100 // Specify the length for the west-north direction
// 				break
// 			case 'east-north':
// 				x = width / 2 + spaceFromCenterSubDirections
// 				y = height / 2 - spaceFromCenterSubDirections
// 				angle = -Math.PI / 4
// 				length = progress > 0 ? 22 : 120 // Specify the length for the east-north direction
// 				break

// 			case 'inner-east':
// 				x = width / 2 + innerSpaceFromCenter
// 				y = height / 2
// 				angle = 0
// 				length = progress > 0 ? 3 : 8 // Specify the length for the east direction

// 				break
// 			case 'inner-north':
// 				x = width / 2
// 				y = height / 2 - innerSpaceFromCenter
// 				angle = -Math.PI / 2
// 				length = progress > 0 ? 3 : 8 // Specify the length for the north direction

// 				break
// 			case 'inner-west':
// 				x = width / 2 - innerSpaceFromCenter
// 				y = height / 2
// 				angle = Math.PI
// 				length = progress > 0 ? 3 : 8 // Specify the length for the west direction

// 				break
// 			case 'inner-south':
// 				x = width / 2
// 				y = height / 2 + innerSpaceFromCenter
// 				angle = Math.PI / 2
// 				length = progress > 0 ? 3 : 8 // Specify the length for the south direction

// 				break
// 			case 'inner-west-south':
// 				x = width / 2 + innerSpaceFromCenterSubDirections
// 				y = height / 2 + innerSpaceFromCenterSubDirections
// 				angle = Math.PI / 4
// 				length = progress > 0 ? 3 : 8 // Specify the length for the west-south direction

// 				break
// 			case 'inner-east-south':
// 				x = width / 2 - innerSpaceFromCenterSubDirections
// 				y = height / 2 + innerSpaceFromCenterSubDirections
// 				angle = (3 * Math.PI) / 4
// 				length = progress > 0 ? 3 : 8 // Specify the length for the east-south direction

// 				break
// 			case 'inner-west-north':
// 				x = width / 2 - innerSpaceFromCenterSubDirections
// 				y = height / 2 - innerSpaceFromCenterSubDirections
// 				angle = (-3 * Math.PI) / 4
// 				length = progress > 0 ? 3 : 8 // Specify the length for the west-north direction

// 				break
// 			case 'inner-east-north':
// 				x = width / 2 + innerSpaceFromCenterSubDirections
// 				y = height / 2 - innerSpaceFromCenterSubDirections
// 				angle = -Math.PI / 4
// 				length = progress > 0 ? 3 : 8 // Specify the length for the east-north direction

// 				break
// 		}

// 		points.push([x, y])

// 		// Generate the lightning path with multiple segments
// 		for (let i = 0; i < 7; i++) {
// 			x += length * 0.77 * Math.cos(angle)
// 			y += length * 0.77 * Math.sin(angle)
// 			points.push([x, y])
// 			angle += randomBetween(-Math.PI / 4, Math.PI / 4)
// 		}

// 		// Draw the lightning path
// 		const lineGenerator = d3.line()
// 		svg
// 			.append('path')
// 			.datum(points)
// 			.attr('d', lineGenerator)
// 			.attr('fill', 'none')
// 			.attr('stroke', color ? color : '#f0f0f0')
// 			.attr('stroke-width', 1)
// 	}

// 	const clearLightningPaths = () => {
// 		svg.selectAll('path').remove()
// 	}

// 	// Create lightning paths for each direction
// 	const createMultipleLightnings = () => {
// 		const directions = [
// 			{
// 				direction: 'inner-east',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-north',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-west',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-south',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-west-south',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-east-south',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-west-north',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{
// 				direction: 'inner-east-north',
// 				color: progress > 0 ? '#c5e0fa' : '#f0f0f0',
// 			},
// 			{ direction: 'east', color: '#acd3fa' },
// 			{ direction: 'north', color: '#e0f0ff' },
// 			{ direction: 'west', color: '#acd3fa' },
// 			{ direction: 'south', color: '#e0f0ff' },
// 			{ direction: 'west-south', color: '#c5e0fa' },
// 			{ direction: 'east-south', color: '#c5e0fa' },
// 			{ direction: 'west-north', color: '#c5e0fa' },
// 			{ direction: 'east-north', color: '#c5e0fa' },
// 		]

// 		clearLightningPaths()
// 		directions.forEach((directionInfo, i) => {
// 			for (let j = 0; j < 3; j++) {
// 				setTimeout(
// 					() => createLightning(directionInfo.direction, directionInfo.color),
// 					i * 220 + j * 300
// 				)
// 			}
// 		})
// 		setTimeout(createMultipleLightnings, directions.length * 220 + 3 * 300)
// 	}

// 	createMultipleLightnings()
// }

/** @format */

// LightningElectronSVG.js

import * as d3 from 'd3'

export const LightningElectronSVG = (svg, progress, width, height) => {
	const randomBetween = (min, max) => Math.random() * (max - min) + min

	if (progress > 0) {
		d3.select(svg.current).selectAll('*').remove()
	}
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
		const rx = progress === 0 ? width * 0.14 : width * 0.083

		const cx = width / 2
		const cy = height / 2

		switch (direction) {
			case 'east':
				x = cx + rx
				y = cy
				angle = 0
				length = progress > 0 ? 77 : 130 // Specify the length for the east direction
				break
			case 'north':
				x = cx
				y = cy - rx
				angle = -Math.PI / 2
				length = progress > 0 ? 14 : 38 // Specify the length for the north direction
				break
			case 'west':
				x = cx - rx
				y = cy
				angle = Math.PI
				length = progress > 0 ? 77 : 130 // Specify the length for the west direction
				break
			case 'south':
				x = cx
				y = cy + rx
				angle = Math.PI / 2
				length = progress > 0 ? 12 : 35 // Specify the length for the south direction
				break
			case 'west-south':
				x = cx + rx / 1.4
				y = cy + rx / 1.4
				angle = Math.PI / 4
				length = progress > 0 ? 22 : 90 // Specify the length for the west-south direction
				break
			case 'east-south':
				x = cx - rx / 1.4
				y = cy + rx / 1.4
				angle = (3 * Math.PI) / 4
				length = progress > 0 ? 22 : 110 // Specify the length for the east-south direction
				break
			case 'west-north':
				x = cx - rx / 1.4
				y = cy - rx / 1.4
				angle = (-3 * Math.PI) / 4
				length = progress > 0 ? 22 : 100 // Specify the length for the west-north direction
				break
			case 'east-north':
				x = cx + rx / 1.4
				y = cy - rx / 1.4
				angle = -Math.PI / 4
				length = progress > 0 ? 22 : 120 // Specify the length for the east-north direction
				break

			case 'inner-east':
				x = width / 2 + innerSpaceFromCenter
				y = height / 2
				angle = 0
				length = progress > 0 ? 2 : 5 // Specify the length for the east direction

				break
			case 'inner-north':
				x = width / 2
				y = height / 2 - innerSpaceFromCenter
				angle = -Math.PI / 2
				length = progress > 0 ? 2 : 5 // Specify the length for the north direction

				break
			case 'inner-west':
				x = width / 2 - innerSpaceFromCenter
				y = height / 2
				angle = Math.PI
				length = progress > 0 ? 2 : 5 // Specify the length for the west direction

				break
			case 'inner-south':
				x = width / 2
				y = height / 2 + innerSpaceFromCenter
				angle = Math.PI / 2
				length = progress > 0 ? 2 : 5 // Specify the length for the south direction

				break
			case 'inner-west-south':
				x = width / 2 + innerSpaceFromCenterSubDirections
				y = height / 2 + innerSpaceFromCenterSubDirections
				angle = Math.PI / 4
				length = progress > 0 ? 2 : 5 // Specify the length for the west-south direction

				break
			case 'inner-east-south':
				x = width / 2 - innerSpaceFromCenterSubDirections
				y = height / 2 + innerSpaceFromCenterSubDirections
				angle = (3 * Math.PI) / 4
				length = progress > 0 ? 2 : 5 // Specify the length for the east-south direction

				break
			case 'inner-west-north':
				x = width / 2 - innerSpaceFromCenterSubDirections
				y = height / 2 - innerSpaceFromCenterSubDirections
				angle = (-3 * Math.PI) / 4
				length = progress > 0 ? 2 : 5 // Specify the length for the west-north direction

				break
			case 'inner-east-north':
				x = width / 2 + innerSpaceFromCenterSubDirections
				y = height / 2 - innerSpaceFromCenterSubDirections
				angle = -Math.PI / 4
				length = progress > 0 ? 2 : 5 // Specify the length for the east-north direction

				break
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
			.attr('stroke', color ? color : '#f0f0f0')
			.attr('stroke-width', 1)
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
}
