/** @format */

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const serial = req.body.serial
	const response = await fetch('http://localhost:8080/api/viewAsset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ Serial: serial }),
	})


	const data = await response.json()
	
	res.status(200).json(data.data)
	
}
