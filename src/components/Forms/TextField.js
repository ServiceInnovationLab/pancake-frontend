import React from 'react';
import '../../styles/TextField.css';

const TextField = props => {
  return (
    <div className="input-group">
      <label>
        <span>{props.label}</span>
        {props.isRequired && <span className="aria-hidden">(required)</span>}
      </label>
      {props.instructions && <p>{props.instructions}</p>}
      <div>
        <input type="text" {...props.input} />
        {props.touched && props.error && <span>{props.error}</span>}
      </div>
    </div>
  );
};

export default TextField;
