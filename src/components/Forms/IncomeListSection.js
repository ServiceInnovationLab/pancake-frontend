import RadioField from './RadioField';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { sendTotalIncome, sendPartnerStatus } from '../../actions';
import IncomeList from './IncomeList';

class IncomeListSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      should_show_applicant_options: true,
      should_show_partner_options: false,
      total_applicant_income: 0,
      total_partner_income: 0
    };
    this.handleRadioClick = this
      .handleRadioClick
      .bind(this);
    this.setIncome = this
      .setIncome
      .bind(this);

    this.incomeList = [
      {
        title: 'Your Income',
        type: 'applicant'
      },
      {
        title: "Partner/join homeowner's income",
        type: 'partner'
      }
    ];
  }

  handleRadioClick(val) {
    this.setState({ should_show_partner_options: val === 'yes' });
  }

  setIncome(totalIncome, type) {
    if (this.state[`total_${type}_income`] !== totalIncome) {
      if(!isNaN(totalIncome)) {
        this.setState({ [`total_${type}_income`]: totalIncome });
      }
    }
  }

  componentDidUpdate() {
    const singleIncome = this.state.total_applicant_income;
    const combinedIncome = singleIncome + this.state.total_partner_income;
    const incomeTotal = !this.state.should_show_partner_options ? singleIncome : combinedIncome;

    this.props.dispatch(sendTotalIncome(incomeTotal));
    this.props.dispatch(sendPartnerStatus(this.state.should_show_partner_options));
  }

  render() {
    return (
      <Fragment>
        <section>
          <div className="container">
            <fieldset className="field radio-group">
              <legend>Were you living with a partner or joint home owner(s) on July 1 2018?</legend>
              <p>'Partner' is a person you are married to/in a civil union, or de facto
                relationship with.
              </p>
              <div>
                <div>
                  <RadioField
                    options={['yes', 'no']}
                    name="lived_with_partner"
                    handleRadioClick={this.handleRadioClick}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </section>
        <div style={{ marginTop: '42px' }}>
          <fieldset>
            <label
              style={{
                fontSize: '20px',
                fontWeight: '500'
              }}
            >
              What was your total income for the 2017/2018 tax year?
            </label>
            <p>
              You will need to know your total income <strong>before tax</strong> for the 2017/2018 Tax year (1 March
              2017 - 31 March 2018) including rental income from any properties you own,
              interest and dividends, and overseas income (converted to $NZD).
              <br/>
              <br/>
              Select any that apply to you.
            </p>
            <div className="row">
              {this.incomeList.map(item => {
                return <ul key={item.type} className="column list-stripped">
                  {this.state[`should_show_${item.type}_options`] && <ListColumn
                    title={item.title}
                    name={item.type}
                    hasPartner={this.state[`should_show_${item.type}_options`]}
                    showRadios={false}
                    setTotalIncome={e => this.setIncome(e, item.type)}
                  />}
                </ul>;
              })}
            </div>
          </fieldset>
        </div>
      </Fragment>
    );
  }
}

const ListColumn = props => {
  return <Fragment>
    <ListHeading title={props.title} />
    <IncomeList
      name={props.name}
      livedWithPartner={props.livedWithPartner}
      showRadios={props.showRadios}
      setTotalIncome={props.setTotalIncome}
    />
  </Fragment>;
};

const ListHeading = props => {
  return <li>
    <h4>{props.title}</h4>
  </li>;
};

export default connect()(IncomeListSection);
