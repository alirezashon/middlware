/** @format */
import { NextApiRequest, NextApiResponse } from 'next'

interface AssetData {
	AssetCode: string
	CategoryName: string
	Serial: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { serial } = req.body

	const response = await fetch('http://localhost:8080/api/viewAsset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ Serial: serial }),
	})

	const data = await response.json()
	const test = data.data
	const simplifiedResponse: AssetData[] = test.map((item: any) => ({
		AssetCode: item.AssetCode,
		CategoryName: item.CategoryName,
		Serial: item.Serial,
	}))

	res.status(200).json(data.data)
}
