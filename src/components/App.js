import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import '../styles/App.css';
import FirstTimeApplicant1 from './FirstTimeApplicant/Page1';
import FirstTimeApplicant2 from './FirstTimeApplicant/Page2';
import FirstTimeApplicant3 from './FirstTimeApplicant/Page3';

class App extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <FirstTimeApplicant1 onSubmit={this.nextPage} />}
        {page === 2 && (
          <FirstTimeApplicant2
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <FirstTimeApplicant3
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, actionCreators)(App);
