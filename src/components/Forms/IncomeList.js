import React, { Fragment } from 'react';
import IncomeTotals from './IncomeTotals';
import { underscorize } from '../../helpers/strings';
import RadioWithSelect from './RadioWithSelect';
import filterE from '../../helpers/numbers';

export default class IncomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowRadio: false,
      ShowTextField: false,
      ShowNestedGroup: false,
      nz_superannuation_applicant: '',
      nz_superannuation_partner: '',
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
    this.removeOtherOptionValues = this.removeOtherOptionValues.bind(this);
  }

  setChild(state, clicked) {
    if (this.state.ShowTextField) {
      if (clicked === 'wage_or_salary0') {
        document.getElementsByName('wos_applicant')[0].value = 0;
      }
      if (clicked === 'wage_or_salary1') {
        document.getElementsByName('wos_partner')[0].value = 0;
      }

      this.setState({ [state]: !this.state[state] });
    } else {
      this.setState({ [state]: !this.state[state] });
    }
  }


  handleChild(val, clicked) {
    switch (val.child) {
      case 'radio':
        this.setState({ sa_checked: !this.state.sa_checked });
        this.setChild('ShowRadio');
        break;
      case 'number-field':
        this.setChild('ShowTextField', clicked);
        break;
      case 'nested-group':
        this.setChild('ShowNestedGroup');
        break;
      default:
        this.setChild(underscorize(val.label));
    }
  }


  handleChildRadioClick(e, name) {
    this.setState({ [name]: `${name}_${underscorize(e)}` });
  }

  handleTextChange(e) {
    if (e.target.name === 'wage_or_salary_applicant') {
      this.setState({ wos_applicant: e.target.value });
    }
    if (e.target.name === 'wage_or_salary_partner') {
      this.setState({ wos_partner: e.target.value });
    }
  }

  getWageOrSalary(name) {
    return typeof document.getElementsByName(name)[0] !== 'undefined'
      ? document.getElementsByName(name)[0].value
      : 0;
  }

  removeOtherOptionValues(index) {
    this.setState({ [`otherOptionValue${index}`]: 0 });
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
        label: 'NZ Superannuation',
        child: 'radio',
        singleOptions: ['Single - Living alone', 'Single - Sharing'],
        partnerOptions: ['Partner with non-qualified spouse included', 'Partner both qualify']
      },
      {
        label: 'Jobseeker Support',
        child: null
      },
      {
        label: 'Sole parent support',
        child: null
      },
      {
        label: 'Supported Living',
        child: null
      },
      {
        label: 'Wage or Salary',
        child: 'number-field'
      },
      {
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
                    onClick={() => this.handleChild(item, underscorize(`${item.label}${this.props.livedWithPartner ? '1' : '0'}`))}
                  />
                  <div className="radio-list-multi">{item.label}
                    <span className="checkmark"></span>
                  </div>
                </label>
              </li>
              <div>
                {!this.props.showRadios && item.child === 'radio' && <RadioGroup
                  handleChildRadioClick={this.handleChildRadioClick}
                  name={`${underscorize(item.label)}_${this.props.name}`}
                  options={!this.props.livedWithPartner ? item.singleOptions && item.singleOptions : item.singleOptions && item.singleOptions.concat(item.partnerOptions)}
                  type={this.state.ShowRadio ? 'radio' : 'hidden'}
                />}

                {item.child === 'number-field' && <Fragment>
                  <input
                    type={this.state.ShowTextField ? 'number' : 'hidden'}
                    name={`wos_${this.props.name}`}
                    min="0"
                    step="1"
                    pattern="\d+"
                    onChange={e => {
                      if(!filterE(e)) {
                        this.setState({ [`wos_${this.props.name}`]: e.target.value });
                      }
                    }}
                  />
                </Fragment>}

                {this.state.ShowNestedGroup && item.child === 'nested-group' && <RadioWithSelect
                  visible={this.state.ShowNestedGroup}
                  name={`${underscorize(item.label)}_${this.props.name}`}
                  getOtherOptionValues={this.getOtherOptionValues}
                  removeOtherOptionValues={this.removeOtherOptionValues}
                />}
              </div>
            </Fragment>
          );
        })}


        <IncomeTotals
          incomeListStates={this.state}
          dependants={document.getElementsByName('dependants')[0]}
          livedWithPartner={this.props.livedWithPartner}
          data={this.props}
          nz_superannuation_applicant={this.state.nz_superannuation_applicant}
          nz_superannuation_partner={this.state.nz_superannuation_partner}
          sa_checked={this.state.sa_checked}
          jobseeker_support={this.state.jobseeker_support}
          sole_parent_support={this.state.sole_parent_support}
          supported_living={this.state.supported_living}
          wos_total={this.wosTotal()}
          setTotalIncome={this.props.setTotalIncome}
        />
      </Fragment>
    );
  }

  wosTotal() {
    let total = parseFloat(this.getWageOrSalary(`wos_${this.props.name}`), 0);
    if (!total) {
      total = 0;
    }
    return total;
  }
}

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
