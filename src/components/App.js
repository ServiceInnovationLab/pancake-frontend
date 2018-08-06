import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import {Link} from 'react-router-dom';

export class App extends Component {

  handleLanguageChange = lang => {
    this.setState({lng: lang});
  }

  render() {
    return (
      <Fragment>
        <div></div>
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
