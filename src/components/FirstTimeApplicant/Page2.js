import React from 'react';
import { reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import TextField from '../Forms/TextField';
import RadioGroup from '../Forms/RadioGroup';
import CheckboxGroup from '../Forms/CheckboxGroup';

class Page2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleFieldType = type => {
    switch(type) {
    case 'radio':
      return RadioGroup;
    case 'checkbox':
      return CheckboxGroup;
    default:
      return TextField;
    }
  }
  
  handleLanguageChange = lang => {
    this.setState({lng: lang});
  }

  render() {
    return(
      <div className="container">

        <div className="btn-group">
          <a onClick={()=>{this.handleLanguageChange('en');}} className={this.state.lng === 'en' ? 'btn active' : 'btn'}>English</a>
          <a onClick={()=>{this.handleLanguageChange('ma');}} className={this.state.lng === 'ma' ? 'btn active' : 'btn'}>Māori</a>
        </div>

        <h1>Your application has been sent</h1>

        <h2>What to do next</h2>

        <p>Visit the Mt Maunganui Library during opening hours and let the staff at the service desk know you are there to sign your rates rebates form.</p>

        <p>Bring some photo ID, such as a drivers licence or passport, to prove who you are.</p>

        <p>Once you have signed the form, your local rates team will process your application and be in touch to let you know if your application was succesful.</p>
        <p>Your application has been sent to the email address you gave us, and you can download it here too</p>

        <a href="download">Download my application</a>

        <h2>If you can't make it to the service centre</h2>

        <p>You can get a Justice of the Peace to witness you signing the form, and get someone else to drop it to the service centre for you, or send it by post.</p>

        <h2>Mt Maunganui Library</h2>
        <dl>
          <dt>Address:</dt>
          <dd>398 Maunganui Rd,<br/>Mount Maunganui, Tauranga 3116</dd>
          <dt>Hours:</dt>
          <dd>Mon-Fri 9am-5pm<br />Saturday 9:30am-4pm<br />Sunday Closed</dd>
          <dt>Phone</dt>
          <dd>07-577 7177</dd>

        </dl>
      </div>
    )
  }
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Page2);
