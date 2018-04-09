import React from 'react';
import AddressFinder from '../Forms/AddressFinder';
import '../../styles/AddressFinder.css';

const RenderTextField = props => {
  return <div className="input-group">
    <label>
      <span>{props.label}</span>
      {props.isRequired && <span className="aria-hidden">(required)</span>}
    </label>
    {props.instructions && <p>{props.instructions}</p>}
    <div>
      {props.hasAddressFinder ? <AddressFinder /> : <input {...props.input} type="text" />}
      {props.meta !== undefined && props.meta.touched && props.meta.error &&
        <span className="error"><strong>Error: </strong>{props.meta.error}</span>
      }
    </div>
  </div>;
};

export default RenderTextField;
