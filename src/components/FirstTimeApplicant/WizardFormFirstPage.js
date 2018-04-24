import React from 'react';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import validate from '../../helpers/validate';
import renderField from './renderField';

class WizardFormFirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1,
      shown: false,
      complete: false,
      signature: ''
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
  render(){
    const {handleSubmit} = this.props;
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
                <span><Field name="what_is_your_address" type="text" component={renderField} label="what_is_your_address"/></span><br/>
                My rates are
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
})(WizardFormFirstPage);
