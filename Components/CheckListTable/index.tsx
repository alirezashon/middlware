import React, { useContext, useState } from 'react';
import { ShowDiagramContext } from '../../Contexts/DiagramContext';

interface DataItem {
  serial: string;
  // Add other properties here
}

const CheckListTable: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const { showDiagram, setShowDiagram } = useContext(ShowDiagramContext);

  const handleCloseClick = () => {
    setShowDiagram(false);
  };

  const handleCheckboxChange = (serial: string) => {
    const isChecked = checkedItems.includes(serial);

    if (isChecked) {
      setCheckedItems(checkedItems.filter((item) => item !== serial));
    } else {
      setCheckedItems([...checkedItems, serial]);
    }
  };

  const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const allSerials = data.map((row) => row.serial);
      setCheckedItems(allSerials);
    } else {
      setCheckedItems([]);
    }
  };

  const handleUpdateSubmit = () => {
    // Perform your update logic here using the checkedItems state
    console.log('Updating Items:', checkedItems);
    setCheckedItems([]);
    handleCloseClick();
  };

  return (
    <div>
      {showDiagram && (
        <div className="diagram-box">
          <div className="scrollable-container">
            <div className="buttons-box">
              <button className="update-button" onClick={handleCloseClick}>
                Close
              </button>
              <button
                className="update-button"
                style={{ backgroundColor: '#a5cd39' }}
                onClick={handleUpdateSubmit}
              >
                Update
              </button>
            </div>
            <table className="contradiction-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" onChange={handleCheckAllChange} />
                  </th>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(row.serial)}
                        onChange={() => handleCheckboxChange(row.serial)}
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
  );
};

export default CheckListTable;
