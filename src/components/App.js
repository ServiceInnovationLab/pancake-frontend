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
      <div>
        <div className="container">
          <h1>The Rates Rebate Scheme provides a discount to low-income homeowners on the cost of their rates.</h1>
          <p>If you have a low income and pay the rates on your home, you could get a rebate or reduction of up to $620.</p>

            <div>
              <h2>First time applicant?</h2>
              <Link className="btn btn-primary" to={'apply'}>Apply now</Link>
            </div>

            <section className="speech-bubble">
              <h3>What is a Rates Rebate?</h3>
              <p>
                Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property. Anyone can receive a rebate for the property they live in, as long as they met the criteria.<br />
                <a className="external-link"><span>Learn more about Rates rebates.</span></a></p>
            </section>
        </div>
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
