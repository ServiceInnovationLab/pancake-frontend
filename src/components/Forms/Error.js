import React from 'react';

const Error = fields => {
  return (
    <div>
      {fields.fields && fields.fields.error && 
        <span className="error"><strong>Error: </strong>{fields.fields.error}</span>
      }
    </div>
  );
};


export default Error;
