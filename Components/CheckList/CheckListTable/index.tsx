/** @format */

import React, { useContext, useEffect } from 'react'
import { CheckedItemsContext } from '../../../Contexts/CheckedItemsContext'
import { ShowDiagramContext } from '../../../Contexts/DiagramContext'
interface DataItem {
	serial: string
	// Add other properties here
}

const CheckListTable: React.FC<{ data: DataItem[] }> = ({ data }) => {
	const { checkedItems, setCheckedItems } = useContext(CheckedItemsContext)
	const { showDiagram, setShowDiagram } = useContext(ShowDiagramContext)

	useEffect(() => {
		// Save checkedItems to local storage whenever it changes
		localStorage.setItem('checkedItems', JSON.stringify(checkedItems))
	}, [checkedItems])

	useEffect(() => {
		// Load checkedItems from local storage on component mount
		const storedItems = localStorage.getItem('checkedItems')
		if (storedItems) {
			setCheckedItems(JSON.parse(storedItems))
		}
	}, [])

	const handleCloseClick = () => {
		setShowDiagram(false)
	}

	const handleCheckboxChange = (serial: string) => {
		const isChecked = checkedItems.some((item) => item.serial === serial)

		if (isChecked) {
			setCheckedItems(checkedItems.filter((item) => item.serial !== serial))
		} else {
			const itemToAdd = data.find((item) => item.serial === serial)
			if (itemToAdd) {
				setCheckedItems([...checkedItems, itemToAdd])
			}
		}
	}

	const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked

		if (isChecked) {
			setCheckedItems(data)
		} else {
			setCheckedItems([])
		}
	}

	const handleUpdateSubmit = () => {
		// Perform your update logic here using the checkedItems state
		console.log('Updating Items:', checkedItems)
		setCheckedItems([])
		handleCloseClick()
	}

	return (
		<div>
			{showDiagram && (
				<div className='diagram-box'>
					<div className='scrollable-container'>
						<div className='buttons-box'>
							<button
								className='update-button'
								onClick={handleCloseClick}>
								Close
							</button>
							<button
								className='update-button'
								style={{ backgroundColor: '#a5cd39' }}
								onClick={handleUpdateSubmit}>
								Update
							</button>
						</div>
						<table className='contradiction-table'>
							<thead>
								<tr>
									<th>
										<input
											type='checkbox'
											onChange={handleCheckAllChange}
										/>
									</th>
									{data.length > 0 &&
										Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
								</tr>
							</thead>
							<tbody>
								{data.map((row, index) => (
									<tr key={index}>
										<td>
											<input
												type='checkbox'
												checked={checkedItems.some(
													(item) => item.serial === row.serial
												)}
												onChange={() => handleCheckboxChange(row.serial)}
											/>
										</td>
										{Object.entries(row).map(([key, value], index) => (
											<td key={index}>{value}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	)
}

export default CheckListTable
