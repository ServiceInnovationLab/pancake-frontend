import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import validate from '../../helpers/validate';
import {scrollToFirstError} from '../../components/Forms/FormScroll';
import LanguageToggle from '../../components/Forms/LanguageToggle';
import {underscorize, camelCaser} from '../../helpers/strings';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import axios from 'axios';
import config from '../../config';

class SelectingFormValuesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1,
      shown: false
    };
    this.nextPage = this
      .nextPage
      .bind(this);
    this.previousPage = this
      .previousPage
      .bind(this);
    this.saveFormData = this
      .saveFormData
      .bind(this)
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  }

  handleLanguageChange = lang => {
    this.setState({lng: lang});
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  saveFormData(values) {
    let data = {
      "type": "rebate-forms",
      "attributes": {
        "valuation_id": "123",
        "fields": values
      }
    };

    console.log('da', config.API_ORIGIN)
    axios
      .post(`${config.API_ORIGIN}/api/v1/rebate_forms`, { data })
      .then(res => window.location.href = '#/page2')
      .catch(err => console.log('Error occured', err));
  }

  render() {
    let shown = {
      display: this.state.shown
        ? "block"
        : "none"
    };
    let lang = this.state.lng;
    const {handleSubmit} = this.props;
    return (
      <Fragment>
        <LanguageToggle handler={this.handleLanguageChange} langState={this.state.lng}/>
        <form className="container" onSubmit={handleSubmit(this.saveFormData)}>
          <h1>What you will need to do to apply for a rebate</h1>
          <ul>
            <li>Fill out this form,</li>
            <li>Provide evidence of income for the previous tax year,</li>
            <li>Make a declaration in front of an authorised witness (you can do this by
              visiting your local council service centre).</li>
          </ul>

          <div
            onClick={this
            .toggle
            .bind(this)}
            className="accordian">It is an offence to knowingly make a false statement in your application.</div>
          <div style={shown}>
            <ol className="terms" style={{
              paddingLeft: '0'
            }}>
              <li>Every person commits an offence who
                <ol>
                  <li>for the purpose of obtaining any rates rebate under this Act, for himself or
                    for any other person, makes any statement or declaration knowing it to be false
                    in any particular, or wilfully misleads or attempts to mislead any person
                    concerned in the administration of this Act or any other person whatsoever; or
                  </li>
                  <li>refuses or fails to comply with any requirement under section 11, or refuses
                    or fails to answer any question put to him pursuant to that section, or
                    knowingly gives any false or misleading answer to any such question.</li>
                </ol>
              </li>
              <li>Every person who commits an offence against this Act is liable on conviction
                before a District Court Judge to imprisonment for a term not exceeding 12 months
                or to a fine not exceeding $500, or to both.</li>
            </ol>
          </div>

          <h2 style={{
            marginTop: '60px'
          }}>Apply for a rebate</h2>
          <p>This is for the 2017/2018 rating year</p>
          {firstTimeApplication.map((field, key) => {
            let label = field.label[lang].text;
            return (<Field
              key={key}
              label={label}
              name={field.isNested
              ? `has${camelCaser(label)}Checked`
              : underscorize(field.label['en'].text)}
              component={field.component}
              instructions={field.instructions && field.instructions[lang].text}
              instructionsSecondary={field.instructionsSecondary && field.instructionsSecondary[lang].text}
              hasValue={this.props[`has${camelCaser(label)}Value`]}
              accordianLabel={field.accordianLabel && field.accordianLabel[lang].text}
              accordianText={field.accordianText && field.accordianText[lang].text}
              checkboxLabel={field.checkboxLabel && field.checkboxLabel[lang].text}
              checkboxText={field.checkboxText && field.checkboxText[lang].text}
              options={field.options && field.options[lang].text}
              optionsText={field.optionsText && field.optionsText[lang].text}
              textFieldLabel={field.textFieldLabel && field.textFieldLabel[lang].text}
              placeholder={field.placeholder && field.placeholder[lang].text}
              hasAddressFinder={field.hasAddressFinder}/>);
          })}
          <div>
            <h3>We have calculated that you could be eligible for
              <span>$XXX</span>
            </h3>
            <p>This is indicative only and may differ from the final rebate once the
              application is processed fully.</p>
          </div>

          <div>
            <button type="submit" disabled={this.props.submitting} className="btn-primary">
              Send Application
            </button>
          </div>
        </form>

      </Fragment>
    );
  };
}

SelectingFormValuesForm = reduxForm({
  onSubmitFail: (errors) => scrollToFirstError(errors),
  form: 'selectingFormValues'
})(SelectingFormValuesForm);

SelectingFormValuesForm = connect(state => {
  return { validate };

})(SelectingFormValuesForm);

export default SelectingFormValuesForm;
