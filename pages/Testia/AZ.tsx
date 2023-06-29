import React, { useContext, useEffect } from 'react';
import CheckListTable from '../../Components/CheckList/CheckListTable';
import { ShowDiagramContext } from '../../Contexts/DiagramContext';
import { CheckedItemsContext } from '../../Contexts/CheckedItemsContext';

interface DataItem {
  serial: string;
  // Add other properties here
}

const SampleComponent = () => {
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

  // Sample data
  const sampleData: DataItem[] = [
    { serial: 'A001' },
    { serial: 'A002' },
    { serial: 'A003' },
    // Add more data items as needed
  ];

  const handleShowDiagramClick = () => {
    setShowDiagram(!showDiagram); // Toggle the value of showDiagram
  };

  return (
    <div>
      <button onClick={handleShowDiagramClick}>
        {showDiagram ? 'Hide Diagram' : 'Show Diagram'}
      </button>
      {showDiagram && <CheckListTable data={sampleData} />}
      <div>
        Checked Items:
        {checkedItems.map((item) => (
          <div key={item.serial}>{item.serial}</div>
        ))}
      </div>
    </div>
  );
};

export default SampleComponent;



