import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestBody = {
    userId: "3198",
    assetList: [{
            "assetcode": 'AST2023336056',
            "linkassetcode": 'AST2022306533'
    }]
  }

  try {
    const apiURL = 'http://localhost:8080/api/linkAsset'
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
