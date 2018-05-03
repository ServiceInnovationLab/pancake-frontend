import React, {Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import renderField from './renderField';
import RenderRadio from '../../components/Forms/RenderRadio';
import {underscorize, camelCaser} from '../../helpers/strings';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import axios from 'axios';
import config from '../../config';
import Select from 'react-select';
import Accordian from '../Forms/Accordian';
import 'react-select/dist/react-select.css';

class WizardFormFirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1,
      shown: false,
      complete: false,
      signature: '',
      value: '',
      values: '',
      properties: [],
      selectedLocation: '',
      included: [],
      rate_payers: [],
      selectedRatesPayer: '',
      clearable: true,
      isEligible: false,
      dependants: null,
      openFiscaObject: null,
      minimum_income_for_no_rebate: null,
      maximum_income_for_full_rebate: null,
      show_income: false,
      earns_less_than: null,
      earns_between: null,
      earns_more_than: null
    };
    this.nextPage = this
      .nextPage
      .bind(this);
    this.previousPage = this
      .previousPage
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSelectLocation = this
      .handleSelectLocation
      .bind(this);
    this.handleRatesPayers = this
      .handleRatesPayers
      .bind(this);
    this.handleDependants = this
      .handleDependants
      .bind(this);
    this.handleIncome1 = this
      .handleIncome1
      .bind(this);
    this.handleIncome2 = this
      .handleIncome2
      .bind(this);
    this.handleIncome3 = this
      .handleIncome3
      .bind(this);
    this.showIncome = this
      .showIncome
      .bind(this);
    this.showEligibility = this
      .showEligibility
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

  handleChange(inputText) {
    this.setState({isLoadingExternally: true})
    axios
      .get(`${config.API_ORIGIN}/api/v1/properties?q=${inputText}`)
      .then(res => {
        if (res && res.data && res.data.data.length) {
          const properties = res
            .data
            .data
            .map(i => {
              return {id: i.id, location: i.attributes.location, valuationId: i.attributes.valuation_id}
            });
          this.setState({
            properties
          }, () => this.setState({isLoadingExternally: false}));
        }
      })
      .catch(err => console.log('err fetching properties', err));
  }

  handleSelectLocation(selectedOption) {

    if (selectedOption) {
      axios
        .get(`${config.API_ORIGIN}/api/v1/properties/${selectedOption.id}`)
        .then(res => {
          if (res && res.data && res.data.included.length) {
            const includedRatePayers = res
              .data
              .included
              .filter(i => i.type === 'rates_payers')
              .map(p => {
                return {id: p.id, fullName: `${p.attributes.first_names} ${p.attributes.surname}`, type: p.type}
              })
            const includedRatesBills = res
              .data
              .included
              .filter(i => i.type === 'rates_bills')
              .map(p => {
                return {id: p.id, fullName: `${p.attributes.first_names} ${p.attributes.surname}`, type: p.type, totalRates: p.attributes.total_rates}
              })
            this.setState({includedRatePayers, includedRatesBills, selectedLocation: selectedOption});
            this
              .props
              .change('what_is_your_address', selectedOption.location);
          }
        })
        .catch(err => console.log('err fetching included properties', err));
    } else {
      this.setState({selectedLocation: null})
    }
  }

  handleRatesPayers(selectedOption) {
    if (selectedOption) {
      this.setState({selectedRatesPayer: selectedOption.fullName})
      this
        .props
        .change('what_is_your_full_name', selectedOption.fullName);
      this
        .props
        .change('your_rates_are', this.state.includedRatesBills[0].totalRates);
      this
        .props
        .change('valuation_id', this.state.selectedLocation.valuationId);
    } else {
      this.setState({selectedRatesPayer: null});
    }
  }

  handleDependants(value) {
    let data = {
      'persons': {
        'Tui': {
          'salary': {
            '2017': null
          },
          'dependants': {
            '2017': this.state.dependants
          }
        }
      },
      'properties': {
        'property_1': {
          'owners': ['Tui'],
          'rates': {
            '2017': this.state.includedRatesBills[0].totalRates
          },
          'maximum_income_for_full_rebate': {
            '2017': null
          },
          'minimum_income_for_no_rebate': {
            '2017': null
          }
        }
      }
    };

    if (value) {
      this.setState({dependants: value});
      axios
        .post(`${config.OPENFISCA_ORIGIN}`, data)
        .then(res => this.setState({
          minimum_income_for_no_rebate: res
            .data
            .properties
            .property_1
            .minimum_income_for_no_rebate['2017']
            .toFixed(2),
          maximum_income_for_full_rebate: res
            .data
            .properties
            .property_1
            .maximum_income_for_full_rebate['2017']
            .toFixed(2)
        }))
        .catch(err => console.log('err fetching properties', err));
    } else {
      this.setState({dependants: null});
    }

    if (this.state.selectedLocation !== '' && this.state.selectedRatesPayer !== '') {
      this.setState({show_income: true})
    }
  }

  handleIncome1(e) {
    this.setState({earns_less_than: e.target.value})
  }

  handleIncome2(e) {
    this.setState({earns_between: e.target.value})
  }

  handleIncome3(e) {
    this.setState({earns_more_than: e.target.value});
    if (this.state.earns_less_than !== null || this.state.earns_between !== null || this.state.earns_more_than !== null) {
      this.setState({isEligible: true})
    }
  }

  showIncome() {
    this.setState({show_income: true})
  }

  showEligibility() {
    this.setState({isEligible: true})
  }

  render() {
    const {handleSubmit} = this.props;
    const earnLessThan = {
      'label': {
        'en': {
          'text': 'Do you earn less than ' //+this.state.openFiscaObject.properties.property_1.minimum_income_for_no_rebate
        },
        'mi': {
          'text': 'Do you earn less than ' //+this.state.openFiscaObject.properties.property_1.minimum_income_for_no_rebate
        }
      },
      'instructions': {
        'en': {
          'text': ''
        },
        'mi': {
          'text': ''
        }
      },
      'options': {
        'en': {
          'text': ['yes', 'no']
        },
        'mi': {
          'text': ['ae', 'kaore']
        }
      },
      'isRequired': true,
      'component': RenderRadio
    };
    return (
      <div className="container autocomplete-form">

        <form onSubmit={handleSubmit}>
          <section>
            <h2 className="heading-primary">If you are a low-income homeowner you could get
              a discount or partial refund of up to $620 on your property rates with a rates
              rebate.<br/>
              <span>Mena he kaipupuri whenua iti koe, ka taea e koe te whakahekenga i te utu
                me te utu reti ki te $620 i runga i to reiti nama me te reiti reiti.</span>
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

                <div className="calc-layout">
                  <span>I live at</span>
                  <Select
                    name="what_is_your_address"
                    value={this.state.selectedLocation}
                    onChange={this.handleSelectLocation}
                    onInputChange={this.handleChange}
                    clearable={this.state.clearable}
                    searchable={this.state.searchable}
                    isLoading={this.state.isLoadingExternally}
                    options={this.state.properties}
                    labelKey={'location'}
                    valueKey={'id'}/>
                </div>

                {this.state.selectedLocation && <Fragment>
                  <div>Who are you?</div>
                  <Select
                    name="what_is_your_full_name"
                    value={this.state.selectedRatesPayer}
                    onChange={this.handleRatesPayers}
                    clearable={this.state.clearable}
                    searchable={this.state.searchable}
                    labelKey={'fullName'}
                    valueKey={'fullName'}
                    isLoading={this.state.isLoadingExternally}
                    options={this.state.includedRatePayers}/>
                </Fragment>
}

                <Field name="valuation_id" type="hidden" component={renderField}/> {this.state.selectedRatesPayer && <Fragment>
                  <div>Your rates are:
                  </div>
                  <Field name="your_rates_are" type="text" component={renderField}/>
                  <div>How many dependents do you have?</div>
                  <Field
                    name="do_you_have_dependants"
                    onChange={this.handleDependants}
                    type="text"
                    component={renderField}/>
                </Fragment>
}

                {this.state.show_income && <section>
                  <label htmlFor="earn_less_than">
                    <span>Do you earn less than ${this.state.minimum_income_for_no_rebate}?</span>
                  </label>
                  <Field
                    name="earn_less_than"
                    component={earnLessThan.component}
                    options={earnLessThan.options && earnLessThan.options['en'].text}
                    optionsText={earnLessThan.optionsText && earnLessThan.optionsText['en'].text}
                    onChange={this.handleIncome1}/>
                  <label htmlFor="earns_between">
                    <span>Do you earn between ${this.state.minimum_income_for_no_rebate}
                      and ${this.state.maximum_income_for_full_rebate}?</span>
                  </label>
                  <Field
                    name="earns_between"
                    component={earnLessThan.component}
                    options={earnLessThan.options && earnLessThan.options['en'].text}
                    optionsText={earnLessThan.optionsText && earnLessThan.optionsText['en'].text}
                    onChange={this.handleIncome2}/>

                  <label htmlFor="earns_more_than">
                    <span>Do you earn more than ${this.state.maximum_income_for_full_rebate}?</span>
                  </label>
                  <Field
                    name="earns_more_than"
                    component={earnLessThan.component}
                    options={earnLessThan.options && earnLessThan.options['en'].text}
                    optionsText={earnLessThan.optionsText && earnLessThan.optionsText['en'].text}
                    onFocus={this.handleIncome3}/>
                </section>
}

              </div>
            </div>

            {this.state.isEligible && <Fragment>
              <div className="arrow-box secondary">
                <p className="heading-paragraph">You are eligible for
                  <span>$620</span>
                </p>
                <p className="heading-paragraph">Assuming you meet the criteria</p>
              </div>
              <div className="layout">
                <button type="submit" className="btn-primary">Apply now</button>
              </div>
            </Fragment>
}
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
