import React from 'react';
import '../../styles/CheckboxGroup.css';

class CheckboxGroup extends React.Component {

  handleObj(obj){
    if(Object.keys(obj).length > 1) {
      return obj[this.props.lang];
    } else {
      return obj['en']
    }
  }

  render(){
    return (
      <fieldset className="checkbox-group">
        <legend>
          <span>{this.handleObj(this.props.label).text}</span> &nbsp;
          {this.props.isRequired && <span className="aria-hidden">(required)</span>}
        </legend>
        {this.props.instructions && <p>{this.handleObj(this.props.instructions).text}</p>}
        <div>
          <div>
            <div>
              {this.handleObj(this.props.options).text.map((item, key) => {
                return <label key={key}>
                  <input {...this.props.input} type="checkbox" value={item} />
                  <span>{item}</span>
                </label>
              })}
              {this.props.meta.touched && this.props.meta.error && <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>}
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
};

export default CheckboxGroup;
