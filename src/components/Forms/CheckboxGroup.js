import React from 'react';
import '../../styles/CheckboxGroup.css';
import { Field } from 'redux-form';

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
      null;
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

                  {/*Radio Group*/}
                  {this.state.isSuperAnnuation && item.text === 'NZ Superannuation' &&
                    <div className="radio-group" style={this.state.isSuperAnnuation ? {marginBottom: '40px'} : {}}>
                      <div>
                        <div>
                          <div>
                            {item.options.map((child, child_key) => (
                              <RadioGroupChildren name="radio_children" value={child} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  {this.state.isWageOrSalary && item.text === 'Wage or salary' &&
                    <SingleTextField placeholder="Enter your total wages" data={this.state.isWageOrSalary} />
                  }

                  {this.state.isOther && item.text === 'Other' &&
                    <TextFieldGroup />
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

const RadioGroupChildren = props => {
  return(
    <label className="checkbox-radio">
      <input type="radio" name={props.name} value={props.value} />
      <span>{props.value}</span>
    </label>
  );
};

class TextFieldGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = { inputs: ['input-0'] };
    }

  render() {
    return(
      <div>
        <div>
            {this.state.inputs.map((input, i) => {
              i++;

              let styles = {
                marginTop: '8px',
                marginBottom: '8px',
                width: '100%'
              };

              return <div>
                <p>Other income {i}</p>
                <div>
                  <input
                    type="text"
                    placeholder="Where did this income come from?"
                    key={input}
                    style={styles} />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter the total amount"
                    key={input}
                    style={styles} />
                </div>
              </div>
            })}
        </div>
        <span className="btn" onClick={() => this.appendInput()}>+ Add another</span>
      </div>
    );
  }

  appendInput() {
    let newInput = `input-${this.state.inputs.length}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
  }
}
export default CheckboxGroup;
