import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import '../../styles/AddressFinder.css';

export default class TextFieldWithCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', this.loadWidget());
  }

  loadWidget() {
    window.onload = function(){
      if(window.AddressFinder.Widget) {
        let address_field = document.getElementById('address_field') || document.getElementById('what_is_your_address');
        new window.AddressFinder.Widget(
          address_field,
          'ADDRESSFINDER_DEMO_KEY',
          'NZ',
          {manual_style:true}
        );
      }
    };
  }

  render() {
    let shown = {
      display: this.state.shown ? 'block' : 'none'
    };
    return (
      <fieldset className="radio-group">
        <legend>{this.props.label}</legend>
        <div>
          {this.props.hasAddressFinder && 
            <input
              id="address_field"
              type="search"
              className="address-finder-input"
              autoComplete="off"
              autoCorrect="off"
              onFocus={()=>this.loadWidget()} {...this.props.input}
            />}
        </div>
        <label style={{fontWeight: 'normal', fontSize: '16px'}}>
          <input type="checkbox" onClick={this.toggle.bind(this)} /> {this.props.checkboxLabel}
        </label>
        <div style={shown}>{this.props.checkboxText}</div>
        <ErrorMessage fields={this.props.meta} />
      </fieldset>
    );
  }
}
