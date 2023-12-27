import React from 'react';
import axios from 'axios';

export default function ShowSchools() {
 const [schools, setSchools] = React.useState([]);

 React.useEffect(() => {
    axios.get('/api/schools')
      .then(response => {
        setSchools(response.data);
      });
 }, []);

 return (
    <div>
      {schools.map(school => (
        <div key={school.id}>
          <h2>{school.name}</h2>
          <p>{school.address}</p>
          <p>{school.city}</p>
          <img src={school.image} alt={school.name} />
        </div>
      ))}
    </div>
 );
}