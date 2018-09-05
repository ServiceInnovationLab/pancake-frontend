import React from 'react';
import ErrorMessage from "./Error";
import Accordian from "./Accordian";
import Radio from "./Radio";

export default class RadioWithRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      sub: false
    };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  render() {
    return (
      <div>
        <fieldset className="field radio-group">
          {this.props.label && <legend>
            {this.props.label}
          </legend>}
          <div>
            <Radio {...this.props} fieldType="radio" />
          </div>
          {this.props.instructions && <p dangerouslySetInnerHTML={{ __html: this.props.instructions }}></p>}
          {this.props.accordianLabel && <Accordian label={this.props.accordianLabel} text={this.props.accordianText} />}
          <ErrorMessage fields={this.props.meta} />
        </fieldset>
      </div>
    );
  }
}
