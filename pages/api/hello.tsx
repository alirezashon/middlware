/** @format */

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//const accessories = "MMD"
	//const agentID = "10000000"

	const response = await fetch(
		'http://localhost:8080/api/viewAsset' ,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ accessories : "POE", agentID:"13007955" })

		}
	)


	const data = await response.json()

	res.status(200).json(data)
}

