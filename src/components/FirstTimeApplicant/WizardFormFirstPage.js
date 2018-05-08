import React, {Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import renderField from '../Forms/renderField';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import Accordian from '../Forms/Accordian';
import Address from '../widgets/Address';
import Income from '../widgets/Income';
import Eligible from '../widgets/Eligible';
import 'react-select/dist/react-select.css';

class WizardFormFirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dependants: null,
      isEligible: false,
      page: 1,
      properties: [],
      rate_payers: [],
      selectedRatesPayer: '',
    };
    this.nextPage = this
      .nextPage
      .bind(this);
    this.previousPage = this
      .previousPage
      .bind(this);
    this.handleDependants = this
      .handleDependants
      .bind(this);
    this.handleIncome = this
      .handleIncome
      .bind(this);

    this.handleAddressSelection = this
      .handleAddressSelection
      .bind(this);
  }

  nextPage = values => {
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  }

  getValues(e) {
    this.setState({value: e.target.value});
  }

  handleAddressSelection(state) {
    this.setState(state);
    this
      .props
      .change('address', state.location.location);
    this
      .props
      .change('valuation_id', this.state.location.valuation_id);

    if (state['rates_bills']) {
      let attributes = state['rates_bills'][0]['attributes'];
      this.setState({
        'rates_bill': attributes['total_rates'],
        'rating_year': attributes['rating_year']
      });
    }
    else {
      this.setState({rates_bills: null, rating_year: null});
    }
  }

  handleDependants(event, newValue, previousValue, name) {
    if (newValue) {
      let dependants = (newValue >= 0 ? newValue : 0);
      this.setState({dependants});
    }
  }

  handleIncome(income, direction) {
    // note: direction is above, between, below
    this.setState({income, direction});
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="container autocomplete-form">

        <form onSubmit={handleSubmit}>
          <section>
            <h2 className="heading-primary">If you are a low to medium income homeowner you could get a discount or partial
                refund of up to $620 on your property rates with a rates rebate.<br/>
              <span>Mena he kaipupuri whenua iti koe, ka taea e koe
              te whakahekenga i te utu me te utu reti ki te $620 i runga i to reiti nama me te
              reiti reiti.</span>
            </h2>
            <Accordian
              label="<strong>What is a rates rebate?</strong> <br/><span>He aha te utu whakahokia?</span>"
              text="<p>Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.</p><p>Any homeowner may receive a rebate for the property they live in, as long as
                they meet the criteria. This is calculated by your property rates, your income
                for the last tax year, and the number of dependants you have. If you have
                dependants, the upper threshold of your income can be $500 more for each
                dependant in your care. For example, if you have 2 children, the top limit of
                how much you could earn to be entitled to the full rebate would be $1000 more
                than someone with no dependants.</p>"/>
            <h2 className="heading-secondary">Find out if you could get a rebate<br/>
              <span>Tirohia mehemea ka taea e koe te utu whakahokia</span>
            </h2>
            <p>Use our online calculator</p>
          </section>

          <section>
            <div className="arrow-box primary">
              <div>
                <Address onSelection={this.handleAddressSelection} />

                <Field name="valuation_id" type="hidden" component={renderField}/>
                {this.state.rates_bill && this.state.rating_year && <Fragment>
                  <div className="calc-layout">
                    My {this.state.rating_year - 1} to {this.state.rating_year} rates
                    are <strong>$ {this.state.rates_bill}</strong>
                  </div>
                </Fragment>
                }
              </div>
            </div>

            {this.state.rates_bill && <Fragment>
              <div className="arrow-box primary">
                <div>
                  <div className="calc-layout">
                    <div>
                      I have
                      <Field
                        name="dependants"
                        onChange={this.handleDependants}
                        type="text"
                        component={renderField}/>
                      dependants.
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
            }


            <Income
              dependants={this.state.dependants}
              rates_bill={this.state.rates_bill}
              onSelection={this.handleIncome}
            />


            <Fragment>
              <Eligible
                dependants={this.state.dependants}
                rates_bill={this.state.rates_bill}
                income={this.state.income}
                />
              <div className="layout">
                <button type="submit" className="btn-primary">Apply now</button>
              </div>
            </Fragment>
          </section>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true,
  // validate,
  onSubmitFail: (errors) => scrollToFirstError(errors)
})(WizardFormFirstPage);
