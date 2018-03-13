import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import TextField from '../Forms/TextField';
import RadioGroup from '../Forms/RadioGroup';
import CheckboxGroup from '../Forms/CheckboxGroup';
import firstTimeApplication from '../../JSONFormData/FirstTimeAppication';
import '../../styles/Button.css';

class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en'
    };
  }

  handleFieldType(type) {
    switch(type) {
    case 'radio':
      return RadioGroup;
    case 'checkbox':
      return CheckboxGroup;
    default:
      return TextField;
    }
  }

  handleLanguageChange(lang) {
    this.setState({lng: lang});
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">

        <div className="btn-group">
          <a onClick={()=>{this.handleLanguageChange('en');}} className={this.state.lng === 'en' ? 'btn active' : 'btn'}>English</a>
          <a onClick={()=>{this.handleLanguageChange('ma');}} className={this.state.lng === 'ma' ? 'btn active' : 'btn'}>Māori</a>
        </div>

        <h1>Apply for a Rebate</h1>

        <form name="wizard" onSubmit={handleSubmit}>
          {firstTimeApplication.map((field, key) => (
            <Field
              key={key}
              label={field.question}
              name={field.name}
              instructions={field.instructions}
              isRequired={true}
              component={this.handleFieldType(field.type)}
              options={field.options && field.options}
              lang={this.state.lng}
              id={field.name}
            />
          ))}

          <div>
            <button type="submit" className="next">
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Page2);
