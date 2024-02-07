import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState({ name: [], age: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        
        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data.name.map((name, index) => (
          <li key={index}>{name} - {data.age[index]}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
