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
        <div className="accordian" style={this.props.accordianText ? {display: 'block'} : {display: 'none'}}>
          <div className="accordian-header" onClick={this.toggle.bind(this)} dangerouslySetInnerHTML={{ __html: this.props.accordianLabel }}></div>
          <div className="accordian-body" style={shown} dangerouslySetInnerHTML={{ __html: this.props.accordianText }}></div>
        </div>
      </Fragment>
    );
  }
}

export default Accordian;
