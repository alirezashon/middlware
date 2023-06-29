

import React from 'react';
import { ContextProvider as DiagramContextProvider } from '../../Contexts/DiagramContext';
import { CheckedItemsProvider } from '../../Contexts/CheckedItemsContext';
import CheckList from './CheckListTable/TableProvider';
 interface DataItem {
  serial: string;
  // Add other properties here
}

interface SampleComponentProps {
  sampleData: DataItem[];
}

const App: React.FC<SampleComponentProps> = ({ sampleData }) => {
  return (
    <DiagramContextProvider>
      <CheckedItemsProvider>
        <h1>helllo</h1>
        <CheckList sampleData = { sampleData} />
      </CheckedItemsProvider>
    </DiagramContextProvider>
  );
};
     
export default App;
