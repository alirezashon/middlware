/** @format */

import React, { useContext, useEffect, useState } from 'react'
import { CheckedItemsContext } from '../../../Contexts/CheckedItemsContext'
import { ShowDiagramContext } from '../../../Contexts/DiagramContext'
import UpdateAsset from '../../UpdateAsset'
import Modal from '../../Modal'
import styles from './CheckListTable.module.css'
import { MdBackspace } from 'react-icons/md'
interface DataItem {
	assetCode: string
	// Add other properties here
}

const CheckListTable: React.FC<{ data: DataItem[] }> = ({ data }) => {
	const { checkedItems, setCheckedItems } = useContext(CheckedItemsContext)
	const { showDiagram, setShowDiagram } = useContext(ShowDiagramContext)
	const [assetCodes, setAssetCodes] = useState<string[]>([]) // New state for asset codes
	const [selectedItem, setSelectedItem] = useState('')
	const [updated, setUpdated] = useState<DataItem[]>([])
	const [progress, setProgress] = useState(0)
	//config the setselected , for choose option of status from the modal
	const handleStatusSelected = (selectedStatus: string) => {
		setSelectedItem(selectedStatus)
	}

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
	console.log(assetCodes)
	const handleCloseClick = () => {
		setShowDiagram(false)
	}

	const handleCheckboxChange = (assetCode: string) => {
		const isChecked = checkedItems.some((item) => item.assetCode === assetCode)

		if (isChecked) {
			setCheckedItems(
				checkedItems.filter((item) => item.assetCode !== assetCode)
			)
			setAssetCodes(assetCodes.filter((code) => code !== assetCode)) // Remove asset code from the state
		} else {
			const itemToAdd = data.find((item) => item.assetCode === assetCode)
			if (itemToAdd) {
				setCheckedItems([...checkedItems, itemToAdd])
				setAssetCodes([...assetCodes, assetCode]) // Push asset code into the state
			}
		}
	}

	const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked

		if (isChecked) {
			setCheckedItems(data)
			setAssetCodes(data.map((item) => item.assetCode)) // Set all asset codes in the state
		} else {
			setCheckedItems([])
			setAssetCodes([]) // Clear the asset code state
		}
	}

	const handleUpdateSubmit = async () => {
		// Perform your update logic here using the checkedItems state
		const sampleData = {
			assetcodes: assetCodes, // Pass the assetCodes state to the API
			status: selectedItem,
		}
		try {
			const responses = await UpdateAsset(sampleData, handleProgress) // Pass handleProgress as the callback
			console.log(responses)
			const { completed, failure } = responses

			// Use the completed and failure data as needed
			console.log('Completed:', completed)
			console.log('Failure:', failure)
			const success: DataItem[] = data.map((item) => ({
				...item,
				successful: completed.some(
					(completedItem) => completedItem.assetcode === item.assetCode
				),
			}))

			setUpdated(success)
			console.log('success:', success)
		} catch (error) {
			console.error(error)
		}
	}

	const handleProgress = (progress: number) => {
		setProgress(progress)
	}

	useEffect(() => {}, [updated])

	// Rest of the component code
	// AST2023340596,AST2023340597,AST2023340598,AST2023340599,AST2023340600,AST2023340601,AST2023340602,AST2023340603,AST2023340604,AST2023340605,AST2023340606
	return (
		<div>
			{showDiagram && (
				<div className={styles.diagramBox}>
					<div className={styles.scrollableContainer}>
						<div className={styles.buttonsBox}>
							<button
								style={{ backgroundColor: '#ffa20d' }}
								className={styles.closeButton}
								onClick={handleCloseClick}>
								<MdBackspace />
							</button>
							{progress > 0 && (
								<div className={styles.progressBar}>
									<div
										className={styles.progressFill}
										style={{ width: `${progress}%` }}></div>
								</div>
							)}
							{selectedItem.length > 0 ? (
								<button
									style={{ backgroundColor: '#99de18' }}
									className={`${styles.updateButton} ${styles.greenButton}`}
									onClick={handleUpdateSubmit}>
									Update
								</button>
							) : (
								<Modal onSelectStatus={handleStatusSelected} />
							)}
						</div>
						<table className={styles.contradictionTable}>
							<thead>
								<tr>
									<th>
										<input
											type='checkbox'
											className={styles.checkboxInput}
											onChange={handleCheckAllChange}
										/>
									</th>
									{data.length > 0 &&
										Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
								</tr>
							</thead>

							<tbody>
								{updated.length > 0
									? updated.map((row, index) => (
											<tr key={index}>
												<td>
													<input
														className={styles.checkboxInput}
														type='checkbox'
														checked={checkedItems.some(
															(item) => item.assetCode === row.assetCode
														)}
														onChange={() => handleCheckboxChange(row.assetCode)}
													/>
												</td>
												{Object.entries(row).map(([key, value], index) => (
													<td
														key={index}
														style={
															key === 'assetCode'
																? { backgroundColor: '#c4de18' }
																: undefined
														}>
														{value}
													</td>
												))}
											</tr>
									  ))
									: data.map((row, index) => (
											<tr key={index}>
												<td>
													<input
														className={styles.checkboxInput}
														type='checkbox'
														checked={checkedItems.some(
															(item) => item.assetCode === row.assetCode
														)}
														onChange={() => handleCheckboxChange(row.assetCode)}
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
