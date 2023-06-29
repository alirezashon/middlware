import React from 'react';

interface TableProps {
  existData: { [key: string]: string }[];
  contradictionData: { [key: string]: string }[];
}

const Table: React.FC<TableProps> = ({ existData, contradictionData }) => {
  return (
    <table className="contradiction-table">
      <thead>
        <tr>
          {existData.length > 0 &&
            Object.keys(existData[0]).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {contradictionData.map((row, index) => (
          <tr key={index}>
            {Object.entries(row).map(([key, value], index) => (
              <td key={index} style={key === 'category' ? { backgroundColor: '#fa7d5a' } : undefined}>
                {value}
              </td>
            ))}
          </tr>
        ))}
        {existData.map((row, index) => (
          <tr key={index}>
            {Object.entries(row).map(([key, value], index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
