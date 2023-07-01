import React, { useContext, useEffect } from 'react';
import CheckListTable from '../../../../Components/CheckList/CheckListTable';
import { ShowDiagramContext } from '../../../../Contexts/DiagramContext';
import { CheckedItemsContext } from '../../../../Contexts/CheckedItemsContext';
import LocalStorageButton from '../../LocalStorageButton';
interface DataItem {
  assetCode: string;
  // Add other properties here
}

interface SampleComponentProps {
  sampleData: DataItem[]; 
}

const SampleComponent: React.FC<SampleComponentProps> = ({ sampleData }) => {
  const { showDiagram, setShowDiagram } = useContext(ShowDiagramContext);
  const { checkedItems, setCheckedItems } = useContext(CheckedItemsContext);

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
  }, [setCheckedItems]);

  const handleShowDiagramClick = () => {
    setShowDiagram(!showDiagram); // Toggle the value of showDiagram
  };

  return (
	  <div>
		  {/* <LocalStorageButton/> */}
      <button onClick={handleShowDiagramClick}>
        {showDiagram ? 'Hide Diagram' : 'Show Diagram'}
      </button>
      {showDiagram && <CheckListTable data={sampleData} />}
      <div>
        Checked Items:
        {checkedItems.map((item) => (
          <div key={item.assetCode}>{item.assetCode}</div>
        ))}
      </div>
    </div>
  );
};

export default SampleComponent;
