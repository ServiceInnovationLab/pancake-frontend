import React from 'react';
import AddressFinder from '../Forms/AddressFinder';
export default class TextFieldWithCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}
  render() {
    var shown = {
			display: this.state.shown ? "block" : "none"
    };
    var hidden = {
			display: this.state.shown ? "none" : "block"
		}
    return (
      <div><fieldset className="radio-group">
      <legend>
        {this.props.label}
      </legend>
      {/* <label>{this.props.label}</label> */}
        {/* <label>{this.props.label}</label> */}
        <div>
      {this.props.hasAddressFinder ? <AddressFinder /> : <input {...this.props.input} type="text" />}
    </div>
        <label style={{fontWeight: 'normal', fontSize: '16px'}}>
          <input type="checkbox" onClick={this.toggle.bind(this)} /> {this.props.checkboxLabel}
        </label>
        <div style={ shown }>{this.props.checkboxText}</div>
        {this.props.meta !== undefined && this.props.meta.touched && this.props.meta.error &&
        <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>
      }
        </fieldset>
      </div>
    );
  }
}
