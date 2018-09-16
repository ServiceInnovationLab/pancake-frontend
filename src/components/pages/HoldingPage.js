import React, { Component } from 'react';

class HoldingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <p>
          This service is still in testing and development phase (Alpha) and is
          currently having some improvements made. Come back in a week or two. :-D
        </p>

        <p>
          Below is
          a video of the first iteration of the service so you can see what it is like.
          It has been designed around comprehensive research about the needs of people
          who are eligible for the rebate, many of whom don’t even know it!
        </p>

        <p>
          <iframe title="Screen cast of app" width="560" height="315" src="https://www.youtube.com/embed/hXoTlS9FIfg"
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
          >
          </iframe>
        </p>

        <p>
          The Rates Rebates Alpha was tested in Tauranga in May/June 2018 for the final
          applicants to the 2017-18 rating year. The testing went well with users and
          Council staff, and is currently offline for a couple of weeks whilst we integrate
          some improvements from the first testing phase. We have had requests from some
          Councils to extend the testing for another few months to ensure the approach
          works across different Councils and communities, so we will be putting a 2018-19
          rating year version of the service up by the end of July for participating
          Councils to test in August and September.
        </p>

        <p>
          If you are in a Council and are interested in participating in the extended
          Alpha in August/September, please contact <a href="mailto:Siobhan.mccarthy@dia.govt.nz">Siobhan.mccarthy@dia.govt.nz.</a>
        </p>
      </div>
    );
  }
}

export default HoldingPage;
