import React from 'react';

const Error = props => {
  const {fields} = props;
  return (
    <div>
      {fields && fields.touched && fields.error &&
        <div>
          <span className="error"><strong>Error: </strong>{fields.error}</span>
        </div>
      }
    </div>
  );
};


export default Error;
