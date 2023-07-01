/** @format */

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { assetCode, status } = req.body
	const requestBody = {
		userId: '3198',
		assetcode: assetCode,
		status: status,
		location: " ",
		customerDetails: '',
		childAssetcode: '',
		customerName: '',
		agentCode: 12345678,
		isRemoveLink: 0,
		allottedto: '3107',
		settlementType: '',
	}

	// 1
	// const data = {
	// 	assetcodes: ['AST2022306419', 'AST2022306547'],
	// 	status: 'Mobinnet---Intact_second-hand',
	// }
	// const requestBody = {
	// 	userId: '3198',
	// 	assetcode: assetCode,
	// 	status: status,
	// 	location: "Warehouse > Modem's Store (M003)",
	// 	customerDetails: '',
	// 	childAssetcode: '',
	// 	customerName: '',
	// 	agentCode: 12345678,
	// 	isRemoveLink: 0,
	// 	allottedto: '3107',
	// 	settlementType: '',
	// }

	// 2
	// const data = {
	// 	assetcodes: ['AST2022306419', 'AST2022306547'],
	// 	status: 'Mobinnet---Intact_second-hand',
	// }
	// const requestBody = {
	// 	userId: '3198',
	// 	assetcode: assetCode,
	// 	status: status,
	// 	location: "Warehouse > Modem's Store (M003)",
	// 	customerDetails: '',
	// 	childAssetcode: '',
	// 	customerName: '',
	// 	agentCode: 12345678,
	// 	isRemoveLink: 1,
	// 	allottedto: '3107',
	// 	settlementType: '',
	// }
	try {
		const apiURL = 'http://localhost:8080/api/AssetInstallation'
		const response = await fetch(apiURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		})

		if (!response.ok) {
			throw new Error('Request failed')
		}

		const responseData = await response.json()

		// Handle the response data as needed
		console.log(responseData)

		res.status(200).json({ success: true })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Internal Server Error' })
	}
}
