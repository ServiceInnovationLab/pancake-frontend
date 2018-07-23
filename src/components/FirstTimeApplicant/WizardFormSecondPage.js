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
import RadioWithRadio from '../Forms/RadioWithRadio';
import TextField from '../Forms/TextField';
import IncomeListSection from '../Forms/IncomeListSection';
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
      stage: ''
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.saveFormData = this.saveFormData.bind(this);
    this.ratesBill = this.ratesBill.bind(this);
    this.dependants = this.dependants.bind(this);

  }

  componentDidMount() {
    window.scrollTo(0, 0)
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

  dependants() {
    return this.props.formState.form.wizard.values['dependants'];
  }
  ratesBill() {
    return this.props.formState.form.wizard.values['rates_bill'];
  }
  saveFormData() {
    console.log('saveform', this.props)
    let fields = this.props.formState.form.wizard.values;
    fields['income'] = this.props.storeValues.totalIncome;
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
        <section>
          <div className="container">
            <RadioWithRadio
              field_name='lived_here_before_july_2017'
              childFieldName='lived_other_owned_property'
              toggleByOption='No'
              label='Did you live here at 1 July 2017?'
              options={['yes', 'no']}
              optionsText={['', 'Were you living in another property that you owned on 1 July 2017, have sold that property, and moved to the address of the property you are currently living in during the the current rating year (1 July 2017-30 June 2018)?']}
              accordianLabel='What if I moved house during the rates year?'
              accordianText='Get in touch with your local council. There are some situations where you can still get a rebate on your previous home after you moved. They will ask you some details including: <ul><li>the settlement date</li><li>what rates you paid for the current year.</li></ul>'
              />
          </div>
        </section>
        <section className="theme-sand">
          <div className="container">
            <TextField
              field_name='full_name'
              label='What is your full name?'
              instructions='Your name must be on the title for the property you are applying for on the Rating Information Database (RID) at your local council.'
              accordianLabel='What if I live in a retirement village or company share flat/apartment?'
              accordianText='<p>If you are eligible for a rebate under the Rates Rebate (Retirement Village Residents) Amendment Act 2018 you will be able to apply for a rebate in the new rating year after 1 July 2018.</p><p>If the property you own is part of owner/occupier flats (often referred to as company share flats or apartments), you will need to fill in an additional declaration form and bring it with you when visiting the council.</a> This can be found <a href="https://www.dia.govt.nz/Pubforms.nsf/URL/OwnerOccupierDeclarationFormJuly2011.pdf/$file/OwnerOccupierDeclarationFormJuly2011.pdf">here</a></p>'
            />
          </div>
        </section>
        <section>
          <div className="container">
            {/* <TextField
              field_name='dependants'
              type='number'
              label='Do you have dependants?'
              instructions='Dependants are: <br/><ul><li>children you care and provide for under the age of 18 on 1 July 2017 and who at this time were not married and for whom you were not receiving payments under section 363 of the Children, Young Persons, and their Families Act 1989</li><li>relatives in receipt of a benefit (but not NZ Superannuation) on 1 July 2017.</li></ul>'
              options={['yes', 'no']}
              isRequired={true}
              textFieldLabel='label'
              placeholder='Enter the total amount'
              value={this.props.formState.form.wizard.values['dependants']}
            /> */}
            <fieldset className="field">
              <legend>Do you have dependants?</legend>
              <input
                name="dependants"
                type="number"
                min="0"
                step="1"
                value={this.props.formState.form.wizard.values['dependants']}
                readOnly
              />
              <div className="instructions">
                Dependants are: <br/>
                <ul>
                  <li>children you care and provide for under the age of 18 on 1 July 2017 and who at this time were not married and for whom you were not receiving payments under section 363 of the Children, Young Persons, and their Families Act 1989</li>
                  <li>relatives in receipt of a benefit (but not NZ Superannuation) on 1 July 2017.</li>
                </ul>
              </div>
              {/* // <ErrorMessage fields={this.props.meta} /> */}
            </fieldset>
          </div>
        </section>
        <section className="theme-sand">
          <div className="container">
            <IncomeListSection
              field_name='income_page_2'
              type='number'
              label='Were you living with a partner or joint home owner(s) on July 1 2017?'
              instructions="\'Partner\' is a person you are married to/in a civil union, or de facto relationship with."
              options={['yes', 'no']}
              isRequired={true}
            />
          </div>
        </section>

        <section>
          <div className="container">
            <RadioWithRadio
              field_name='has_home_business'
              toggleByOption='Yes'
              childFieldName='deducts_over_half_rates'
              label='Do you earn money from home or run a business from home?'
              instructionsSecondary="If yes, and you deducted over 50% of your rates as expenses, you may not be able to get a rebate. If your property is mainly used for commercial activities, for example farming or business, you cannot apply for a rates rebate."
              options={['yes', 'no']}
              optionsText={['', 'Did you deduct over 50% of your rates as expenses for the 2016/2017 tax year?']}
              placeholder='Enter the total amount'
            />
          </div>
        </section>

        <section className="theme-sand">
          <div className="container">
            <TextField
              field_name='email'
              label='What is your email address?'
              instructions="This email address will be used to send you a confirmation and instructions for this application. The phone number will be used to contact you if additional details are required."
            />
          </div>
        </section>

        <section>
          <div className="container">
            <TextField
              field_name='phone_number'
              checkboxFieldName='email_phone_can_be_used'
              checkboxLabel='Are you happy for the email address and/or phone number to be used for other Council communications?'
              label='What is your phone number?'
            />
          </div>
        </section>

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
    );
}

  render() {
    const {handleSubmit} = this.props;

    return (
      <Fragment>
        <div className="theme-main">
          <Head/>
            <form onSubmit={handleSubmit(this.saveFormData)}>
            {this.renderFields()}
            {this.state.complete && <Success/>}
            {this.state.complete_error && <Failed/>}
            {console.log(this.state)}

          </form>
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
      <h3 className="heading-primary grey">This is for the 1 July 2017 - 30 June 2018 rating year</h3>
    </div>
  );
}

const AllSteps  = () => {
  let help_text = "<p>You can get this from a few places, such as:<ul><li>Inland Revenue, by calling them on 0800 775 247 and asking for a Personal Tax Summary, or logging on to your MyIR account at IRD.govt.nz.</li><li>from Ministry of Social Development, </li> <li>through your employer, accountant etc.</il></ul></p><p>You can find a list of the total amounts for Work and Income payments, including NZ Superannuation <a href=\"https://www.dia.govt.nz/diawebsite.nsf/Files/Benefit-Schedule-2016-17/$file/Benefit-Schedule-2016-17.pdf\">here</a></p>";
  return (
    <Fragment>
      <section>
        <h3 className="heading-secondary grey">Step One<br/>Mahi Tuatahi</h3>
        <p>You will need to know your total income before tax for the 2016/2017 Tax year (1 April
          2016 - 31 March 2017). This includes rental income from any properties you own,
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
    <div className="container">
      <section>
        <h2 className="heading-secondary">Step Three: Get your application witnessed<br/> <span>Mahi Tuatoru: Mā te kaiwhakaatu e waitohu tō tono.</span> </h2>
      <h3>You are almost there!</h3>

      <h4>Your application form has been digitally sent to your local council.<br/> Now you need to visit the Tauranga Council at 91 Willow Street to finalise your rebate.</h4>

      <p>
        Proof of income may be requested for those with income sources other than superannuation or work and income benefits. <br/><br/>If you are self-employed, you must supply evidence with your application. Evidence of income helps to ensure you receive the correct rebate promptly. <br/><br/>Tell the Service Centre staff you're there to sign your rates rebate application.
      </p>
      </section>
    </div>
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
