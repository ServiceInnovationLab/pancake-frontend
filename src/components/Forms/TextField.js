import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Accordian from '../../components/Forms/Accordian';
import NumberField from '../Forms/NumberField';

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown,
    });
  }

  getValue() {
    if (this.props.input) {
      if (this.props.input.name === this.props.values[this.props.input.name]) {
        return this.props.values['this.props.input.name'];
      }
      return this.props.input.value;
    } else {
      return this.props.value;
    }
  }

  render() {
    const showValue = this.getValue();
    return (
      <fieldset className="field">
        <legend>{this.props.label}</legend>
        {this.props.type === 'number' ? <NumberField {...this.props} value={showValue} /> : <input type="text" {...this.props.input} value={showValue} />}
        {this.props.instructions && <p className="instructions" dangerouslySetInnerHTML={{ __html: this.props.instructions }}></p>}
        {this.props.checkboxFieldName &&
          <Checkbox label={this.props.checkboxLabel} name={this.props.checkboxFieldName} />}
        {this.props.accordianText && <div><Accordian label={this.props.accordianLabel} text={this.props.accordianText} /></div>}
        <ErrorMessage fields={this.props.meta} />
      </fieldset>
    );
  }
}

const Checkbox = props => {
  return <div className="checkbox-group">
    <div>
      <div className="checkboxes">
        <label>
          <input type="checkbox" {...props.input} />
          <span>{props.label}</span>
        </label>
      </div>
    </div>
  </div>;
};
