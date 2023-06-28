import { useState, useEffect } from 'react';

const MyPage = (props) => {
  const [data, setData] = useState([
    { assetCode: 'AST2022305935', status: 'Contractor---Intact' },
    { assetCode: 'AST2023333530', status: 'Contractor---Intact' },
    // Add more objects to the data array as needed
  ]);

  const [responses, setResponses] = useState([]);

  const fetchData = async () => {
    try {
      const updatedResponses = [];

      for (const item of data) {
        const response = await fetch('/api/Post/updateInstall', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
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
      {data.map((item, index) => (
        <div key={index}>
          <span>Asset Code: {item.assetCode}</span>
          <span>Status: {item.status}</span>
        </div>
      ))}
      <button onClick={fetchData}>fetch metch</button>

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
