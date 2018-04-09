import React from 'react';
import AddressFinder from '../Forms/AddressFinder';
import ErrorMessage from '../../components/Forms/Error';

const RenderTextField = props => {
  return <div className="input-group">
    <label>
      <span>{props.extraInfoLabel ? props.extraInfoLabel : props.label}</span>
      {props.isRequired && <span className="aria-hidden">(required)</span>}
    </label>
    {props.instructions && <p>{props.instructions}</p>}
    <div>
      {props.hasAddressFinder ? <AddressFinder /> : <input {...props.input} type="text" />}
      <ErrorMessage fields={props.meta} />
    </div>
  </div>;
};

export default RenderTextField;
