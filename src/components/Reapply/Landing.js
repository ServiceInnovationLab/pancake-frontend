import React from 'react'
import Page1 from './Page1';
import Page2 from './Page2';

class Landing extends React.Component {
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
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 && <Page1 onSubmit={this.nextPage} />}
        {page === 2 && (
          <Page2
            previousPage={this.previousPage}
            onSubmit={this.onSubmit}
          />
        )}
      </div>
    )
  }
}

export default Landing;
