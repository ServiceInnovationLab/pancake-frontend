import React, {Fragment} from 'react';
import {underscorize} from '../../helpers/strings';
import RadioWithSelect from './RadioWithSelect';

class IncomeListSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPartnerOptions: false
    };
    this.handleRadioClick = this
      .handleRadioClick
      .bind(this);
  }

  handleRadioClick(val) {
    if (val === 'yes') {
      this.setState({showPartnerOptions: true});
    } else {
      this.setState({showPartnerOptions: false});
    }
  }

  render() {
    return (
      <Fragment>
        {/* <section>
          <div className="container">
            <fieldset className="field radio-group">
              <legend>Question 1</legend>
              <p>instructions</p>
              <RadioField
                options={['yes', 'no']}
                handleRadioClick={this.handleRadioClick}
              />

            </fieldset>
          </div>
        </section> */}
        <section>
          <div className="container">
            <fieldset className="field radio-group">
              <legend>Were you living with a partner or joint home owner(s) on July 1 2017?</legend>
              <p>'Partner' is a person you are married to/in a civil union, or de facto
                relationship with.</p>
              <div>
                <div>
                  <RadioField options={['yes', 'no']} handleRadioClick={this.handleRadioClick}/>
                </div>
              </div>
            </fieldset>
          </div>
        </section>
        <div style={{
          marginTop: '42px'
        }}>
          <fieldset>
            <label style={{
              fontSize: '20px'
            }}>What was your total income for the 2017/18 tax year?</label>
            <p>You will need to know your total income for the 2016/2017 Tax year (1 March
              2016 - 31 March 2017) including rental income from any properties you own,
              interest and dividends, and overseas income (converted to $NZD).
              <br/>
              <br/>
              Select any that apply to you.</p>
            <div className="row">
              <ul className="column list-stripped">
                <li>
                  <h4>Your Incomes</h4>
                </li>
                <IncomeList
                  name="applicant"
                  hasPartner={this.state.showPartnerOptions}
                  showRadios={this.state.showPartnerOptions}/>
              </ul>
              <ul className="column list-stripped">
                {this.state.showPartnerOptions && <Fragment>
                  <li>
                    <h4>Your Incomes</h4>
                  </li>
                  <IncomeList
                    name="partner"
                    hasPartner={this.state.showPartnerOptions}
                    showRadios={this.state.showPartnerOptions}/>
                </Fragment>
}
              </ul>
            </div>
          </fieldset>
        </div>
      </Fragment>
    );
  }
}

const RadioField = props => {
  return (
    <Fragment>
      {props
        .options
        .map((item, i) => <Fragment key={i}>
          <input
            type="radio"
            name="radio_fields"
            onClick={() => props.handleRadioClick(item)}/>
          <span>{item}</span>
        </Fragment>)}
    </Fragment>
  );
};

class IncomeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ShowRadio: false,
      ShowTextField: false,
      ShowNestedGroup: false,
      super_annuation_applicant: '',
      super_annuation_partner: '',
      sa_checked: false,
      jobseeker_support: 0,
      sole_parent_support: 0,
      supported_living: 0
    };

    this.handleChild = this
      .handleChild
      .bind(this);
    this.handleChildRadioClick = this
      .handleChildRadioClick
      .bind(this);
    this.getOtherOptionValues = this
      .getOtherOptionValues
      .bind(this);
  }

  setChild(state) {
    if (!this.state[state]) {
      this.setState({[state]: true});
    } else {
      this.setState({[state]: false});
    }
  }

  handleChild(val) {
    switch (val.child) {
      case 'radio':
        !this.setState({sa_checked: true});
        this.setChild('ShowRadio');
        break;
      case 'text-field':
        this.setChild('ShowTextField');
        break;
      case 'nested-group':
        this.setChild('ShowNestedGroup');
        break;
      default:
        this.setChild(underscorize(val.label));
    }
  }

  handleChildRadioClick(e, name) {
    this.setState({[name]: `${name}_${underscorize(e)}`});
  }

  handleTextChange(e) {
    // console.log('in handleTextChange', e.target.value)
    if (e.target.name === 'wage_or_salary_applicant') {
      this.setState({wos_applicant: e.target.value})
    }
    if (e.target.name === 'wage_or_salary_partner') {
      this.setState({wos_partner: e.target.value})
    }
  }

  getWageOrSalary(name) {
    return typeof document.getElementsByName(name)[0] !== 'undefined'
      ? document.getElementsByName(name)[0].value
      : 0;
  }

  getOtherOptionValues(store, income, value, index) {
    const data = {};
    data[`otherOptionValue${index}`] = value;
    this.setState(data);
    store[`${income}.totalAmount`] = value;
  }

  render() {
    const list = [
      {
        label: 'Super Annuation',
        child: 'radio',
        options: ['Single - Living alone', 'Single - Sharing']
      }, {
        label: 'Jobseeker Support',
        child: null
      }, {
        label: 'Sole parent support',
        child: null
      }, {
        label: 'Supported Living',
        child: null
      }, {
        label: 'Wage or Salary',
        child: 'text-field'
      }, {
        label: 'Other',
        child: 'nested-group'
      }
    ];
    return (
      <Fragment>
        {list.map((item, i) => {
          return (
            <Fragment key={i}>
              <li>
                <label className="radio-list-container">
                  <input
                    type="checkbox"
                    name={underscorize(item.label)}
                    onClick={() => this.handleChild(item)}/>
                  <div className="radio-list-multi">{item.label}
                    <span className="checkmark"></span>
                  </div>
                </label>
              </li>
              <div>
                {!this.props.showRadios && item.child === 'radio' && <RadioGroup
                  handleChildRadioClick={this.handleChildRadioClick}
                  name={`${underscorize(item.label)}_${this.props.name}`}
                  options={item.options && item.options}
                  type={this.state.ShowRadio
                  ? 'radio'
                  : 'hidden'}/>
}
                {item.child === 'text-field' && <Fragment>
                  <input
                    type={this.state.ShowTextField
                    ? 'text'
                    : 'hidden'}
                    name={`wos_${this.props.name}`}
                    onChange={e => this.setState({
                    [`wos_${this.props.name}`]: e.target.value
                  })}
                    value={this.state[`wos_${this.props.name}`] || ''}/>
                </Fragment>
}

                {this.state.ShowNestedGroup && item.child === 'nested-group' && <RadioWithSelect
                  visible={this.state.ShowNestedGroup}
                  name={`${underscorize(item.label)}_${this.props.name}`}
                  getOtherOptionValues={this.getOtherOptionValues}/>
}</div>
            </Fragment>
          );
        })}

        {/* {console.log(this.props)} */}

        <Entitlement
          incomeListStates={this.state}
          dependants={document.getElementsByName('dependants')[0]}
          hasPartner={this.props.hasPartner}
          data={this.props}
          super_annuation_applicant={this.state.super_annuation_applicant}
          super_annuation_partner={this.state.super_annuation_partner}
          sa_checked={this.state.sa_checked}
          jobseeker_support={this.state.jobseeker_support}
          sole_parent_support={this.state.sole_parent_support}
          supported_living={this.state.supported_living}
          wos_total={(parseInt(this.getWageOrSalary('wos_applicant'), 0) + parseInt(this.getWageOrSalary('wos_partner'), 0))}/>
      </Fragment>
    );
  }
}

const RadioGroup = props => {
  return (
    <div
      style={props.type !== 'radio'
      ? {
        display: 'none'
      }
      : null}>
      {props.options && props
        .options
        .map((item, i) => {
          return <Fragment key={i}>
            <label>
              <input
                key={i}
                type="radio"
                name={props.name}
                onClick={() => props.handleChildRadioClick(item, props.name)}/> {item}
            </label>
          </Fragment>;
        })}
    </div>
  );
};

class Entitlement extends React.Component {

  componentDidUpdate() {
    let sa_total = 0;
    let jss_total = 0;
    let sps_total = 0;
    let spl_total = 0;

    if (typeof this.props.dependants !== 'undefined') {
      var dependants = this.props.dependants.value
        ? this.props.dependants.value
        : 0;
    }

    // SUPER ANNUATION
    if (this.props.sa_checked) {
      if (dependants.length > 0) {

        if (this.props.hasPartner) {
          sa_total += 34916.96;
        } // TODO: this value is empty in benefit schedult

      } else { // no children
        if (this.props.hasPartner) {
          sa_total += 17458.48;
        } else { // SINGLE
          if (this.props.super_annuation_applicant.includes('alone')) {
            sa_total += 23058.36;
          } else if (this.props.super_annuation_applicant.includes('sharing')) {
            sa_total += 21191.56;
          }
        }
      }
    }

    // JOB SEEKER SUPPORT
    if (this.props.jobseeker_support) {
      if (dependants.length > 0) {
        if (this.props.hasPartner) {
          jss_total += 21799.44;
        } else {
          jss_total += 19358.56;
        }
      } else { // no children
        if (this.props.hasPartner) {
          jss_total += 20346.56;
        } else {
          jss_total += 10173.28; // took first value: Single 18-19 years (away from home)
        }
      }
    }

    // SOLE PARENT SUPPORT
    if (this.props.sole_parent_support) {
      if (dependants.length > 0) {
        sps_total += 19358.56;
      }
    }

    // SUPPORTED LIVING PAYMENT
    if (this.props.supported_living) {
      if (dependants.length > 0) {
        if (this.props.hasPartner) {
          if (dependants.length === 1) {
            spl_total += 12716.08; // married, with 1 child
          } else {
            spl_total += 26884.00; // married, with 2 or more children
          }

        } else {
          spl_total += 22134.84; // single, with children
        }
      } else {
        if (this.props.hasPartner) {
          spl_total += 12716.08; // married, no children
        } else {
          spl_total += 15366.52; // single, no children
        }
      }
    }

    // WAGE OR SALARY
    const firstTotal = (sa_total + jss_total + sps_total + spl_total + this.props.wos_total) || 0;

    // OTHER INCOME
    const {incomeListStates} = this.props;
    const otherOptionValueStates = Object
      .keys(incomeListStates)
      .filter(state => /^otherOptionValue/.test(state));
    const otherOptionValues = [];
    for (const key in incomeListStates) {
      if (otherOptionValueStates.includes(key)) {
        otherOptionValues.push(parseInt(incomeListStates[key]));
      }
    }
    const total = firstTotal + otherOptionValues.length
      ? otherOptionValues.reduce((a, b) => a + b, 0)
      : 0;

  }

  render() {
    return <div> <p>Entitlement: {} </p> </div>;
  }
}

export default IncomeListSection;
