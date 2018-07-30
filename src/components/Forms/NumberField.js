import React from 'react';

const NumberField = props => {
  return (
    <input
      {...props.input}
      type="number"
      min="0"
      step="1"
    />
  );
};

export default NumberField;
