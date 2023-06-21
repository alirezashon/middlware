import { useState } from 'react';

export default function YourComponent() {
  const [response, setResponse] = useState('');
  const serialArray = ['EL1460129175325338', 'EL1460129171775321', 'EL987654321','EL987654321','EL987654321','EL987654321'];

  const fetchData = async (serial) => {
    try {
      const requestBody = { serial };
      const response = await fetch('/api/assetCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFetchData = async () => {
    try {
      const responses = await Promise.all(serialArray.map((serial) => fetchData(serial)));
      setResponse(responses);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchData}>Fetch Data</button>
      <div>{JSON.stringify(response)}</div>
    </div>
  );
}
