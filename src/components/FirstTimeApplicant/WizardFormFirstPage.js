import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import validate from '../../helpers/validate';
import renderField from './renderField';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import ReactAutocomplete from 'react-autocomplete';
// import jsonQuery from 'json-query';
// import RatesRebatesTable from './rates-rebates';
import axios from 'axios';

let localData = require('./newdata').slice(0, 50);

class WizardFormFirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1,
      shown: false,
      complete: false,
      signature: '',
      address: '',
      value: '',
      values: '',
      rebate: 0,
      rates_input: 0,
      i_earn: 0,
      dependents: 0,
      json: [],
      json_value: '',
      loading: false
    };
    this.nextPage = this
      .nextPage
      .bind(this);
    this.previousPage = this
      .previousPage
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
    this.setState({address: e.target.value});
  }

  // getSelect(value) {
  //   let json = JSON
  //     .stringify('https://rates-rebates.firebaseio.com/data.json')
  //     .replace(/\s(?=\w+":)/g, "");
  //   this.setState({value})
  //   let getByLocation = jsonQuery(`data[*Location=${value}]`, {
  //     data: JSON.parse(json)
  //   })
  //   this.setState({values: getByLocation.value})
  // }

  getData = () => {
    this.setState({loading: true})
    let data = {
      "persons": {
        "Tui": {
          "salary": {
            "2018": this.state.i_earn
          },
          "dependants": {
            "2018": this.state.dependents
          }
        }
      },
      "properties": {
        "property_1": {
          "owners": ["Tui"],
          "rates_rebate": {
            "2018": null
          },
          "rates": {
            "2018": this.state.rates_input
          }
        }
      }
    };
    axios
      .post('https://openfisca-aotearoa.herokuapp.com/calculate', data)
      .then(res => this.setState({rebate: res.data.properties.property_1.rates_rebate['2018'], loading: false}))
      .catch(err => console.log('Error occurred', err));
  }

  setValues(state, e) {
    this.setState({state: e.target.value})
    if (state === 'dependents') {
      this.getData();
    }
  }
  componentWillMount(){
    console.log('some local data', localData)
    // axios
    //   .get('https://rates-rebates.firebaseio.com/data.json')
    //   .then(res => this.setState({json: res.data}))
    //   .catch(err => console.log('Error occurred', err));
    this.setState({json: localData})
  }


  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="container autocomplete-form">
        {/* {console.log('inside renderrrr', this.state.json)} */}
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
                <span className="address-autocomplete">
                    <ReactAutocomplete
                      items={this.state.json}
                      shouldItemRender={(item, value) => item.Location.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.Location}
                      renderItem={(item, highlighted) =>
                        <div
                          key={item.id}
                          style={{
                            fontSize: '20px',
                            padding: '10px',
                            position: 'absolute !important',
                            backgroundColor: highlighted
                              ? '#6dca7f'
                              : 'transparent'
                        }}>
                          {item.Location}
                        </div>
                      }
                      value={this.state.value}
                      onChange={e => this.setState({ value: e.target.value })}
                      onSelect={value => this.setState({ value })}
                      inputProps={{name: 'what_is_your_address', autocomplete: 'off'}}
                    />
                </span>
                {/* {console.log(this.props.formState)} */}
                {/* {this.state.json &&
                <ReactAutocomplete
                  getItemValue={(item) => item['Location']}
                  items={[
                    this.state.json
                  ]}
                  renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item['Location']}
                    </div>
                  }
                  value={this.state.json_value}
                  onChange={e => this.getValues()}
                    onSelect={value => this.getSelect(value)}
                />} */}

                <div className="calculate-field">
                  My rates are
                  <span><Field
                    name="my_rates"
                    type="text"
                    component={renderField}
                    label="rates"
                    onChange={e => this.setValues('my_rates', e)}/></span>
                </div>
                <div className="calculate-field">
                  I earn
                  <span><Field
                    name="i_earn"
                    type="text"
                    component={renderField}
                    label="i_earn"
                    onChange={e => this.setValues('i_earn', e)}/></span>
                  a year,</div>
                <div className="calculate-field">
                  and have
                  <span>
                    <Field
                      name="do_you_have_dependants"
                      type="text"
                      component={renderField}
                      label="do_you_have_dependants"
                      className="int"
                      onChange={e => this.setValues('dependents', e)}/>
                  </span>
                  dependants.
                </div>
              </div>
            </div>
            {this.state.loading && <p>Loading</p>}
            <div className="arrow-box secondary">
              <h2 className="heading">You are eligible for <strong>${this.state.rebate}</strong>
              </h2>
              <p>Assuming you meet the criteria</p>
            </div>

          </section>
          {this.state.rebate !== 0 && <div className="layout">
            <button type="submit" className="btn-primary">Apply now</button>
          </div>}
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmitFail: (errors) => scrollToFirstError(errors)
})(WizardFormFirstPage);

WizardFormFirstPage = connect(state => {
  return {formState: state, validate}
})(WizardFormFirstPage)
