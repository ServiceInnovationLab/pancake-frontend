import React from 'react';

export default class TextBoxWithAccordian extends React.Component {
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
    // put in helper
    processJson(json) {
      var object = JSON.parse(json)
      var output = {}
      //for every property you want
      // output[property] = object[property]
      return JSON.stringify(JSON.parse(json))
    }
  render() {
    var shown = {
			display: this.state.shown ? "block" : "none"
    };
    var hidden = {
			display: this.state.shown ? "none" : "block"
		}
    return (
      <fieldset className="radio-group">
        <legend>
          {this.props.label}
        </legend>
        {this.props.instructions && <p dangerouslySetInnerHTML={ { __html: this.props.instructions } }></p>}
    {!this.props.instructions && <p></p>}
        <input type="text" {...this.props.input} />
        {this.props.accordianText && <div>
          <div onClick={this.toggle.bind(this)} className="accordian">{this.props.accordianLabel}</div>
          <div style={ shown } dangerouslySetInnerHTML={ { __html: this.props.accordianText } }></div>
        </div>
        }
        {this.props.meta !== undefined && this.props.meta.touched && this.props.meta.error &&
        <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>
      }
      </fieldset>
    );
  }
}
