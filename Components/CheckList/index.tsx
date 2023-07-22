

import React from 'react';
import { ContextProvider as DiagramContextProvider } from '../../Contexts/DiagramContext';
import { CheckedItemsProvider } from '../../Contexts/CheckedItemsContext';
import CheckListTable from './CheckListTable/TableProvider';
 interface DataItem {
  assetCode: string;
  // Add other properties here
}

interface SampleComponentProps {
  sampleData: DataItem[];
}

const CheckList: React.FC<SampleComponentProps> = ({ sampleData }) => {
  return (
    <DiagramContextProvider>
      <CheckedItemsProvider>
        <CheckListTable sampleData = { sampleData } />
      </CheckedItemsProvider>
    </DiagramContextProvider>
  );
};
     
export default CheckList;
