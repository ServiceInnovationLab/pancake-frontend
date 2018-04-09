import React from 'react';
import { reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import LanguageToggle from '../../components/Forms/LanguageToggle';

class Page2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleLanguageChange = lang => {
    this.setState({lng: lang});
  }

  render() {
    return(
      <div className="container">

        <LanguageToggle handler={this.handleLanguageChange} langState={this.state.lng} />

        <h2>What to do next</h2>

        <p>Your application form has been sent to your local council - now you have to make a declaration for your rebate to be processed.</p>

        <p>To do this you can visit one of your local council’s service centres during opening hours and let the staff at the service desk know you are there to sign your rates rebates form.</p>

        <p>Bring some photo ID, such as a drivers licence or passport, to prove who you are.</p>

        <p>Once you have signed the form, your rebate will be processed and applied if it is successful.</p>

        <p>Make sure to bring along your income evidence.</p>
        <p>What proof of income do I need?</p>
        <p>Satisfactory proof of income includes:</p>
        <ul>
          <li>income confirmation from Work and Income</li>
          <li>income confirmation from Inland Revenue</li>
          <li>investment earning statements for the tax year</li>
          <li>statement of earnings from your employer.</li>
        </ul>

        <p>Additionally for self-employed people:</p>
        <p>a copy of your complete set of financial accounts, IR3B or IR10
        you provided to Inland Revenue for the income year 1 April 2016 to
        31 March 2017</p>
        <ul>
          <li>you cannot offset business losses against other income</li>
          <li>business losses should be entered as $0.</li>
        </ul>


        <p>Find my nearest service centre</p>
        [INSERT API HERE]

        <p>Download my application</p>
        <p>This is a copy of how you answered the questions, that you can keep for your records if you want to. This will also be emailed to you.</p>

        <p>If you can't make it to the service centre</p>
        <p>Print out the application emailed to you,
        Contact an approved person, who can then take your code and witness your declaration to complete the application. This will then be sent to your council.</p>
        <p>Find a witness here</p>
        {/* TODO */}
        {/* <p>[Who can witness a declaration?+
        If:clicked / You need to confirm on the form that the information you've provided is true. You do this by signing it in front of an authorised witness. People who can authorise your signature include: */}

        an authorised council officer
        a Justice of the Peace (JP)
        a chartered accountant, or
        a minister of religion. Persons authorised to witness the rates rebate form application (PDF 36KB)
        Find a JP ]


        Mt Maunganui Library
        Address: 398 Maunganui Rd, Mount Maunganui, Tauranga 3116
        Hours:
        Mon-Fri 9am-5pm
        Saturday 9:30am-4pm
        Sunday Closed
        Phone: 07-577 7177

        How did you find this service? Please let us know here


      </div>
    )
  }
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Page2);
