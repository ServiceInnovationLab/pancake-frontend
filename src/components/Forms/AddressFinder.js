import React from 'react';
import '../../styles/AddressFinder.css';
import '../../styles/TextField.css';
import '../../styles/FormValidation.css';

class AddressFinder extends React.Component {

  componentWillUpdate() {
    let address_field = document.getElementById('address_field');
    if(window.AddressFinder) {
      let widget = new window.AddressFinder.Widget(
        address_field,
        'ADDRESSFINDER_DEMO_KEY',
        'NZ',
        {manual_style:true}
      );
      widget.on('result:select', (value, item) => {});
    }
  }


  render() {
    const {type, placeholder, className} = this.props;
    return (
      <div className="address_finder_container input-group">
        <label htmlFor={this.props.id}>What is your address</label>
        <div>
          <input {...this.props.input} type={type} placeholder={placeholder} id={this.props.id} className={className} />
          {this.props.meta !== undefined && this.props.meta.touched && this.props.meta.error &&
            <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>
          }
        </div>
      </div>
    );
  }
}

export default AddressFinder;
