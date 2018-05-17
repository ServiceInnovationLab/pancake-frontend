import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Accordian from '../../components/Forms/Accordian';
import {underscorize} from '../../helpers/strings';
import NumberField from '../Forms/NumberField';

/*
  TextBoxWithAccordian
  type can be specified in FirstTimeApplication.js if you require number field instead of text
*/

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
        {this.props.type === 'number' ?
          <NumberField {...this.props} value={prepopulatedValue ? prepopulatedValue : this.getValue()} />
          : 
          <input type="text" {...this.props.input} value={prepopulatedValue ? prepopulatedValue : this.getValue()} />
        }

        {this.props.instructions && <p dangerouslySetInnerHTML={{ __html: this.props.instructions }}></p>}
        {this.props.accordianText && <div>
          <Accordian label={this.props.accordianLabel} text={this.props.accordianText} />
        </div>
        }
        <ErrorMessage fields={this.props.meta} />
      </fieldset>
    );
  }
}
