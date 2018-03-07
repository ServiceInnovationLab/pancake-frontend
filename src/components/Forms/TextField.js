import React from 'react';
import '../../styles/TextField.css';

class TextField extends React.Component {

  handleObj(obj){
    if(Object.keys(obj).length > 1) {
      return obj[this.props.lang];
    } else {
      return obj['en']
    }
  }

  render(){
    return (
      <div className="input-group">
        <label>
          <span>{this.handleObj(this.props.label).text}</span>
          {this.props.isRequired && <span className="aria-hidden">(required)</span>}
        </label>
        {this.props.instructions && <p>{this.handleObj(this.props.instructions).text}</p>}
        <div>
          <input type="text" {...this.props.input} />
          {this.props.touched && this.props.error && <span>{this.props.error}</span>}
        </div>
      </div>
    );
  }
};

export default TextField;
