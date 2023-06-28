import React, { useContext } from 'react';
import CheckListTable from '../../Components/CheckListTable';
import { ShowDiagramContext } from '../../Contexts/DiagramContext';

interface DataItem {
  serial: string;
  // Add other properties here
}

const SampleComponent: React.FC = () => {
  const { showDiagram, setShowDiagram } = useContext(ShowDiagramContext);

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
    </div>
  );
};

export default SampleComponent;
