import React, { Fragment } from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from '../../helpers/validate';
import renderField from './renderField';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import axios from 'axios';
import config from '../../config';
import Select from 'react-select';
import selectField from './Select';
let isLoadingExternally = false;

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
      selectedOption: '',
      included: [],
      rate_payers: [],
      selectedRatesPayer: '',
      clearable: true
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
    this.handleRatesPayers = this
      .handleRatesPayers
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

  getValues(e){
    this.setState({ value: e.target.value });
  }

  componentDidMount() {
    isLoadingExternally = true;
    axios
    .get(`${config.API_ORIGIN}/api/v1/properties?q=`)
        .then(res => {
          console.log('stuff', res)
            let newArr = [];
            res.data.data.forEach(item => {
              const {id, valuation_id, town_city, location, suburb} = item.attributes;
              let address = `${location}, ${suburb}, ${town_city}`;
              newArr.push({
                rates_payers: item.relationships.rates_payers.data,
                value: address,
                label: address,
                valuation_id
              })
            });
            // console.log(newArr)
            this.setState({
                properties: newArr,
                included: res.data.included
            }, () => {
                isLoadingExternally = false;
            })
        })
}

handleChange(selectedOption) {
  if (selectedOption) {
    const selectedRatePayerIds = selectedOption.rates_payers.map(i => i.id);
    let ratePayers = this.state.included.filter(i => selectedRatePayerIds.includes(i.id));
    ratePayers = ratePayers.map(p => {
      return {
        id: p.id,
        fullName: `${p.attributes.first_names} ${p.attributes.surname}`,
        type: p.type
      }
    });
    this.setState({ratePayers, selectedOption: selectedOption.value});
    document.getElementById('what_is_your_address') && document.getElementById('what_is_your_address').setAttribute('value', this.state.selectedOption ? selectedOption.value : null);
    console.log('rate payersssss',selectedOption);
  } else {
    this.setState({selectedOption: null})
  }
}

handleRatesPayers(selectedOption) {
  if(selectedOption) {
    this.setState({selectedRatesPayer: selectedOption.fullName})

  } else {
    this.setState({selectedRatesPayer: null});
  }
}


  render(){
    const {handleSubmit} = this.props;
    // debugger;
    return (
      <div className="container autocomplete-form">

        <form onSubmit={handleSubmit}>
          <section>
            <h2 className="heading-primary">Mena he kaipupuri whenua iti koe, ka taea e koe
              te whakahekenga i te utu me te utu reti ki te $620 i runga i to reiti nama me te
              reiti reiti.<br/>
              <span>If you are a low-income homeowner you could get a discount or partial
                refund of up to $620 on your property rates with a rates rebate.</span>
            </h2>

            <hr/>
            <h2 className="heading-secondary">Tirohia mehemea ka taea e koe te utu whakahokia<br/>
              <span>Find out if you could get a rebate</span>
            </h2>
            <p>Use our online calculator</p>
          </section>
          <section>
            <div className="arrow-box primary">
              <div>


                I live at
                <Field
                  name="bla"
                  type="text"
                  component={selectField}
                />
                <Select
                  name="what_is_your_addresss"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  clearable={this.state.clearable}
                  searchable={this.state.searchable}
                  isLoading={isLoadingExternally}
                  options={this.state.properties}
                />

                {this.state.selectedOption &&
                  <Fragment>
                    <div>Who are you?</div>
                    <Select
                      name="what_is_your_name"
                      value={this.state.selectedRatesPayer}
                      onChange={this.handleRatesPayers}
                      clearable={this.state.clearable}
                      searchable={this.state.searchable}
                      labelKey={'fullName'}
                      valueKey={'fullName'}
                      isLoading={isLoadingExternally}
                      options={this.state.ratePayers}
                    />
                    {/* <Field component={Select} /> */}
                    <Field type="text" name="what_is_your_address" id="what_is_your_address" component={renderField} />
                  </Fragment>
                }
                {console.log('staaate', this.state)}
                {/* <div>Your rates are</div> */}
                  {/* <Field type="hidden" name="what_is_your_address" value={this.state.value} component={renderField}
                  label="what_is_your_address"/> */}

                  {/* <Field name="what_is_your_address" onChange={this.fetchProperties} type="text" component={renderField} label="what_is_your_address"/> */}
                  <br/>
                {/* My rates are
                <span><Field
                  name="my_rates"
                  type="text"
                  component={renderField}
                  label="rates"
                /></span><br/>
                I earn
                <span><Field
                  name="i_earn"
                  type="text"
                  component={renderField}
                  label="i_earn"
                /></span>
                a year,<br/>
                and have
                <span><Field
                  name="do_you_have_dependants"
                  type="text"
                  component={renderField}
                  label="do_you_have_dependants"
                  className="int"/></span>
                dependants. */}
              </div>
            </div>
            {/* {console.log('validate',reduxForm({onSubmitSuccess}))} */}
            <div className="arrow-box secondary">
              <p className="heading-paragraph">You are eligible for <span>$620</span></p>
              <p className="heading-paragraph">Assuming you meet the criteria</p>
            </div>


          </section>
          <div className="layout">
            <button type="submit" className="btn-primary">Apply now</button>
          </div>
      <section>
      <div className="arrow-box quote">
      <h3>What is a Rates Rebate?</h3>
      <p>Rates rebates are a subsidy that gives you a discount on the rates bill of
        your residential property.</p>
      <p>Any homeowner may receive a rebate for the property they live in, as long as
        they meet the criteria. This is calculated by your property rates, your income
        for the last tax year, and the number of dependants you have. If you have
        dependants, the upper threshold of your income can be $500 more for each
        dependant in your care. For example, if you have 2 children, the top limit of
        how much you could earn to be entitled to the full rebate would be $1000 more
        than someone with no dependants.</p>
            </div>
      </section>




        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'wizard',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmitFail: (errors) => scrollToFirstError(errors),
})(WizardFormFirstPage);
