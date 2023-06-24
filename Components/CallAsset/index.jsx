import { useState } from 'react';

export default function YourComponent(SerialArray) {
  const [response, setResponse] = useState('');

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
      const responses = await Promise.all(SerialArray.map((serial) => fetchData(serial)));
      setResponse(responses);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchData}>Fetch Data</button>
      <div><br>{JSON.stringify(response)}</br></div>
    </div>
  );
}
