import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import validate from '../../helpers/validate';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import LanguageToggle from '../../components/Forms/LanguageToggle';
import {underscorize, camelCaser} from '../../helpers/strings';
import '../../styles/App.css';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import '../../styles/SignaturePad.css';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import axios from 'axios';
import config from '../../config';
import SignaturePad from 'react-signature-pad';

class Eligibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1,
      shown: false,
      signature: ''
    };
    this.nextPage = this
      .nextPage
      .bind(this);
    this.previousPage = this
      .previousPage
      .bind(this);
    this.saveFormData = this
      .saveFormData
      .bind(this)
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  }

  handleLanguageChange = lang => {
    this.setState({lng: lang});
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  saveFormData(values) {
    let data = {
      "type": "rebate-forms",
      "attributes": {
        "valuation_id": "123",
        "fields": values
      }
    };
    let signatures = {
      "signature_type_id": 1,
      "rebate_form_id": 1,
      "image": this.signaturePad.toDataURL()
    };

    // console.log(this.signaturePad.toDataURL())
    console.log(signatures)

    axios
      .post(`${config.API_ORIGIN}/api/v1/rebate_forms`, { data })
      .then(res => window.location.href = '#/page2')
      .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
    // axios
    //   .post(`${config.API_ORIGIN}/api/v1/signatures`, { signatures })
    //   .then(res => window.location.href = '#/page2')
    //   .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
  }


  render() {
    let signature_pad = document.querySelector('#signature-pad');
    console.log(signature_pad)
    let shown = {
      display: this.state.shown
        ? "block"
        : "none"
    };
    let lang = this.state.lng;
    const {handleSubmit} = this.props;
    return (
      <Fragment>
        <div className="container">
          <h1>If you are a low-income homeowner you could get a discount or partial refund of up to $620 on your property rates with a rates rebate.</h1>
          <h2>Find out if you could get a rebate</h2>
          <p>Enter your details here to check the eligibility before you apply</p>

          <div>
            I live at <span><input type="text" /></span><br/>
            My rates are <span>$2,222.45</span>
            I earn <span>$34,000</span> a year,
            and have <span>0</span> dependants.
          </div>

          <div>
            <h2>You are eligible for $620</h2>
            <p>Assuming you meet the criteria</p>
          </div>

          <div>
            <h2>What is a Rates Rebate?</h2>
            <p>Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.</p>
            <p>Any homeowner may receive a rebate for the property they live in, as long as they meet the criteria. This is calculated by your property rates, your income for the last tax year, and the number of dependants you have. If you have dependants, the upper threshold of your income can be $500 more for each dependant in your care. For example, if you have 2 children, the top limit of how much you could earn to be entitled to the full rebate would be $1000 more than someone with no dependants.</p>
          </div>

          <button className="btn-primary">Apply now</button>
        </div>
      </Fragment>
    );
  };
}

// SelectingFormValuesForm = reduxForm({
//   onSubmitFail: (errors) => scrollToFirstError(errors),
//   form: 'selectingFormValues'
// })(SelectingFormValuesForm);

// SelectingFormValuesForm = connect(state => {
//   return {
//     validate
//   };

// })(SelectingFormValuesForm);

export default Eligibility;
