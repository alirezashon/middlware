import React, { createContext, useEffect, useState } from 'react';

interface CheckedItem {
  assetCode: string;
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

  useEffect(() => {
    // Load checkedItems from local storage on component mount
    const storedItems = localStorage.getItem('checkedItems');
    if (storedItems) {
      setCheckedItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    // Save checkedItems to local storage whenever it changes
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  return (
    <CheckedItemsContext.Provider value={{ checkedItems, setCheckedItems }}>
      {children}
    </CheckedItemsContext.Provider>
  );
};
