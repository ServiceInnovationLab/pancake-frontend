import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import TextField from '../Forms/TextField';
import RadioGroup from '../Forms/RadioGroup';
import CheckboxGroup from '../Forms/CheckboxGroup';
import firstTimeApplication from '../../JSONFormData/FirstTimeAppication';
import '../../styles/Button.css';

class Page1 extends React.Component {
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

        <h1>The Rates Rebate Scheme provides a discount to low-income homeowners on the cost of their rates.</h1>
        <p>If you have a low income and pay the rates on your home, you could get a rebate or reduction of up to $620.</p>

        <form name="wizard" onSubmit={handleSubmit}>

          <div>
            <h2>First time applicant?</h2>
            <button type="submit" className="next">
              Apply Now
            </button>

            {/* <h2>Received a rebate before?</h2>
            <button type="submit" className="next">
              Re-Apply Now
            </button> */}
          </div>

          <section className="speech-bubble">
            <h3>What is a Rates Rebate?</h3>
            <p>
              Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property. Anyone can receive a rebate for the property they live in, as long as they met the criteria.<br />
              <a className="external-link"><span>Learn more about Rates rebates.</span></a></p>
          </section>
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
})(Page1);
