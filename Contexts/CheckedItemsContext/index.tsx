import React, { createContext, useState } from 'react';

interface CheckedItem {
  serial: string;
  // Add other properties here
}

interface CheckedItemsContextType {
  checkedItems: CheckedItem[];
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItem[]>>;
}

export const CheckedItemsContext = createContext<CheckedItemsContextType>({
  checkedItems: [],
  setCheckedItems: () => {},
});

export const CheckedItemsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);

  return (
    <CheckedItemsContext.Provider value={{ checkedItems, setCheckedItems }}>
      {children}
    </CheckedItemsContext.Provider>
  );
};
