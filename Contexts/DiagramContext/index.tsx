import React, { createContext, useState } from 'react';

interface ShowDiagramContextType {
  showDiagram: boolean;
  setShowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowDiagramContext = createContext<ShowDiagramContextType>({
  showDiagram: false,
  setShowDiagram: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showDiagram, setShowDiagram] = useState(false);

  return (
    <ShowDiagramContext.Provider value={{ showDiagram, setShowDiagram }}>
      {children}
    </ShowDiagramContext.Provider>
  );
};
