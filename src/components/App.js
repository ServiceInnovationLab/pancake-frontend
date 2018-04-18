import React, { Component } from 'react';
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
      <div className="container">
        <section>
          <h1>The Rates Rebate Scheme provides a discount to low-income<br/> homeowners on the cost of their rates.</h1>
          <p>If you are a low-income homeowner you could get a discount or partial refund of up to $620 on your property rates.</p>

          <Link className="btn btn-primary" to='/apply'>Apply now</Link>
        </section>

        <section>
          <h3>What is a Rates Rebate?</h3>
          <p>
          Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.<br />
            <a className="external-link"><span>Learn more about Rates rebates.</span></a></p>
        </section>

        <section>
          <h3>Who can get a rates rebates?</h3>
          <p>Anyone can receive a rebate for the property they live in, as long as they met the criteria.</p>
          <ul>
            <li>You must live in the property for the rebate you are applying for. You can only get a rebate for one property that you own.</li>
            <li>You must be the title holder</li>
            <li>Have income?</li>
          </ul>
          <a className="external-link"><span>Learn more about Rates rebates.</span></a>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, actionCreators)(App);
