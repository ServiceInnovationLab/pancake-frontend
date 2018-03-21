import React from 'react';

class Select extends React.Component {

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

  render() {
    return (
      <div>
        <fieldset className="select">
          <legend>
            {this.props.label && this.handleObj(this.props.label).text}
            {this.props.isRequired && <span className="aria-hidden">(required)</span>}
          </legend>
          {this.props.instructions && <p>{this.handleObj(this.props.instructions).text}</p>}
          <div className="select-container">
            <select {...this.props.input}>
              <option>-- Select --</option>
              {this.handleObj(this.props.options).text.map((item, key) => <option key={key} value={item}>{item}</option>)}
            </select>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default Select;
