import React, { Fragment } from 'react';

const RadioField = props => {
  return (
    <Fragment>
      {console.log('options', props.options)}
      {props
        .options
        .map((item, i) => <Fragment key={i}>
          {console.log('radio_fields', item)}
          <label>
            <input
              type="radio"
              name={props.name ? props.name : 'radio_fields'}
              onClick={() => props.handleRadioClick(item, props.name ? props.name : 'radio_fields')}
            />
            <span>{item}</span>
          </label>
        </Fragment>)}
    </Fragment>
  );
};

export default RadioField;
