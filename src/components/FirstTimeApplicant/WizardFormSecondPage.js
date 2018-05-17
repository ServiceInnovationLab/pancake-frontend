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

class WizardFormSecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 2,
      shown: false,
      complete: false,
      complete_error: false,
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
      .bind(this);

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
    let fields = this.props.formState.form.wizard.values;
    fields['income'] = this.props.storeValues.totalIncome;
    let data = {
      "type": "rebate-forms",
      "attributes": {
        "valuation_id": fields.valuation_id,
        "fields": fields
      }
    };

    axios
      .post(`${config.API_ORIGIN}/api/v1/rebate_forms`, {data})
      .then(res => this.setState({complete: true}))
      .catch(err => this.setState({complete_error: true, complete: false}));

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
  render() {
    const {handleSubmit} = this.props;

    return (
      <Fragment>
        <div className="theme-main">
          <Head/>
          {this.renderAddress()}
          <form onSubmit={handleSubmit(this.saveFormData)}>
            {firstTimeApplication.map((field, key) => {
              let label = field.label['en'].text;
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
                      checkboxLabel={field.checkboxLabel && field.checkboxLabel['en'].text}
                      checkboxText={field.checkboxText && field.checkboxText['en'].text}
                      options={field.options && field.options['en'].text}
                      childInstructions={field.childInstructions && field.childInstructions['en'].text}
                      optionsText={field.optionsText && field.optionsText['en'].text}
                      textFieldLabel={field.textFieldLabel && field.textFieldLabel['en'].text}
                      placeholder={field.placeholder && field.placeholder['en'].text}
                      field_name={field.field_name && field.field_name}
                      childLabel={field.childLabel && field.childLabel['en'].text}
                      childFieldName={field.childFieldName && field.childFieldName}
                      childOptions={field.childOptions && field.childOptions['en'].text}
                      childType={field.childType && field.childType}
                      toggleByOption={field.toggleByOption && field.toggleByOption}
                      theme={field.theme && field.theme}
                      type={field.type && field.type}
                      />
                  </div>
                  </section>
                );
            })}

            <section className="container">
              <div>
                <Calculated
                  rates_bill={this.ratesBill()}
                  dependants={this.dependants()}
                  income={this.props.storeValues.totalIncome} />

                <Accordian
                  accordianLabel="It is an offence to knowingly make a false statement in your application"
                  accordianText="<p>You can find a list of the total amounts for Work and Income payments, including NZ Superannuation https://www.dia.govt.nz/diawebsite.nsf/Files/Benefit-Schedule-2016-17/$file/Benefit-Schedule-2016-17.pdf <br/><br/>You can get this from a few places, such as:<ul><li>Inland Revenue, by calling them on 0800 775 247 and asking for a Personal Tax Summary, or logging on to your MyIR account at IRD.govt.nz.</li><li>from Ministry of Social Development</li> <li>through your employer, accountant etc.</il></ul></p>"
                  />
              </div>
            <p>This will be applied to your rates account once your application has been fully proccessed.</p>
            </section>

            <Submit/>
            {this.state.complete && <Success/>}
            {this.state.complete_error && <Failed/>}

          </form>
        </div>
      </Fragment>
    );
  }
}

const Head = () => {
  let help_text = "<p>You can find a list of the total amounts for Work and Income payments, including NZ Superannuation <a href=\"https://www.dia.govt.nz/diawebsite.nsf/Files/Benefit-Schedule-2016-17/$file/Benefit-Schedule-2016-17.pdf\">here</a></p><p>You can get this from a few places, such as:<ul><li>Inland Revenue, by calling them on 0800 775 247 and asking for a Personal Tax Summary, or logging on to your MyIR account at IRD.govt.nz.</li><li>from Ministry of Social Development, </li> <li>through your employer, accountant etc.</il></ul></p>";
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
      <section>
        <h3 className="heading-secondary grey">Step One<br/>Mahi Tuatahi</h3>
        <p>You will need to know your total income for the 2016/2017 Tax year (1 April
          2016 - 31 March 2017). This includes rental income from any properties you own,
          interest and dividends, and overseas income (converted to $NZD). </p>
          <Accordian
            accordianLabel="Where can I get my income details?"
            accordianText={help_text} />

      </section>

      <section>
        <h3 className="heading-secondary grey">Step Two<br/>Mahi Tuarua</h3>
        <p>Fill out this form online and push the send button.
          This will send your application to your local council.</p>
      </section>

      <section>
        <h3 className="heading-secondary grey">Step Three<br/>Mahi Tuatoru</h3>
        <p>Visit the Tauranga City Council at 91 Willow Street and sign your application.<br/><br/>
        Proof of income may be requested, especially for those with income sources other than superannuation or work and income benefits. <br/><br/>If you are self-employed, you must supply evidence with your application. Evidence of income helps to ensure you receive the correct rebate promptly.</p>
      </section>

      <hr/>
      <h2 className="heading-secondary green">Step Two: Apply for a rates rebate<br/> <span>Mahi Tuarua: Tonoa te whakamāmā reiti</span></h2>
      <h3 className="heading-primary grey">This is for the 1 July 2017 - 30 June 2018 rating year</h3>
    </div>
  );
}

const Failed = () => {
  return (
    <Fragment>
      <h2>Something went wrong :(</h2>
      <p>Please contact us on 07 5777 000 at ratesrebates@tauranga.govt.nz</p>
    </Fragment>
  );
}
const Success = () => {
  return (
    <div>
      <h2 className="heading-secondary">Step Three: Get your application witnessed<br/> <span>Mahi Tuatoru: Mā te kaiwhakaatu e waitohu tō tono.</span> </h2>

      <h3>You are almost there!</h3>

      <h4>Your application form has been digitally sent to your local council.<br/> Now you need to visit the Tauranga Council at 91 Willow Street to finalise your rebate.</h4>

      <p>
        Proof of income may be requested, especially for those with income sources other than superannuation or work and income benefits. <br/><br/>If you are self-employed, you must supply evidence with your application. Evidence of income helps to ensure you receive the correct rebate promptly. <br/><br/>Tell the Service Centre staff you're there to sign your rates rebate application.
      </p>
      <a className="btn btn-primary">Find my nearest service centre</a>
    </div>
  );
}

class Calculated extends React.Component {

  render() {
    return (
      <Fragment>
        <p className="heading-paragraph">
          Based on a <strong>rates bill of ${this.props.rates_bill}
          </strong> and <strong> income of ${this.props.income}</strong> and <strong>{this.props.dependants} dependants</strong>.
        </p>
        <Rebate dependants={this.props.dependants}
                rates_bill={this.props.rates_bill}
                income={this.props.income} />
        <p>This will be applied to your rates account once your application has been
          fully proccessed.</p>
      </Fragment>
    );
  }
}
const Submit = () => {
  return (
    <div className="container layout">
      <button type="submit" className="next btn-primary">
        Send Application
      </button>
    </div>
  );
}

WizardFormSecondPage = reduxForm({
  form: 'wizard',
  onSubmitFail: (errors) => scrollToFirstError(errors)
})(WizardFormSecondPage)

WizardFormSecondPage = connect(state => {
  return {formState: state, validate, storeValues: state.reducers}
})(WizardFormSecondPage)

export default WizardFormSecondPage
