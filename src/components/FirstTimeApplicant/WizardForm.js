import React, { Fragment, Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
// import WizardFormSecondPage from './WizardFormSecondPage';
import StepZilla from 'react-stepzilla';

import Radios from '../Forms/Radio';
import RadioWithRadio from '../Forms/RadioWithRadio';
import Accordian from '../Forms/Accordian';
import IncomeListSection from '../Forms/IncomeListSection';
import Error from '../Forms/Error';
import { underscorize } from '../../helpers/strings';
import RadioWithSelect from '../Forms/RadioWithSelect';
import Rebate from '../widgets/Rebate';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      toggle: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }


  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleToggle(e) {
    const val = e.target.value === 'yes' ? false : true;
    this.setState({[`${e.target.name}_toggle`]: !val});
    console.log(val)
  }

  render() {
    const steps =
    [
      {
        name: 'Step 1',
        component: <Step1 handleChange={this.handleChange} />
      },
      {
        name: 'Step 2',
        component: <Step2
          handleChange={this.handleChange}
          handleToggle={this.handleToggle}
          state={this.state}
        />
      },
      // {name: 'Step 3', component: <Step3 />},
      // {name: 'Step 4', component: <Step4 />},
      // {name: 'Step 5', component: <Step5 />}
    ];

    return (<div>
      <StepZilla steps={steps}/>
    </div>
    );
  }
}

const Step2 = props => {
  const incomeFields = [
    {
      label: 'NZ Superannuation',
      child: 'radio',
      singleOptions: ['Single - Living alone', 'Single - Sharing'],
      partnerOptions: ['Partner with non-qualified spouse included', 'Partner both qualify'],
    },
    {
      label: 'Jobseeker Support',
      child: null,
    },
    {
      label: 'Sole parent support',
      child: null,
    },
    {
      label: 'Supported Living',
      child: null,
    },
    {
      label: 'Wage or Salary',
      child: 'text-field',
    },
    {
      label: 'Other',
      child: 'nested-group',
    },
  ];

  return <Fragment>
    <Head/>
    <div className="container">
      <fieldset class="field radio-group">
        <legend>Did you live here at 1 July 2017?</legend>
        <div>
          <div>
            <Radio
              name="lived_here_before_july_2017"
              options={['yes', 'no']}
              handleToggle={props.handleToggle}
            />
          </div>
          <Accordian
            label="What if I moved house during the rates year?"
            text="Get in touch with your local council. There are some situations where you can still get a rebate on your previous home after you moved. They will ask you some details including: <ul><li>the settlement date</li><li>what rates you paid for the current year.</li></ul>"
          />
        </div>
      </fieldset>
      {props.state.lived_here_before_july_2017_toggle && <fieldset class="field radio-group">
        <legend>Were you living in another property that you owned on 1 July 2017, have sold that property, and moved to the address of the property you are currently living in during the the current rating year (1 July 2017-30 June 2018)?</legend>
        <div>
          <div>
            <Radio
              name="lived_other_owned_property"
              options={['yes', 'no']}
              handleToggle={props.handleToggle}
            />
          </div>
        </div>
      </fieldset>}
    </div>

    {/* Component */}
    <div className="theme-sand">
      <div className="container">
        <fieldset className="field">
          <legend>What is your full name?</legend>
          <input
            type="text"
            name="full_name"
            onChange={this.handleChange}
          />
          <p className="instructions">Your name must be on the title for the property you are applying for on the Rating Information Database (RID) at your local council.</p>
          <Accordian
            label="What if I live in a retirement village or company share flat/apartment?"
            text='<p>If you are eligible for a rebate under the Rates Rebate (Retirement Village Residents) Amendment Act 2018 you will be able to apply for a rebate in the new rating year after 1 July 2018.</p><p>If the property you own is part of owner/occupier flats (often referred to as company share flats or apartments), you will need to fill in an additional declaration form and bring it with you when visiting the council.</a> This can be found <a href="https://www.dia.govt.nz/Pubforms.nsf/URL/OwnerOccupierDeclarationFormJuly2011.pdf/$file/OwnerOccupierDeclarationFormJuly2011.pdf">here</a></p>'
          />
        </fieldset>
      </div>
    </div>

    {/* Component */}
    <div className="container">
      <fieldset className="field">
        <legend>Do you have dependants?</legend>
        <input
          type="number"
          min="0"
          step="1"
          name="dependants"
          placeholder="Enter the total amount"
          onChange={this.handleChange}
        />
        <p className="instructions">Dependants are: <br/><ul><li>children you care and provide for under the age of 18 on 1 July 2017 and who at this time were not married and for whom you were not receiving payments under section 363 of the Children, Young Persons, and their Families Act 1989</li><li>relatives in receipt of a benefit (but not NZ Superannuation) on 1 July 2017.</li></ul></p>
      </fieldset>
    </div>

    {/* Component */}
    <div className="theme-sand">
      <div className="container">
        <fieldset class="field radio-group">
          <legend>Were you living with a partner or joint home owner(s) on July 1 2017?</legend>
          <p>'Partner' is a person you are married to/in a civil union, or de facto relationship with.</p>
          <div>
            <div>
              <Radio
                name="income_page_2"
                options={['yes', 'no']}
                handleToggle={props.handleToggle}
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div className="container">
      <fieldset class="field radio-group">
        <legend>What was your total income for the 2017/18 tax year?</legend>
        <p>You will need to know your total income <strong>before tax</strong> for the 2016/2017 Tax year (1 March
          2016 - 31 March 2017) including rental income from any properties you own,
          interest and dividends, and overseas income (converted to $NZD).
        <br/>
        <br/>
          Select any that apply to you.
        </p>
        <div>
          <ul>
            {incomeFields.map((item, i) => {
              return (
                <Fragment key={i}>
                  <li>
                    <label className="radio-list-container">
                      <input
                        type="checkbox"
                        name={underscorize(item.label)}
                        onClick={this.handleToggle}
                      />
                      {underscorize(item.label)}
                      <div className="radio-list-multi">{item.label}
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  </li>
                  <div>
                    {console.log(props.state)}
                    {item.child === 'radio' && <Radio
                      name="income_page_2"
                      options={['yes', 'no']}
                      handleToggle={props.handleToggle}
                    />}
                  </div>
                  {/* <div>
                    {item.child === 'radio' && <RadioGroup
                      handleChildRadioClick={this.handleChildRadioClick}
                      name={`${underscorize(item.label)}_test`}
                      options={!this.props.hasPartner ? item.singleOptions && item.singleOptions : item.singleOptions && item.singleOptions.concat(item.partnerOptions)}
                      type={this.state.ShowRadio ? 'radio' : 'hidden'}
                    />}

                    {item.child === 'text-field' && <Fragment>
                      <input
                        type={this.state.ShowTextField ? 'text' : 'hidden'}
                        name={`wos_${this.props.name}`}
                        onChange={e => {
                          this.setState({ [`wos_${this.props.name}`]: e.target.value });
                        }}
                      />
                    </Fragment>}

                    {this.state.ShowNestedGroup && item.child === 'nested-group' && <RadioWithSelect
                      visible={this.state.ShowNestedGroup}
                      name={`${underscorize(item.label)}_${this.props.name}`}
                      getOtherOptionValues={this.getOtherOptionValues}
                      removeOtherOptionValues={this.removeOtherOptionValues}
                    />}
                  </div> */}
                </Fragment>
              );
            })}
          </ul>
        </div>
      </fieldset>
    </div>

    {/* Component */}
    <div className="container">
      <fieldset class="field radio-group">
        <legend>Do you earn money from home or run a business from home?</legend>
        <div>
          <div>
            <Radio
              name="has_home_business"
              options={['yes', 'no']}
              handleToggle={props.handleToggle}
            />
          </div>
        </div>
      </fieldset>
      {props.state.has_home_business_toggle && <fieldset class="field radio-group">
        <legend>If yes, and you deducted over 50% of your rates as expenses, you may not be able to get a rebate. If your property is mainly used for commercial activities, for example farming or business, you cannot apply for a rates rebate.</legend>
        <div>
          <div>
            <input
              type="text"
              name="deducts_over_half_rates"
              placeholder="Enter the total amount"
            />
          </div>
        </div>
      </fieldset>}
    </div>

    {/* Component */}
    <div className="theme-sand">
      <div className="container">
        <fieldset className="field">
          <legend>What is your email address?</legend>
          <p className="instructions">This email address will be used to send you a confirmation and instructions for this application. The phone number will be used to contact you if additional details are required.</p>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
          />
          <Checkbox
            name="email_phone_can_be_used"
            label="Are you happy for the email address and/or phone number to be used for other Council communications?"
          />
        </fieldset>
      </div>
    </div>

    <section className="container">
      <div>
        {/* <Calculated
          rates_bill={this.ratesBill()}
          dependants={this.dependants()}
          income={this.props.storeValues.totalIncome} /> */}

        <Accordian
          label="It is an offence to knowingly make a false statement in your application"
          text="<p>You can find a list of the total amounts for Work and Income payments, including NZ Superannuation https://www.dia.govt.nz/diawebsite.nsf/Files/Benefit-Schedule-2016-17/$file/Benefit-Schedule-2016-17.pdf <br/><br/>You can get this from a few places, such as:<ul><li>Inland Revenue, by calling them on 0800 775 247 and asking for a Personal Tax Summary, or logging on to your MyIR account at IRD.govt.nz.</li><li>from Ministry of Social Development</li> <li>through your employer, accountant etc.</il></ul></p>"
        />
      </div>
      <p>This will be applied to your rates account once your application has been fully processed.</p>
    </section>
  </Fragment>;
};

const Step1 = () => {
  return <Fragment>
    <div className="container autocomplete-form">
      <section>
        <h2 className="heading-secondary">Online rates rebates applications are now open exclusively for Tauranga residents<br/>
        </h2>

        <p><strong>If you are a low-income homeowner you could get
          a discount or partial refund of up to $620 on your property rates with a rates
          rebate.</strong><br/>
          <span>Mehemea he tangata whai whare koe e iti ana ngā whiwhinga moni, ka taea pea te whakamāmā,
            te whakahoki utu rānei, tae atu ki te $620 te rahi, mō ngā reiti whenua mā te kaupapa whakamāmā reiti. </span>
        </p>
        <Accordian
          label="<strong>What is a rates rebate?</strong> <br/><span>He aha te whakamāmā reiti?</span>"
          text="<p>Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.</p><p>Any homeowner may receive a rebate for the property they live in, as long as
            they meet the criteria. This is calculated by your property rates, your income
            for the 2016 to 2017 tax year, and the number of dependants you have. If you have
            dependants, the upper threshold of your income can be $500 more for each
            dependant in your care. For example, if you have 2 children, the top limit of
            how much you could earn to be entitled to the full rebate would be $1000 more
            than someone with no dependants.</p>"/>
        <h2 className="heading-secondary">Find out if you could get a rebate<br/>
          <span>Tirohia mehemea ka taea ō reiti te whakamāmā</span>
        </h2>
        <p><strong>Use our online calculator.</strong><br/>
        This calculator uses public information on property rates. <br/>Any information you enter is not stored. <br/>If you choose to apply, the information from the calculator will be used to pre-fill part of your application for you. </p>
      </section>
    </div>
  </Fragment>;
};

const Radio = props => {
  return <div>
    {props.options.map(item => <label>
      <input
        type="radio"
        name={props.name}
        value={item}
        onChange={props.handleToggle}
      />
      <span>{item}</span>
    </label>
    )}
  </div>;
};

const RadioGroup = props => {
  return (
    <div className="radio-list" style={props.type !== 'radio' ? { display: 'none' } : null}>
      {props.options.map((item, i) => <Fragment key={i}>
        <label>
          <input
            type="radio"
            name={props.name}
            onClick={() => props.handleChildRadioClick(item, props.name)}
          />
          <span>{item}</span>
        </label>
      </Fragment>)}
    </div>
  );
};

const Checkbox = props => {
  return <div className="checkbox-group">
    <div>
      <div className="checkboxes">
        <label>
          <input type="checkbox" name={props.name} />
          <span>{props.label}</span>
        </label>
      </div>
    </div>
  </div>;
};

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

const Success = () => {
  return (
    <div className="container">
      <section>
        <h2 className="heading-secondary">Step Three: Get your application witnessed<br/> <span>Mahi Tuatoru: Mā te kaiwhakaatu e waitohu tō tono.</span> </h2>
        <h3>You are almost there!</h3>
        <p>
          Proof of income may be requested for those with income sources other than superannuation or work and income benefits. <br/><br/>If you are self-employed, you must supply evidence with your application. Evidence of income helps to ensure you receive the correct rebate promptly. <br/><br/>Tell the Service Centre staff you're there to sign your rates rebate application.
        </p>
      </section>
    </div>
  );
};

const Failed = () => {
  return (
    <div className="container">
      <section>
        <h2>Something went wrong :(</h2>
        <p>Please contact us on 07 5777 000 or ratesrebates@tauranga.govt.nz</p>
      </section>
    </div>
  );
};

class Calculated extends React.Component {

  render() {
    return (
      <Fragment>
        <p className="heading-paragraph">
          Based on a <strong>rates bill of ${this.props.rates_bill}
          </strong> and <strong> income of ${this.props.income.toFixed(2)}
          </strong> and <strong>{this.props.dependants} dependants</strong>.
        </p>
        <Rebate
          dependants={this.props.dependants}
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

export default WizardForm;
