import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Radio from '../../components/Forms/Radio';

export default class RadioWithTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showYes: false };
  }

  toggle(item) {
    this.setState({showYes: item === 'yes' ? true : false});
  }

  render() {

    return (
      <div>
        <fieldset className="radio-group">
          {this.props.label && <legend>
            {this.props.label}
          </legend>}
          {this.props.instructions && <p>{this.props.instructions}</p>}
          {!this.props.instructions && <p></p>}
          <div>
            <Radio props={this.props} fieldType="text" />
          </div>
          <ErrorMessage fields={this.props.meta} />
        </fieldset>
      </div>
    );
  }
}
