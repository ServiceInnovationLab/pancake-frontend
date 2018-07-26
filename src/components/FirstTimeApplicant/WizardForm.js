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
        component: <Step1
          handleChange={this.handleChange}
          handleToggle={this.handleToggle}
          state={this.state}
        />
      },
      {
        name: 'Step 2',
        component: <Step2 handleChange={this.handleChange} />
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

const Step1 = props => {
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
  </Fragment>;
};

const Step2 = () => {
  return (<p>this is step 2</p>);
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

export default WizardForm;
