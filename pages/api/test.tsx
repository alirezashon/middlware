import React from 'react';

const generateCSV = (data: any[]) => {
  const csvContent = [
    Object.keys(data[0]).join(','),
    ...data.map((row) => Object.values(row).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  a.click();

  URL.revokeObjectURL(url);
};

const dataArray = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Mike', age: 40 },
  // Add more data as needed
];

const CsvGenerator: React.FC = () => {
  const handleGenerateCSV = () => {
    generateCSV(dataArray);
  };

  return (
    <div>
      <h1>CSV Generator</h1>
      <button onClick={handleGenerateCSV}>Generate CSV</button>
    </div>
  );
};

export default CsvGenerator;
