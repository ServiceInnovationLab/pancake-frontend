import React from 'react';

export default class IncomeTotals extends React.Component {
  constructor() {
    super();
    this.state = {
      income: null,
      totalIncome: 0
    };

    this.totalIncome = this
      .totalIncome
      .bind(this);
  }

  superAnnuation(type) {
    let sa_total;
    if (type.indexOf('alone') >= 0) {
      sa_total = 23405.20;
    } else if (type.indexOf('sharing') >= 0) {
      sa_total = 21484.32;
    } else if (type.indexOf('non_qualified') >= 0) {
      sa_total = 16784.56;
    } else if (type.indexOf('qualify') >= 0) {
      sa_total = 17721.60;
    } else {
      sa_total = 0;
    }
    return sa_total;
  }

  totalIncome() {
    let sa_total = 0;
    let jss_total = 0;
    let sps_total = 0;
    const spl_total = 0;

    if (typeof this.props.dependants !== 'undefined') {
      var dependants = this.props.dependants.value
        ? this.props.dependants.value
        : 0;
    }

    // SUPERANNUATION
    if (this.props.sa_checked) {
      sa_total += (this.superAnnuation(this.props.nz_superannuation_applicant) + this.superAnnuation(this.props.nz_superannuation_partner));
    }

    // JOB SEEKER SUPPORT
    if (this.props.jobseeker_support) {
      // has children
      if (dependants > 0) {
        if (this.props.livedWithPartner) {
          jss_total += 11019.84;
        } else {
          jss_total += 19585.28;
        }
      } else { // no children
        if (this.props.livedWithPartner) {
          jss_total += 10285.60;
        } else {
          jss_total += 10285.60; // took first value: Single 18-19 years (away from home)
        }
      }
    }

    // SOLE PARENT SUPPORT
    if (this.props.sole_parent_support) {
      if (dependants > 0) {
        sps_total += 19585.28;
      }
    }

    if (this.props.supported_living) {
      if (dependants > 1) {
        if (this.props.livedWithPartner) {
          sa_total += 13590.20;
        }
        if (!this.props.livedWithPartner) {
          sa_total += 22391.72;
        }
      } else if (dependants === 1) {
        if (this.props.livedWithPartner) {
          sa_total += 27180.40;
        }
      } else { // no children
        if (this.props.livedWithPartner) {
          sa_total += 12855.96;
        } else { // SINGLE
          sa_total += 15549.04;
        }
      }
    }
    // WAGE OR SALARY
    const firstTotal = (sa_total + jss_total + sps_total + spl_total + (this.props.wos_total || 0)) || 0;

    // OTHER INCOME
    const { incomeListStates } = this.props;
    const otherOptionValueStates = Object
      .keys(incomeListStates)
      .filter(state => /^otherOptionValue/.test(state));
    const otherOptionValues = [];
    for (const key in incomeListStates) {
      if (otherOptionValueStates.indexOf(key) >= 0) {
        otherOptionValues.push(parseInt(incomeListStates[key], 0));
      }
    }
    const total = firstTotal + (otherOptionValues.length
      ? otherOptionValues.reduce((a, b) => a + b, 0)
      : 0);
    return total;
  }

  componentDidUpdate() {
    this.props.setTotalIncome(this.totalIncome());
  }

  render() {
    return (
      <div>
        <p>Income $<strong>{this.totalIncome().toString()}</strong></p>
      </div>);
  }
}
