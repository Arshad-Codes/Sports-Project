import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SportsList() {
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setLoading(false);
      }
    }

    fetchSports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sports List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sportsData.map((sport) => (
            <div
              key={sport._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex"
            >
              <img
                src={sport.imageUrl}
                alt={sport.name}
                className="w-1/3 h-auto object-cover"
              />
              <div className="p-4 w-2/3">
                <h3 className="text-xl font-bold mb-2">{sport.name}</h3>
                <p className="text-gray-600">{sport.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SportsList;
