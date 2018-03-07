import React from 'react';
import '../../styles/RadioGroup.css';

class RadioGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  handleObj(obj){
    if(Object.keys(obj).length > 1) {
      return obj[this.props.lang];
    } else {
      return obj['en']
    }
  }

  render(){
    return (
      <fieldset className="radio-group">
        <legend>
          {this.handleObj(this.props.label).label}
          {this.props.isRequired && <span className="aria-hidden">(required)</span>}
        </legend>
        {this.props.instructions && <p>{this.handleObj(this.props.instructions).label}</p>}
        <div>
          <div>
            <div>
              {this.handleObj(this.props.options).label.map((item, key) => {
                return <label key={key}>
                  <input {...this.props.input} type="radio" value={item} />
                  <span>{item}</span>
                </label>
              })}
              {this.props.touched && this.props.error && <span>{this.props.error}</span>}
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
};

export default RadioGroup;
