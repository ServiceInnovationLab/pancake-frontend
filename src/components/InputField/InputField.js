import React from 'react';

const InputField = props => {
  return <input
    {...props}
    onClick={e=>props.inputHandler ? props.inputHandler(e) : null}
  />;
};

export default InputField;
