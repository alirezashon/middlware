/** @format */

import React, { useContext, useEffect,useState } from 'react'
import { CheckedItemsContext } from '../../../Contexts/CheckedItemsContext'
import { ShowDiagramContext } from '../../../Contexts/DiagramContext'
import UpdateAsset from '../../UpdateAsset'

interface DataItem {
  assetCode: string;
  // Add other properties here
}

const CheckListTable: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const { checkedItems, setCheckedItems } = useContext(CheckedItemsContext);
  const { showDiagram, setShowDiagram } = useContext(ShowDiagramContext);
  const [assetCodes, setAssetCodes] = useState<string[]>([]); // New state for asset codes

  useEffect(() => {
    // Save checkedItems to local storage whenever it changes
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    // Load checkedItems from local storage on component mount
    const storedItems = localStorage.getItem('checkedItems');
    if (storedItems) {
      setCheckedItems(JSON.parse(storedItems));
    }
  }, []);
console.log(assetCodes)
  const handleCloseClick = () => {
    setShowDiagram(false);
  };

  const handleCheckboxChange = (assetCode: string) => {
    const isChecked = checkedItems.some((item) => item.assetCode === assetCode);

    if (isChecked) {
      setCheckedItems(checkedItems.filter((item) => item.assetCode !== assetCode));
      setAssetCodes(assetCodes.filter((code) => code !== assetCode)); // Remove asset code from the state
    } else {
      const itemToAdd = data.find((item) => item.assetCode === assetCode);
      if (itemToAdd) {
        setCheckedItems([...checkedItems, itemToAdd]);
        setAssetCodes([...assetCodes, assetCode]); // Push asset code into the state
      }
    }
  };

  const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems(data);
      setAssetCodes(data.map((item) => item.assetCode)); // Set all asset codes in the state
    } else {
      setCheckedItems([]);
      setAssetCodes([]); // Clear the asset code state
    }
  };

  const handleUpdateSubmit = async () => {
    // Perform your update logic here using the checkedItems state
    const sampleData = {
			assetcodes: assetCodes, // Pass the assetCodes state to the API
			status: 'Mobinnet---Intact_second-hand',
		}
    try {
      const responses = await UpdateAsset(sampleData);
      console.log(responses);
    } catch (error) {
      console.error(error);
    }
    setCheckedItems([]);
    setAssetCodes([]);
    handleCloseClick();
  };

  // Rest of the component code
	
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
