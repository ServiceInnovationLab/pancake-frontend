import React from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from '../../helpers/validate';
import renderField from './renderField';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import ReactAutocomplete from 'react-autocomplete';
import jsonQuery from 'json-query';
import RatesRebatesTable from './rates-rebates';

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
      values: ''
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

  getValues(e){
    this.setState({ value: e.target.value });
  }

  getSelect(value){
    let json = JSON.stringify(RatesRebatesTable).replace(/\s(?=\w+":)/g, "");
    this.setState({ value })
    let getByLocation = jsonQuery(`data[*Location=${value}]`, {
      data: JSON.parse(json)
    })
    this.setState({values: getByLocation.value})
    // console.log('in getSelect()', getByLocation.value)
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
                {console.log(this.state.values)}


                I live at
                <span>
                <ReactAutocomplete
                  items={JSON.parse(JSON.stringify(RatesRebatesTable.data).replace(/\s(?=\w+":)/g, ""))}
                  shouldItemRender={(item, value) => item['Location'].toLowerCase().indexOf(value.toLowerCase()) > -1}
                  getItemValue={item => item['Location']}
                  renderItem={(item, highlighted) =>
                    <div
                      key={item.id}
                      style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                    >
                      {item['Location']}
                    </div>
                  }
                  value={this.state.value}
                  onChange={e => this.getValues()}
                  onSelect={value => this.getSelect(value)}
                />
                  </span>
                  {/* <Field type="hidden" name="what_is_your_address" value={this.state.value} component={renderField}
                  label="what_is_your_address"/> */}
                  <span>
                  <Field name="what_is_your_address" type="text" component={renderField} label="what_is_your_address"/>
                  </span><br/>
                My rates are
                {console.log(this.state.values)}
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
                dependants.
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmitFail: (errors) => scrollToFirstError(errors),
})(WizardFormFirstPage);
