import React from 'react';
import AddressFinder from '../Forms/AddressFinder';
import ErrorMessage from '../../components/Forms/Error';

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
    let shown = {
      display: this.state.shown ? 'block' : 'none'
    };
    return (
      <div>
        <fieldset className="radio-group">
          <legend>
            {this.props.label}
          </legend>
          <div>
            {this.props.hasAddressFinder ? <AddressFinder /> : <input {...this.props.input} type="text" />}
          </div>
          <label style={{fontWeight: 'normal', fontSize: '16px'}}>
            <input type="checkbox" onClick={this.toggle.bind(this)} /> {this.props.checkboxLabel}
          </label>
          <div style={ shown }>{this.props.checkboxText}</div>
          <ErrorMessage fields={this.props.meta} />
        </fieldset>
      </div>
    );
  }
}
