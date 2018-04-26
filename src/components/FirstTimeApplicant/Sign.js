import React, { Fragment } from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import validate from '../../helpers/validate'
import {underscorize, camelCaser} from '../../helpers/strings';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import axios from 'axios';
import config from '../../config';
import SignaturePad from 'react-signature-pad';

  class Sign extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lng: 'en',
        page: 2,
        shown: false,
        complete: false,
        signature: '',
        stage: '',
        fields: []
      };
      this.nextPage = this
        .nextPage
        .bind(this);
      this.previousPage = this
        .previousPage
        .bind(this);
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

    componentDidMount() {
     this.getData()
    }
    getData = () => {
      // set state for fields and display data
      axios
        .get(`${config.API_ORIGIN}/api/v1/rebate_forms/${this.props.match.params.id}`)
        .then(res => this.setState({fields: res.data.data.attributes.fields}))
        .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
    }
    submitApplicant = () => {
      const applicant_sig = this.signaturePad.toDataURL();
      let data = {
          "type": "signaturess",
          "attributes": {
            "valuation_id": "123",
            "token": this.props.match.params.id,
            "type": "applicant",
            "image": applicant_sig.split(',')[1]
          }
      };

      axios
        .post(`${config.API_ORIGIN}/api/v1/signatures`, { data })
        .then(res => res)
        .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
      
        this.submitWitness()
    }
    submitWitness = () => {
      const witness_sig = this.signaturePad2.toDataURL();

      let data = {
          "type": "signaturess",
          "attributes": {
            "valuation_id": "123",
            "token": this.props.match.params.id,
            "type": "witness",
            "image": witness_sig.split(',')[1]
          }
      };

      axios
        .post(`${config.API_ORIGIN}/api/v1/signatures`, { data })
        .then(res => res)
        .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));

      this.setState({complete: true});
    }

    render() {
      const {
        handleSubmit,
        formState
      } = this.props
      return (
        <Fragment>
          <div className="container">
          <h2>Sign here</h2>
          {delete this.state.fields['i_earn']}
          {delete this.state.fields['my_rates']}
          
          {Object.keys(this.state.fields).map(item => {
            return <div style={{marginBottom: '50px'}}>
              <h3>{item.charAt(0).toUpperCase() + item.slice(1).split('_').join(' ')}?</h3>
              <p>{this.state.fields[item]}</p>
            </div>
          })}

            {/* <a onClick={()=>{window.location.reload()}} style={{'color': '#aaa', 'marginTop': '15px','marginBottom': '60px', 'display': 'inline-block'}}>
            &larr; Home
            </a>
            <Head/> */}
            {/* <form className="container form-inner"> */}
            <form onSubmit={handleSubmit(this.submitApplicant)} className="container form-inner">
              {/* {firstTimeApplication.map((field, key) => {
                let label = field.label['en'].text;
                let name = underscorize(field.label['en'].text);
                let form_values = '';
                return (<Field
                  prepopulatedValue={this.state.fields}
                  key={key}
                  label={label}
                  address={formState.address}
                  name={field.isNested ? `has${camelCaser(label)}Checked` : underscorize(field.label['en'].text)}
                  component={field.component}
                  instructions={field.instructions && field.instructions['en'].text}
                  instructionsSecondary={field.instructionsSecondary && field.instructionsSecondary['en'].text}
                  values={form_values && form_values}
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
              <Calculated/> */}
              <h3>Applicant Signature</h3>
              <SignaturePad
                clearButton="true"
                ref={ref => this.signaturePad = ref}
              />
              <h3>Witness Signature</h3>
              <SignaturePad
                clearButton="true"
                ref={ref => this.signaturePad2 = ref}
              />
              <Submit/>
              {this.state.complete && <Foot/>}
            </form>
          </div>
        </Fragment>
      )
    }
  }

const Head = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
}

const Foot = () => {
  return (
    <div>
      <h2 className="heading-secondary">Signatures Accepted</h2>
    </div>
  );
}

const Calculated = () => {
  return (
    <Fragment>
      <h2>We have calculated that your entitlement is $620</h2>
      <p>This will be applied to your rates account once your application has been fully proccessed.</p>
    </Fragment>
  );
}
const Submit = () => {
  return (
    <div>
      <button type="submit" className="next btn-primary">
        Submit Application
      </button>
    </div>
  );
}

Sign = reduxForm({
  form: 'wizard',
  // onSubmitFail: (errors) => scrollToFirstError(errors),
})(Sign)


Sign = connect(state => {
return {
    formState: state,
    // validate
  }
})(Sign)

export default Sign
