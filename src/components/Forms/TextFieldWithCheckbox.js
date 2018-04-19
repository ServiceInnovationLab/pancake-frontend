import React, { Fragment } from 'react';
import ErrorMessage from '../../components/Forms/Error';
import '../../styles/AddressFinder.css';

export default class TextFieldWithCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      address: ''
    };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown,
    });
  }
  componentWillUpdate() {
    let address_field = document.getElementById('address_field');
    if(window.AddressFinder){
      let widget = new window.AddressFinder.Widget(
        address_field,
        'ADDRESSFINDER_DEMO_KEY',
        'NZ',
        {manual_style:true}
      );

      widget.on('result:select', (value) => {
        this.setState({address: value});
        document.getElementById('address_field').focus();
      });
    }
  }

  render() {
    let shown = {
      display: this.state.shown ? 'block' : 'none'
    };
    delete this.props.input.value;

    return (
      <fieldset className="radio-group">
        <legend>{this.props.label}</legend>
        <div>
          {this.props.hasAddressFinder && 
            <input {...this.props.input} value={this.state.address} id="address_field" type="search"
              onChange={e => this.setState({address: e.target.value})}/>}
          {!this.props.hasAddressFinder && <Field hasAddressFinder={false} input={this.props.input} />}
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

const Field = props => {
  return (
    <Fragment>
      {!props.hasAddressFinder && <input {...props.input} type={props.type} />}
    </Fragment>
  );
};
