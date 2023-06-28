import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //  const { assetCode, status } = req.body;

    const requestBody = {
      userId: '3198',
      assetcode: 'AST2023340607',
      status:'Mobinnet---Intact_Second-hand',
      location: "Warehouse > Modem's Store (M003)",
      allottedto: 'customer@test.ir',
      isCustomUpdate: true,
      remark: 'remark',
    };

  try {
    const apiURL = 'http://localhost:8080/api/updateAsset'
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
