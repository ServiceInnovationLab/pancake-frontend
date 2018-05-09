import React, {Fragment} from 'react';
import ErrorMessage from '../../components/Forms/Error';

var _ = require('lodash');

const isObject = (obj, key) => {
  return _.isObject(obj) ? obj[key] : obj;
};

const RenderRadio = fields => {
  const {label, isRequired, instructions, options, input} = fields;

  return <fieldset className={options && options.length > 2 ? 'radio-list' : 'radio-group'}>
    {label && <legend>
      {label}
      {isRequired && <span className="aria-hidden">(required)</span>}
    </legend>}
    {instructions && <p dangerouslySetInnerHTML={{ __html: instructions }}></p>}
    {!instructions && <Fragment></Fragment>}
    <div>
      <div>
        {options && options.map((item, key) => {
          return <label key={key} className={fields.className && fields.className}>
            <input {...input} type="radio" value={isObject(item, 'value')} />
            <span style={{border: '1px solid black'}}>{isObject(item, 'label')}</span>
          </label>;
        })}
      </div>
    </div>
    <ErrorMessage fields={fields} />
  </fieldset>;
};

export default RenderRadio;
