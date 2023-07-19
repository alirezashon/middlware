/** @format */

import React, { useContext } from 'react'
import { CheckedItemsContext } from '../../../Contexts/CheckedItemsContext'

const LocalStorageButton: React.FC = () => {
	const { setCheckedItems } = useContext(CheckedItemsContext)

	const handleClearLocalStorage = () => {
		// Clear the checked items from local storage
		localStorage.removeItem('checkedItems')
		// Clear the checked items in the context
		setCheckedItems([])
	}

	return <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
}

export default LocalStorageButton
