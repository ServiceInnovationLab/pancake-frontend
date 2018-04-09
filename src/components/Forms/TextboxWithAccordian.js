import React from 'react';
import ErrorMessage from '../../components/Forms/Error';

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
    let shown = {
      display: this.state.shown ? 'block' : 'none'
    };
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
        <ErrorMessage fields={this.props.meta} />
      </fieldset>
    );
  }
}
