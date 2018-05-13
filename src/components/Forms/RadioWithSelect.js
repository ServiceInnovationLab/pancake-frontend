import React from 'react';
import { Field, FieldArray } from 'redux-form';
import RemoveButton from './RemoveButton';

export default class RadioWithSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showYes: false
    };
  }

  toggle(item) {
    this.setState({showYes: item === 'yes' ? true : false});
  }

  render() {
    let showYes = {
      display: this.state.showYes ? 'block' : 'none'
    };

    return (
      <div>
        <fieldset className="radio-group">
          {this.props.label && <legend>
            {this.props.label}
          </legend>}

          {showYes && <div style={showYes}>
            <label>{this.props.textFieldLabel}</label>
            {this.props.instructions && <p>{this.props.instructions}</p>}
            <input type="number" name="otherIncomeParent" placeholder={this.props.placeholder} />
          </div>}
          <FieldArray name={this.props.name ? this.props.name : 'otherIncome'} component={renderOtherIncome} />
        </fieldset>

      </div>
    );
  }
}

class renderOtherIncome extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      other_source: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    let index = e.target.selectedIndex;
    if(e.nativeEvent.target[index].text === 'Income from other source (please identify)' && index === 10) {
      this.setState({other_source: true});
    }
  }

  render() {
    const { fields, meta: { error, submitFailed } } = this.props;
    return (
      <ul className="nested-list">
        {fields.map((income, index) => (
          <li key={index} style={{marginBottom: '15px'}}>

            <h4>Other income #{index + 1} </h4>
            <RemoveButton fields={fields} index={index} />
            <div className="select-wrapper">
              <select name={`${income}.selectedOption`} onChange={e=>this.handleOnChange(e)}>
                <option>Wage or salary</option>
                <option>Work and incomes supplements (e.g. Accommodation Supplement)</option>
                <option>Personal Superannuation</option>
                <option>Interest or dividends</option>
                <option>Overseas income (converted to $NZD)</option>
                <option>Net profit before tax from any business – enter ‘0’ if you sustained a loss</option>
                <option>Rental income – enter ‘0’ if you sustained a loss</option>
                <option>ACC earnings compensation</option>
                <option>Working for Families Tax Credits (excludes Family Tax Credits)</option>
                <option>Trust income paid to you</option>
                <option>Income from other source (please identify)</option>
              </select>
            </div>
            {this.state.other_source && <Field
              name={`${income}.incomeFrom`}
              type="text"
              component={renderField}
              label="Where did this income come from?"
            />}
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
  }
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <span className="aria-hidden">{label}</span>
    <div>
      <input {...input} type={type} placeholder={label} style={{marginBottom: '5px'}} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);
