import React from 'react';
import '../../styles/CheckboxGroup.css';
import {Field, FieldArray} from "redux-form";
import radioGroup from "../Forms/RadioGroup";

class CheckboxGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSuperAnnuation: false,
      isWageOrSalary: false,
      isOther: false
    };
  }
  handleObj(obj){
    if(obj === undefined || obj === null) {
      return;
    } else {
      if(Object.keys(obj).length > 1) {
        return obj[this.props.lang];
      } else {
        return obj['en'];
      }
    }
  }

  handleChildren(e) {
    let isChecked = e.target.checked;
    switch(e.target.value) {
    case 'NZ Superannuation':
      this.setState({isSuperAnnuation: isChecked});
      break;
    case 'Wage or salary':
      this.setState({isWageOrSalary: isChecked});
      break;
    case 'Other':
      this.setState({isOther: isChecked});
      break;
    default:
      this.setState()
    }
  }

  render(){
    return (
      <fieldset className="checkbox-group">
        <legend>
          <span>{this.props.label && this.handleObj(this.props.label).text}</span> &nbsp;
          {this.props.isRequired && <span className="aria-hidden">(required)</span>}
        </legend>
        {this.props.instructions && <p>{this.handleObj(this.props.instructions).text}</p>}
        <div>
          <div>
            <div>
              {this.props.options && this.handleObj(this.props.options).option.map((item, key) => {
                return <div>
                  <label key={key}>
                    <input {...this.props.input} type="checkbox" value={item.text} onChange={e => {this.handleChildren(e)}} />
                    <span>{item.text}</span>
                  </label>

                  {this.state.isSuperAnnuation && item.text === 'NZ Superannuation' &&
                    <div className="radio-group" style={this.state.isSuperAnnuation ? {marginBottom: '40px'} : {}}>
                      <div>
                        <div>
                          <div>
                            <Field name="super_annuation" component={RenderRadios} />
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  {this.state.isWageOrSalary && item.text === 'Wage or salary' &&
                    <Field
                      name="total_wages"
                      component={SingleTextField}
                      data={this.state.isWageOrSalary}
                      placeholder="Enter your total wages"
                    />
                  }

                  {this.state.isOther && item.text === 'Other' &&
                    <FieldArray name="other_income" component={renderOtherIncomes} />
                  }

                </div>
                })}
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
};

const SingleTextField = props => {
  return(
    <input type="text" placeholder={props.placeholder} style={props.data ? {marginTop: '8px', width: '100%'} : {}} />
  );
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} style={{width: '100%', margin: '0'}}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderOtherIncomes = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul className="checkbox-list">
    <li style={{marginBottom: '35px'}}>
      <h4 style={{marginBottom: '10px'}}>Income #1</h4>
      <Field
        name={`${fields[0]}.firstName`}
        type="text"
        component={renderField}
        label="Income #1"
      />
    </li>
    {fields.map((income, index) => (
      <li key={index}>
        <h4 style={{marginBottom: '10px'}}>Income #{index + 2}</h4>
        <Field
          name={`${income}.firstName`}
          type="text"
          component={renderField}
          label={`Income #${index + 2}`}
        />
        <button
          type="button"
          title="Remove"
          onClick={() => fields.remove(index)}
          style={{marginBottom: '35px'}}
        >Remove</button>
      </li>
    ))}
    <li>
      <button type="button" onClick={() => fields.push({})}>+ Add another</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
  </ul>
);


const RenderRadios = props => {
  return (
    <fieldset className="radio-group">
      <div>
        <div>
          <div>
            {['yes','no'].map((item, key) => {
              return <label key={key} className="checkbox-radio">
                <input {...props.input} type="radio" value={item} />
                <span>{item}</span>
              </label>;
            })}
          </div>
          {props.meta !== undefined && props.meta.touched && props.meta.error &&
            <span className="error"><strong>Error: </strong>{props.meta.error}</span>
          }
        </div>
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
