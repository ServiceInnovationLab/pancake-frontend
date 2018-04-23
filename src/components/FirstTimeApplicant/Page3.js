import React from 'react';
import { reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import LanguageToggle from '../../components/Forms/LanguageToggle';
import '../../styles/Token.css';
import SignaturePad from 'react-signature-pad';

class Page3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 3,
      signature: ''
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
    return (
      <div className="container">

        <LanguageToggle handler={this.handleLanguageChange} langState={this.state.lng} />
        <h2>Welcome, [name]!</h2>
        <div class="token">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <span>-</span>
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <span>-</span>
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
        </div>
        <p>Please check the following information is correct</p>
        <p>Some text here</p>
        <div className="signature_panel">
          <h3>Applicant Signature</h3>
          <p>Date:</p>
          <SignaturePad
            clearButton="true"
            ref={ref => this.signaturePad = ref}
            style={{border: '1px solid black', height: 0, width: 0}}
          />
        </div>

        <div className="signature_panel">
          <h3>Witness Signature</h3>
          <p>Date: </p>
          <SignaturePad
            clearButton="true"
            ref={ref => this.signaturePad = ref}
            style={{border: '1px solid black', height: 0, width: 0}}
          />
        </div>


        <div>
        <button className="btn-primary">Complete registration</button>
        </div>


      </div>
    )
  }
};

export default Page3;
