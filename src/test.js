import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const Test = () => {
  const data = [
    { Country: "India", id: 1 },
    { Country: "Usa", id: 2 },
    { Country: "Sri Lanka", id: 3 },
    { Country: "Germany", id: 4 }
  ];

  // Initialize options state with an empty array
  const [options] = useState([]);

  return (
    <div>
      <div>TEST</div>
      <div style={{ width: "90%", justifyContent: "center", display: "flex" }}>
        <Multiselect options={data} displayValue="Country" />
      </div>
    </div>
  );
};

export default Test;
