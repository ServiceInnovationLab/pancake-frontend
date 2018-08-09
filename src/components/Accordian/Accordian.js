import React from 'react';

class Accordian extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      showBody: false
    };
  }

  toggle() {
    this.setState({showBody: !this.state.showBody});
  }

  render() {
    return (
      <div className="accordian">
        <div
          className="accordian-header"
          onClick={e =>this.toggle(e)}
        >{this.props.header}</div>

        {this.state.showBody &&
          <div
            className="accordian-body"
            dangerouslySetInnerHTML={{__html: this.props.body}}
          ></div>}
      </div>
    );
  }
}


export default Accordian;
