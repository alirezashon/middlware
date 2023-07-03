/** @format */

import { useState } from 'react'

const CopyButton = () => {
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		const buttonName = [
			{ assetCode: 1, item: 1 },
			{ assetCode: 2, item: 2 },
			{ assetCode: 3, item: 3 },
			{ assetCode: 448645445644658, item: 4 },
		] // Replace 'Button Name' with the desired name of the button

		navigator.clipboard
			.writeText(buttonName[3].assetCode)
			.then(() => {
				setCopied(true)
				setTimeout(() => {
					setCopied(false)
				}, 2000) // Reset the copied state after 2 seconds
			})
			.catch((error) => {
				console.error('Failed to copy: ', error)
			})
	}

	return (
		<div>
			<button onClick={handleCopy}>Copy Button Name</button>
			{copied && <p>Button name copied to clipboard!</p>}
		</div>
	)
}

export default CopyButton
