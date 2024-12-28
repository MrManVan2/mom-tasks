import React from 'react';

const ExcuseGenerator = ({ excuse }) => {
  return (
    <div className="excuse-generator">
      <h2>Mom's Excuse:</h2>
      <p>{excuse || "Mom hasn't made an excuse yet!"}</p>
    </div>
  );
};

export default ExcuseGenerator;
