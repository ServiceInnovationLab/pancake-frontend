import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues} from 'redux-form'
import validate from '../../helpers/validate'
import renderField from './renderField'
import {underscorize, camelCaser} from '../../helpers/strings';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import axios from 'axios';
import config from '../../config';
import SignaturePad from 'react-signature-pad';
import FormValues from "./FormValues";
const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

  class WizardFormSecondPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lng: 'en',
        page: 2,
        shown: false,
        complete: false,
        signature: '',
        stage: ''
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
      
        console.log(1, validate(e=>e.values))
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

    saveFormData(values) {
      this.setState({complete: true})
      let data = {
        "type": "rebate-forms",
        "attributes": {
          "valuation_id": "123",
          "fields": values
        }
      };
      // return 1;

      // console.log('on second', values)


      // let signatures = {
      //   "signature_type_id": 1,
      //   "rebate_form_id": 1,
      //   "image": this.signaturePad.toDataURL()
      // };
  
      // // console.log(this.signaturePad.toDataURL())
      // console.log(signatures)
  
      axios
        .post(`${config.API_ORIGIN}/api/v1/rebate_forms`, { data })
        .then(res => res)
        .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
      // axios
      //   .post(`${config.API_ORIGIN}/api/v1/signatures`, { signatures })
      //   .then(res => window.location.href = '#/page2')
      //   .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
    }
    
    render() {
      const {handleSubmit} = this.props;
      return (
        <Fragment>
          <div className="container">
            <a className="previous" onClick={this.previousPage} style={{'color': '#aaa', 'marginTop': '15px','marginBottom': '60px', 'display': 'inline-block'}}>
            &larr; Home
            </a>
            <h2 className="heading-secondary green">What you will need to do to apply for a rebate</h2>
            
            <section>
              <h3 className="heading-secondary grey">Step 1</h3>
              <p>You will need to know your total income for the 2016/2017 Tax year (1 March 2016 - 31 March 2017). This includes rental income from any properties you own, interest and dividends, and overseas income (converted to $NZD).</p>
              <p>You can get this from a few places, such as Inland Revenue, by calling them on 0800 775 247 or logging on to your MyIR account at IRD.govt.nz, from Ministry of Social Development, through your employer, accountant etc. </p>
            </section>

            <section>
              <h3 className="heading-secondary grey">Step 2</h3>
              <p>Fill out this form and submit it</p>
            </section>

            <section>
              <h3 className="heading-secondary grey">Step 3</h3>
              <p>Make a declaration in front of an authorised witness (you can do this by visiting your local council). All you need to bring with you is your proof of income.</p>
            </section>

            <hr />

            <h2 className="heading-secondary green">Step 2: Apply for a rates rebate</h2>
            <h3 className="heading-secondary grey">This is for the 1 July 2017 - 30 June 2018 rating year</h3>
            {/* {console.log('test', this.props.store)} */}
            {/* {console.log(handleSubmit(value=>{console.log(value)}))} */}
            <form className="container form-inner">
            {/* {console.log(FetchValues)} */}
              {firstTimeApplication.map((field, key) => {
                let label = field.label['en'].text;
                return (<Field
                  key={key}
                  label={label}
                  name={field.isNested ? `has${camelCaser(label)}Checked` : underscorize(field.label['en'].text)}
                  component={field.component}
                  instructions={field.instructions && field.instructions['en'].text}
                  instructionsSecondary={field.instructionsSecondary && field.instructionsSecondary['en'].text}
                  // hasValue={this.props[`has${camelCaser(label)}Value`]}
                  accordianLabel={field.accordianLabel && field.accordianLabel['en'].text}
                  accordianText={field.accordianText && field.accordianText['en'].text}
                  checkboxLabel={field.checkboxLabel && field.checkboxLabel['en'].text}
                  checkboxText={field.checkboxText && field.checkboxText['en'].text}
                  options={field.options && field.options['en'].text}
                  optionsText={field.optionsText && field.optionsText['en'].text}
                  textFieldLabel={field.textFieldLabel && field.textFieldLabel['en'].text}
                  placeholder={field.placeholder && field.placeholder['en'].text}
                  hasAddressFinder={field.hasAddressFinder}/>);
              })}
              
              <h2>We have calculated that your entitlement is $620</h2>
              <p>This will be applied to your rates account once your application has been fully proccessed.</p>
              <div>
              <button type="submit" className="next btn-primary">
                Submit Application
              </button>
            </div>
            {this.state.complete && 
            <div>
            <h2 className="heading-secondary">Step 3: Get your application witnessed</h2>

            <h3>You are almost there!</h3>

            <h4>Your application form has been digitally sent to your local council - now you have to have your signed declaration witnessed for your rebate to be processed.</h4>

            <p>To do this you can visit one of your local council’s service centres during opening hours and let the staff at the service desk know you are there to sign your rates rebates application.</p>

            <p>The only thing you need to bring with you is your proof of income.</p>

            <p>A copy of your answers to the application has been sent to your email, so if you can't make it to the service centre, you can print out a copy of your application and get your declaration witnessed and signed by an authorised witness such as a JP or Minister for Religion.</p>
            
            <a className="btn btn-primary">Find my nearest service centre</a>
              </div>}
            </form>
          </div>
        </Fragment>
      )
    }
  }

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormSecondPage)

