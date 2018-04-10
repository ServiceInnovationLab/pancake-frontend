import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Accordian from '../../components/Forms/Accordian';

export default class TextBoxWithAccordian extends React.Component {
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
    return (
      <fieldset className="radio-group">
        <legend>
          {this.props.label}
        </legend>
        {this.props.instructions && <p dangerouslySetInnerHTML={ { __html: this.props.instructions } }></p>}
        {!this.props.instructions && <p></p>}
        <input type="text" {...this.props.input} />
        {this.props.accordianText && <div>
          <Accordian label={this.props.accordianLabel} text={this.props.accordianText} />
        </div>
        }
        <ErrorMessage fields={this.props.meta} />
      </fieldset>
    );
  }
}
