import React from 'react';
import '../../styles/TextField.css';
import '../../styles/FormValidation.css';

class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
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

  render(){
    return (
      <div className="input-group">
        <label>
          <span>{this.props.label && this.handleObj(this.props.label).text}</span>
          {this.props.isRequired && <span className="aria-hidden">(required)</span>}
        </label>
        {this.props.instructions && <p>{this.handleObj(this.props.instructions).text}</p>}
        <div>
          <input type="text" {...this.props.input} />
          {this.props.meta !== undefined && this.props.meta.touched && this.props.meta.error &&
            <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>
          }
        </div>
      </div>
    );
  }
}

export default TextField;
