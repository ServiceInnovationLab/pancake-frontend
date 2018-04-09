import React from 'react';

const RenderRadio = fields => {
  const {label, isRequired, instructions, options, input} = fields;

  return <fieldset className="radio-group">
    {label && <legend>
      {label}
      {isRequired && <span className="aria-hidden">(required)</span>}
    </legend>}
    {instructions && <p>{instructions}</p>}
    {!instructions && <p></p>}
    <div>
      <div>
        {options && options.map((item, key) => {
          return <label key={key}>
            <input {...input} type="radio" value={item} />
            <span>{item}</span>
          </label>;
        })}
      </div>
    </div>
    {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
      <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
    }
  </fieldset>
};

export default RenderRadio;
