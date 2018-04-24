import React, { Fragment } from 'react';

class Accordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
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
      <Fragment>
        <div onClick={this.toggle.bind(this)} className="accordian">{this.props.label}</div>
        <div style={shown} dangerouslySetInnerHTML={{ __html: this.props.text }}></div>
      </Fragment>
    );
  }
}

export default Accordian;
