import React from 'react';
import '../../styles/RadioGroup.css';

const RadioGroup = props => {
  return (
    <fieldset className="radio-group">
      <legend>
        <span>{props.label}</span> &nbsp;
        {props.isRequired && <span className="aria-hidden">(required)</span>}
      </legend>
      <p>{props.instructions}</p>
      <div>
        <div>
          <div>
            {props.options.map((item, key) => {
              return <label key={key}>
                <input {...props.input} type="radio" value={item} />
                <span>{item}</span>
              </label>
            })}
            {props.touched && props.error && <span>{props.error}</span>}
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default RadioGroup;
