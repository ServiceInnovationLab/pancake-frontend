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

            <h3>Applicant Signature</h3>
            <SignaturePad clearButton="true" ref={ref => this.signaturePad = ref}/>
            <h3>Witness Signature</h3>
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
