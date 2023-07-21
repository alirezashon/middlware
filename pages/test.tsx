 
import React from 'react'

const CsvGenerator: React.FC = () => {
	const dataArray = [
		['id','name','age','azina',22,33,44],[1,'ali',22],[2,'mohammad',33]
	// 	{ id: 1, name: 'John', age: 30 },
	// 	{ id: 2, rame: 'Jane', gage: 25 },
    // { id: 3, lame: 'Mike', tage: 40 },
    // { id: 1, same: 'Johni', fage: 350 },
	// 	{ id: 2, jame: 'Janes', rage: 285 },
	// 	{ id: 3, kame: 'Mikel', mage: 470 },
		// Add more data as needed
	]

	const handleGenerateCSV = async () => {
		try {
			// Send the 'dataArray' to the API endpoint
			const response = await fetch('/api/GenerateCSV', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: dataArray }),
			})

			// Trigger the download
			const csvContent = await response.text()
			const blob = new Blob([csvContent], { type: 'text/csv' })
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = 'data.csv'
			link.click()
			URL.revokeObjectURL(url)
		} catch (error) {
			console.error('Error generating CSV:', error)
		}
	}

	return (
		<div>
			<button onClick={handleGenerateCSV}>Generate CSV</button>
		</div>
	)
}

export default CsvGenerator
