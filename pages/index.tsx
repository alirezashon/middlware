import { useState } from 'react'

const Page = () => {
  const [data, setData] = useState([
    { name: 'John Doe', age: 30, email: 'john.doe@example.com',memail:"onjash" },
    { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com',memail:"onjash" },
    { name: 'Bob Johnson', age: 35, email: 'bob.johnson@example.com',memail:"onjash" },
    { name: 'Bob Johnson', age: 35, email: 'bob.johnson@example.com',memail:"onjash" },
  ])

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/GenerateExcel?data=${JSON.stringify(data)}`)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'generated_file.xlsx'
      link.click()

      // Clean up the temporary link
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  )
}

export default Page
