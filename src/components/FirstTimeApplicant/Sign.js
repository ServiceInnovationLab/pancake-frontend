import React, {Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import validate from '../../helpers/validate'
import {underscorize, removeUnderscore} from '../../helpers/strings';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import axios from 'axios';
import config from '../../config';
import SignaturePad from 'react-signature-pad';
import Accordian from '../Forms/Accordian';

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
    this.getData();
  }

  getData = () => {
    // set state for fields and display data
    axios
      .get(`${config.API_ORIGIN}/api/v1/rebate_forms/${this.props.match.params.id}`)
      .then(res => this.setState({fields: res.data.data.attributes.fields}))
      .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
  }

  submitApplicant = () => {
    const applicant_sig = this
      .signaturePad
      .toDataURL();
    let data = this.getPayload(applicant_sig, 'applicant');
    this.postSignature(data);
    this.submitWitness();
  }

  submitWitness = () => {
    const witness_sig = this
      .signaturePad2
      .toDataURL();
    let data = this.getPayload(witness_sig, 'witness');
    this.postSignature(data);
    this.setState({complete: true});
  }

  postSignature = data => {
    axios
      .post(`${config.API_ORIGIN}/api/v1/signatures`, {data})
      .then(res => res)
      .catch(err => console.log('Error occurred: Check origin has been enabled correctly on the server', err));
  }

  getDate = () => {
    let currentdate = new Date();
    return (currentdate.getMonth() + 1)
  }
  getPayload = (signature, type) => {
    return {
      "type": "signaturess",
      "attributes": {
        "valuation_id": "123",
        "token": this.props.match.params.id,
        "type": type,
        "image": signature.split(',')[1]
      }
    };
  }
  render() {
    const {handleSubmit, formState} = this.props
    return (
      <Fragment>
        <div className="container">
          <h2>Sign here</h2>
          {delete this.state.fields['i_earn']}
          {delete this.state.fields['my_rates']}

          {Object
            .keys(this.state.fields)
            .map(item => {
              return <div style={{
                marginBottom: '50px'
              }}>
                <h3>{removeUnderscore(item)}?</h3>
                <p>{this.state.fields[item]}</p>
              </div>
            })}

          <form
            onSubmit={handleSubmit(this.submitApplicant)}
            className="container form-inner">
            <Accordian
              label="It is an offence to knowingly make a false statement in your application"
              text="Section 14 of the Rates Rebate Act 1973<br/>14. Offences <ul><li>(1) Every person commits an offence who
              for the purpose of obtaining any rates rebate under this Act, for himself or for any other person, makes any statement or declaration knowing it to be false in any particular, or wilfully misleads or attempts to mislead any person concerned in the administration of this Act or any other person whatsoever; or </li><li>(b) refuses or fails to comply with any requirement under section 11, or refuses or fails to answer any question put to him pursuant to that section, or knowingly gives any false or misleading answer to any such question.</li><li>(2) Every person who commits an offence against this Act is liable on conviction before a District Court Judge to imprisonment for a term not
              exceeding 12 months or to a fine not exceeding $500, or to both.</li></ul>"
            />
            <h3 style={{marginTop: '80px'}}>Applicant</h3>
            <p>I <b>{this.state.fields['what_is_your_full_name']}</b> of <b>{this.state.fields['what_is_your_address']}</b>, solemnly and sincerely
              declare that I believe the information I have given on this form is true and
              correct, and I make this solemn declaration conscientiously believing the same
              to be true and by virtue of the Oaths and Declarations Act 1957.
            </p>
            <SignaturePad clearButton="true" ref={ref => this.signaturePad = ref}/>
            <h3>Witness</h3>
            <p>Declared at {new Date().toLocaleString()} before me [Insert name of witness]</p>
            <SignaturePad clearButton="true" ref={ref => this.signaturePad2 = ref}/>
            <Submit/> {this.state.complete && <Foot/>}
          </form>
        </div>
      </Fragment>
    )
  }
}

const Submit = () => {
  return (
    <div>
      <button type="submit" className="next btn-primary">
        Submit Signatures
      </button>
    </div>
  );
}

const Foot = () => {
  return (
    <div>
      <h2 className="heading-secondary">Signatures Accepted</h2>
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
