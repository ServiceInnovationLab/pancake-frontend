import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import TextField from '../Forms/TextField';
import RadioGroup from '../Forms/RadioGroup';
import CheckboxGroup from '../Forms/CheckboxGroup';
import firstTimeApplication from '../../JSONFormData/FirstTimeAppication';

class Page1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: 'en'
    }
  }

  onLanguageChanged(lng) {
    this.setState({
      lng: lng
    })
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
    this.setState({lng: lang})
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form name="wizard" onSubmit={handleSubmit} className="container">
          <h1>Apply for a Rebate</h1>
          <button onClick={()=>{this.handleLanguageChange('en')}}>English</button>
          <button onClick={()=>{this.handleLanguageChange('ma')}}>Māori</button>
          {firstTimeApplication.map((field, key) => (
            <Field
              key={key}
              label={ field.question }
              name={field.name}
              instructions={field.instructions}
              isRequired={true}
              component={this.handleFieldType(field.type)}
              options={field.options && field.options}
              lang={this.state.lng}
            />
          ))}
          
          <div>
            <button type="submit" className="next">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Page1);
