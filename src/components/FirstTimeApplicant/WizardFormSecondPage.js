import React, {Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import validate from '../../helpers/validate'
import {camelCaser} from '../../helpers/strings';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import Accordian from '../Forms/Accordian';
import axios from 'axios';
import config from '../../config';
import Rebate from '../widgets/Rebate';

import Modal from 'react-modal';

import RadioWithRadio from '../../components/Forms/RadioWithRadio';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0',
    borderRadius          : '14px',
    border                : 'none',
    background            : 'rgb(238,238,238)',
    width                 : '80%'
  }
};


class WizardFormSecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 2,
      shown: false,
      complete: false,
      complete_error: false,
      sending: false,
      signature: '',
      stage: '',
      hasLivedHere: '',
      showModal: false,
      modalIsOpen: true
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.saveFormData = this.saveFormData.bind(this);
    this.ratesBill = this.ratesBill.bind(this);
    this.dependants = this.dependants.bind(this);
    this.handleLivingSituation = this.handleLivingSituation.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.prop !== nextProps || this.state !== nextState;
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

  handleLivingSituation(e) {
    this.setState({
      hasLivedHere: e.target.value,
      showModal: true
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //heading
    this.heading.style.color = '#fff';
    this.heading.style.margin = '0';
    this.heading.style.fontSize = '43px';

    this.subtitle.style.color = '#fff';
    this.subtitle.style.fontSize = '30px';


  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  dependants() {
    return this.props.formState.form.wizard.values['dependants'];
  }
  ratesBill() {
    return this.props.formState.form.wizard.values['rates_bill'];
  }
  saveFormData() {
    let fields = this.props.formState.form.wizard.values;
    fields['income'] = this.props.storeValues.totalIncome;
    fields['lived_with_partner'] = this.props.storeValues.partnerStatus;
    delete fields['address'];

    let data = {
      "type": "rebate-forms",
      "attributes": {
        "valuation_id": fields.valuation_id,
        "fields": fields
      }
    };

    this.setState({sending: true});
    axios
      .post(`${config.API_ORIGIN}/api/v1/rebate_forms`, {data})
      .then(res => this.setState({complete: true, sending: false}))
      .catch(err => this.setState({complete_error: true, complete: false, sending: false}));
  }

  goHome() {
    return window.location = '#/';
  }

  renderAddress(){
    return (
      <section>
        <div className="container">
          <h4>Your address is</h4>
          {this.props.formState.form.wizard.values['address']}
        </div>
      </section>
      );
  }

  renderFields() {
    if (this.state.complete) return '';

    return (
      <Fragment>
        {this.renderAddress()}

        <div className="container">
          <Field
            name='lived_here_before_july_2018'
            label="Did you live here at 1 July 2018?"
            component={RadioWithRadio}
            field_name='lived_here_before_july_2018'
            childFieldName='lived_other_owned_property'
            toggleByOption='No'
            options={["yes", "no"]}
            optionsText={["", "Were you living in another property that you owned on 1 July 2018, have sold that property, and moved to the address of the property you are currently living in during the the current rating year (1 July 2018-30 June 2019)?"]}
            accordianLabel={"What if I moved house during the rates year?"}
            accordianText={"Get in touch with your local council. There are some situations where you can still get a rebate on your previous home after you moved. They will ask you some details including: <ul><li>the settlement date</li><li>what rates you paid for the current year.</li></ul>"}
            handleLivingSituation={this.handleLivingSituation}
          />
          {this.state.hasLivedHere === 'no' &&
            <div style={{position: 'relative'}}>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
              <div className="modal-header" style={{background: 'rgb(255, 83, 83)', padding: '40px 40px 15px'}}>
                <h2 ref={heading => this.heading = heading}>Sorry</h2>
                <p ref={subtitle => this.subtitle = subtitle}>Based on what you've just told us, you are not eligible for a Rates Rebate this year</p>
              </div>
              <div className="modal-body" style={{padding: '15px 40px'}}>
                <p style={{fontSize: '24px'}}>You must have been living at the property on 1 July 2018 to be eligible for a rates rebate for this rating year.</p>
              </div>
                <span onClick={this.closeModal} style={{
                  position: 'absolute',
                  top: '8px',
                  right: '13px',
                  color: 'white',
                  fontSize: '30px',
                  fontWeight: 'bold'
                }}>X</span>
              </Modal>
            </div>
          }
        </div>
        {this.state.hasLivedHere === 'yes' && firstTimeApplication.map((field, key) => {
          let label = field.label && field.label['en'].text;
          let name = field.isNested ? `has${camelCaser(label)}Checked` : field.field_name;
          let form_values = '';
          return (
            <section className={field.theme} key={key}>
              <div className="container">
                <Field
                  label={label}
                  name={name}
                  component={field.component}
                  instructions={field.instructions && field.instructions['en'].text}
                  values={form_values && form_values}
                  accordianLabel={field.accordianLabel && field.accordianLabel['en'].text}
                  accordianText={field.accordianText && field.accordianText['en'].text}
                  checkboxText={field.checkboxText && field.checkboxText['en'].text}
                  options={field.options && field.options['en'].text}
                  childInstructions={field.childInstructions && field.childInstructions['en'].text}
                  optionsText={field.optionsText && field.optionsText['en'].text}
                  textFieldLabel={field.textFieldLabel && field.textFieldLabel['en'].text}
                  placeholder={field.placeholder && field.placeholder['en'].text}
                  field_name={field.field_name && field.field_name}
                  childLabel={field.childLabel && field.childLabel['en'].text}
                  childOptions={field.childOptions && field.childOptions['en'].text}
                  childType={field.childType && field.childType}
                  theme={field.theme && field.theme}
                  type={field.type && field.type}
                  checkboxFieldName={field.checkboxFieldName && field.checkboxFieldName}
                  checkboxLabel={field.checkboxLabel && field.checkboxLabel['en'].text}
                />
              </div>
            </section>
          );
        })}
        {this.state.hasLivedHere === 'yes' &&
          <Fragment>
            <section className="container">
              <div>
                <Calculated
                  rates_bill={this.ratesBill()}
                  dependants={this.dependants()}
                  income={this.props.storeValues.totalIncome} />

                <Accordian
                  label="It is an offence to knowingly make a false statement in your application"
                  text="<p>You can find a list of the total amounts for Work and Income payments, including NZ Superannuation https://www.dia.govt.nz/diawebsite.nsf/Files/Benefit-Schedule-2016-17/$file/Benefit-Schedule-2016-17.pdf <br/><br/>You can get this from a few places, such as:<ul><li>Inland Revenue, by calling them on 0800 775 247 and asking for a Personal Tax Summary, or logging on to your MyIR account at IRD.govt.nz.</li><li>from Ministry of Social Development</li> <li>through your employer, accountant etc.</il></ul></p>"
                  />
              </div>
            <p>This will be applied to your rates account once your application has been fully proccessed.</p>
            </section>

            <Submit sending={this.state.sending} />
          </Fragment>
        }
      </Fragment>
    );
}

  render() {
    const {handleSubmit} = this.props;

    return (
      <Fragment>
        <div className="theme-main">
          <Head/>
          <div id="jumpTo" className="jumpTo">
            <form onSubmit={handleSubmit(this.saveFormData)}>
            <input type="hidden" name="lived_with_partner" value="no" />
            {this.renderFields()}
            {this.state.complete && <Success/>}
            {this.state.complete && document.getElementById('jumpTo').scrollIntoView()}
            {this.state.complete_error && <Failed/>}

            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const Head = () => {
  return (
    <div className="container">
      <a
        onClick={() => {
        window
          .location
          .reload()
        }}
        style={{
        'color': '#aaa',
        'marginTop': '15px',
        'marginBottom': '60px',
        'display': 'inline-block'
      }}><span className="arrow left"></span>Home</a>
      <h2 className="heading-secondary green">What you will need to do to apply for a rebate <br/><span>He aha ngā mahi e tonoa ai te whakamāmā reiti</span></h2>

      <AllSteps />

      <hr/>
      <h2 className="heading-secondary green">Step Two: Apply for a rates rebate<br/> <span>Mahi Tuarua: Tonoa te whakamāmā reiti</span></h2>
      <h3 className="heading-primary grey">This is for the 1 July 2018 - 30 June 2019 rating year</h3>
    </div>
  );
}

const AllSteps  = () => {
  let help_text = "<p>You can get this from a few places, such as:<ul><li>Inland Revenue, by calling them on 0800 775 247 and asking for a Personal Tax Summary, or logging on to your MyIR account at IRD.govt.nz.</li><li>from Ministry of Social Development, </li> <li>through your employer, accountant etc.</il></ul></p><p>You can find a list of the total amounts for Work and Income payments, including NZ Superannuation <a href=\"https://www.dia.govt.nz/diawebsite.nsf/Files/Benefit-Schedule-2016-17/$file/Benefit-Schedule-2016-17.pdf\">here</a></p>";
  return (
    <Fragment>
      <section>
        <h3 className="heading-secondary grey">Step One<br/>Mahi Tuatahi</h3>
        <p>You will need to know your total income before tax for the 2017/2018 Tax year (1 April
          2017 - 31 March 2018). This includes rental income from any properties you own,
          interest and dividends, and overseas income (converted to $NZD). </p>
        <Accordian
          label="Where can I get my income details?"
          text={help_text} />

      </section>

      <section>
        <h3 className="heading-secondary grey">Step Two<br/>Mahi Tuarua</h3>
        <p>Fill out this form online and push the send button.
          This will send your application to your local council.</p>
      </section>

      <section>
        <h3 className="heading-secondary grey">Step Three<br/>Mahi Tuatoru</h3>
        <p>Visit the Tauranga City Council at 91 Willow Street and sign your application.<br/><br/>
        Proof of income may be requested for those with income sources other than superannuation or work and income benefits. <br/><br/>If you are self-employed, you must supply evidence with your application. Evidence of income helps to ensure you receive the correct rebate promptly.</p>
      </section>
    </Fragment>
  );
}

const Failed = () => {
  return (
    <div className="container">
      <section>
      <h2>Something went wrong :(</h2>
      <p>Please contact us on 07 5777 000 or ratesrebates@tauranga.govt.nz</p>
      </section>
    </div>
  );
}

const Success = () => {
  return (
    <Fragment>
      <div className="container">
        <section>
          <h2 className="heading-secondary">Step Three: Get your application witnessed<br/> <span>Mahi Tuatoru: Mā te kaiwhakaatu e waitohu tō tono.</span> </h2>
        <h3>You are almost there!</h3>

        <h4>Your application form has been digitally sent to your local council.<br/> Now you need to visit the Tauranga Council at 91 Willow Street to finalise your rebate.</h4>

        <p>
          Proof of income may be requested for those with income sources other than superannuation or work and income benefits.
          <br/>
          <br/>
          If you are self-employed, you must supply evidence with your application. Evidence of income helps to ensure you receive the correct rebate promptly.
          <br/>
          <br/>
          If you are a retirement village resident, you will need to get your operator to provide a Rates Rebate declaration certificate Resident of a retirement village unit form.
          <br />
          <br />
          Tell the Service Centre staff you're there to sign your rates rebate application.
        </p>
        </section>
      </div>
    </Fragment>
  );
}

class Calculated extends React.Component {

  render() {
    return (
      <Fragment>
        <p className="heading-paragraph">
          Based on a <strong>rates bill of ${this.props.rates_bill}
          </strong> and <strong> income of ${this.props.income.toFixed(2)}
          </strong> and <strong>{this.props.dependants} dependants</strong>.
        </p>
        <Rebate dependants={this.props.dependants}
                rates_bill={this.props.rates_bill}
                income={this.props.income} />
        <p>This will be applied to your rates account once your application has been
          fully processed.</p>
      </Fragment>
    );
  }
}

class Submit extends React.Component {
  render() {
    if (this.props.sending) {
      return (
        <div className="container layout">
          Sending....
        </div>
      );
    }
    return (
      <div className="container layout">
        <button type="submit" className="next btn-primary">
          Send Application
        </button>
      </div>
    );
  }
}




WizardFormSecondPage = reduxForm({
  form: 'wizard',
  onSubmitFail: (errors) => scrollToFirstError(errors)
})(WizardFormSecondPage)

WizardFormSecondPage = connect(state => {
  return {formState: state, validate, storeValues: state.reducers}
})(WizardFormSecondPage)

export default WizardFormSecondPage
