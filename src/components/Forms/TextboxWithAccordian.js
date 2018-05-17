import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Accordian from '../../components/Forms/Accordian';
import {underscorize} from '../../helpers/strings';

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

  getValue() {
    if(this.props.input.name === this.props.values[this.props.input.name]) {
      return this.props.values['this.props.input.name'];
    }
    return this.props.input.value;

  }

  render() {
    let prepopulatedValue = this.props.prepopulatedValue ? this.props.prepopulatedValue[underscorize(this.props.label)] : null;
    return (
      <fieldset className="field">
        <legend>
          {this.props.label}
        </legend>
        <input type="text" {...this.props.input} value={prepopulatedValue ? prepopulatedValue : this.getValue()} />
        {this.props.instructions && <p dangerouslySetInnerHTML={{ __html: this.props.instructions }}></p>}
        <Accordian {...this.props} />
        <ErrorMessage fields={this.props.meta} />
      </fieldset>
    );
  }
}
