import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendExam() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/attend-exam');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>{data}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AttendExam;