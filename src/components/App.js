import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import '../styles/App.css';
import '../styles/Button.css';
import {Link} from 'react-router-dom';

export class App extends Component {

  handleLanguageChange = lang => {
    this.setState({lng: lang});
  }

  render() {
    return (
      // <div className="container">
      //   <section>
      //     <h1>The Rates Rebate Scheme provides a discount to low-income<br/> homeowners on the cost of their rates.</h1>
      //     <p>If you are a low-income homeowner you could get a discount or partial refund of up to $620 on your property rates.</p>

      //     <Link className="btn btn-primary" to='/apply'>Apply now</Link>
      //   </section>

      //   <section>
      //     <h3>What is a Rates Rebate?</h3>
      //     <p>
      //     Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.<br />
      //       <a className="external-link"><span>Learn more about Rates rebates.</span></a></p>
      //   </section>

      //   <section>
      //     <h3>Who can get a rates rebates?</h3>
      //     <p>Anyone can receive a rebate for the property they live in, as long as they met the criteria.</p>
      //     <ul>
      //       <li>You must live in the property for the rebate you are applying for. You can only get a rebate for one property that you own.</li>
      //       <li>You must be the title holder</li>
      //       <li>Have income?</li>
      //     </ul>
      //     <a className="external-link"><span>Learn more about Rates rebates.</span></a>
      //   </section>
      // </div>
      <Fragment>
        <div className="container">
          <h1>If you are a low-income homeowner you could get a discount or partial refund of up to $620 on your property rates with a rates rebate.</h1>
          <h2>Find out if you could get a rebate</h2>
          <p>Enter your details here to check the eligibility before you apply</p>

          <div>
            I live at <span><input type="text" /></span><br/>
            My rates are <span>$2,222.45</span>
            I earn <span>$34,000</span> a year,
            and have <span>0</span> dependants.
          </div>

          <div>
            <h2>You are eligible for $620</h2>
            <p>Assuming you meet the criteria</p>
          </div>

          <div>
            <h2>What is a Rates Rebate?</h2>
            <p>Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.</p>
            <p>Any homeowner may receive a rebate for the property they live in, as long as they meet the criteria. This is calculated by your property rates, your income for the last tax year, and the number of dependants you have. If you have dependants, the upper threshold of your income can be $500 more for each dependant in your care. For example, if you have 2 children, the top limit of how much you could earn to be entitled to the full rebate would be $1000 more than someone with no dependants.</p>
          </div>

          <button className="btn-primary">Apply now</button>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, actionCreators)(App);
