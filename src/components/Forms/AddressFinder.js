import React from 'react';

class AddressFinder extends React.Component {
  componentDidMount() {
    window.onload = function(){
      if(window.AddressFinder.Widget) {
        let address_field = document.getElementById('address_field');
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
    return (
      <input id="address_field" type="search" name="what_is_your_address" className="address-finder-input" />
    );
  }
}

export default AddressFinder;
