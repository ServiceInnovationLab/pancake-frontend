import React, { Component } from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

class AppCon extends Component {

  render() {
    return (
      // <main>
      <App />
      // </main>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(AppCon);
