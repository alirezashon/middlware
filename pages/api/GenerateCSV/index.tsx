 
import { NextApiHandler } from 'next'

const generateCSV = (data: any[]) => {
	const csvContent = []

	// Add the header row
	csvContent.push(Object.keys(data[0]))

	// Add the data rows
	for (const row of data) {
		csvContent.push(Object.values(row))
	}

	// Convert the CSV content to a string
	const csvString = csvContent.map((row) => row.join(',')).join('\n')

	// Return the CSV content
	return csvString
}

const handler: NextApiHandler = async (req, res) => {
	try {
		const { data } = req.body // Assuming the request body contains the 'data' array

		if (!data || !Array.isArray(data)) {
			return res.status(400).json({ error: 'Invalid data format' })
		}

		// Generate the CSV content
		const csvContent = generateCSV(data)

		// Set the response headers for downloading the CSV
		res.setHeader('Content-Disposition', 'attachment; filename=data.csv')
		res.setHeader('Content-Type', 'text/csv')
		res.status(200).send(csvContent)
	} catch (error) {
		console.error('Error generating CSV:', error)
		res.status(500).json({ error: 'Error generating CSV' })
	}
}

export default handler
