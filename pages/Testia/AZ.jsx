import React from 'react';
import CheckListTable from '../../Components/CheckListTable'
const SampleComponent = () => {
  // Sample data for the table
  const data = [
    { serial: 1, name: 'Item 1', category: 'Category A' },
    { serial: 2, name: 'Item 2', category: 'Category B' },
    { serial: 3, name: 'Item 3', category: 'Category A' },
  ];

  return (
    <div>
      <h1>Sample Component</h1>
      <CheckListTable data={data} />
    </div>
  );
};

export default SampleComponent;
