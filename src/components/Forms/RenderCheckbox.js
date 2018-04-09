import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import { camelCaser } from '../../helpers/strings';


const RenderCheckbox = props => {
  
  let hasNestedValue = `has${camelCaser(props.label)}NestedValue`;

  return <Fragment>
    {props.hasHeader && 
      <fieldset className="checkbox-group">
        <legend>Income</legend>
        <p>Select any you receive</p>
      </fieldset>}
    <fieldset className="checkbox-group">
      <label>
        <input {...props.input} type="checkbox" />
        {props.label && <span>{props.label}</span>}
      </label>
      {props.hasValue && props.options && (
        <div className="radio-group">
          <Field
            name={hasNestedValue}
            isRequired={true}
            options={props.options}
            component={RenderCheckboxRadio}
          />
        </div>
      )}
      
      {props.hasValue && props.hasTextField && 
        <Field
          name={hasNestedValue}
          isRequired={true}
          component={RenderCheckboxTextField}
        />
      }
      {props.hasValue && props.hasChildren &&
        <FieldArray name="otherIncome" component={renderOtherIncome} />
      }
    </fieldset>
  </Fragment>;
};

const RenderCheckboxRadio = fields => {
  const {label, options, input} = fields;
  return <div>
    <div className="nested-field">
      {options && options.map((item, key) => {
        return <label className="checkbox-radio" key={key}>
          <input
            {...input}
            type="radio"
            value={item}
          />
          <span>{item}</span>
        </label>;
      })}
    </div>
    {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
      <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
    }
  </div>;
};

const RenderCheckboxTextField = fields => {
  const {input} = fields;
  return <div>
    <div className="nested-field">
      <input
        {...input}
        type="number"
        style={{width: '100%', margin: '0'}}
      />
        
      {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
        <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
      }
    </div>
  </div>;
};

const renderOtherIncome = ({ fields, meta: { error, submitFailed, valid } }) => (
  
  <ul className="nested-list">
    {fields.map((income, index) => (
      <li key={index} style={{marginBottom: '15px'}}>
        
        <h4>Other income #{index + 1} </h4>
        <button
          type="button"
          title="Remove income"
          className="nested-button"
          onClick={() => fields.remove(index)}
        >Remove income</button>
        <Field
          name={`${income}.incomeFrom`}
          type="text"
          component={renderField}
          label="Where did this income come from?"
        />
        <Field
          name={`${income}.totalAmount`}
          type="number"
          component={renderField}
          label="Enter the total amount"
        />
      </li>
    ))}
    <li>
      <button type="button" onClick={() => fields.push({})}>
        + Add Income
      </button>
      {submitFailed && error && <span>Error</span>}
    </li>
  </ul>
);

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label><span className="aria-hidden">{label}</span>
      <div>
        <input {...input} type={type} placeholder={label} style={{marginBottom: '5px'}} />
        {touched && error && <span>{error}</span>}
      </div>
    </label>
  </div>
);

export default RenderCheckbox;
