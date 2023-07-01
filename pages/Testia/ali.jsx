import { useState, useEffect } from 'react';

const MyPage = ({ data }) => { 
  const [responses, setResponses] = useState([]);

  const fetchData = async () => {
    try {
      const updatedResponses = [];

      for (const item of data.assetcodes) {
        const response = await fetch('/api/Post/updateStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ assetCode: item, status: data.status }),
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const responseData = await response.json();
        updatedResponses.push(responseData);
      }

      setResponses(updatedResponses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {data.assetcodes.map((assetCode, index) => (
        <div key={index}>
          <span>Asset Code: {assetCode}</span>
          <span>Status: {data.status}</span>
        </div>
      ))}
      <button onClick={fetchData}>Fetch Data</button>

      <div>
        <h2>Responses:</h2>
        {responses.map((response, index) => (
          <div key={index}>
            <span>Response {index + 1}: </span>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
