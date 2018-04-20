import React from 'react';
import Page1 from './Page1';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this
      .nextPage
      .bind(this);
    this.previousPage = this
      .previousPage
      .bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage() {
    this.setState({
      page: this.state.page - 1
    });
  }

  render() {
    const {page} = this.state;
    return (
      <div>
        {page === 1 && (<Page1/>)}
      </div>
    );
  }
}

export default Landing;
