import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from '../../helpers/validate';
import { scrollToFirstError } from '../../components/Forms/FormScroll';
import LanguageToggle from '../../components/Forms/LanguageToggle';
import { underscorize, camelCaser } from '../../helpers/strings';
// import { RenderCheckbox } from '../Forms/RenderCheckbox';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';
import knownOffence from '../../JSONFormData/KnownOffenceData';

class SelectingFormValuesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 'en',
      page: 1,
      shown: false
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

  toggle() {
		this.setState({
			shown: !this.state.shown
		});
  }

  options = () => {
    return [
      {
        'options': {
          'en': {
            'text': ['Single - Living alone', 'Single - Sharing']
          },
          'mi': {
            'text': ['Single - Living alone', 'Single - Sharing']
          }
        }
      }
    ]
  }
  render() {
    let shown = {
			display: this.state.shown ? "block" : "none"
    };
    let lang = this.state.lng;
    return (
      <Fragment>
        <LanguageToggle handler={this.handleLanguageChange} langState={this.state.lng} />
        {/* <form className="container" onSubmit={this.props.handleSubmit(values => console.log(values))}> */}
        <form className="container" onSubmit={this.props.handleSubmit}>
          <h1>What you will need to do to apply for a rebate</h1>
          <ul>
            <li>Fill out this form,</li>
            <li>Provide evidence of income for the previous tax year,</li>
            <li>Make a declaration in front of an authorised witness (you can do this by visiting your local council service centre).</li>
          </ul>

          <div
            onClick={this.toggle.bind(this)}
            className="accordian">It is an offence to knowingly make a false statement in your application.</div>
          <div style={ shown }>
          <ol className="terms" style={{paddingLeft: '0'}}>
          <li>Every person commits an offence who
          <ol>
            <li>for the purpose of obtaining any rates rebate under this Act, for himself or for any other person, makes any statement or declaration knowing it to be false in any particular, or wilfully misleads or attempts to mislead any person concerned in the administration of this Act or any other person whatsoever; or
            </li>
            <li>refuses or fails to comply with any requirement under section 11, or refuses or fails to answer any question put to him pursuant to that section, or knowingly gives any false or misleading answer to any such question.</li>
          </ol>
          </li>
          <li>Every person who commits an offence against this Act is liable on conviction before a District Court Judge to imprisonment for a term not
exceeding 12 months or to a fine not exceeding $500, or to both.</li>
        </ol>
          </div>


          <h2 style={{marginTop: '60px'}}>Apply for a rebate</h2>
          <p>This is for the 2017/2018 rating year</p>
          {firstTimeApplication.map((field, key) => {
            let label = field.label[lang].text;
            return (
              <Field
                key={key}
                label={label}
                name={field.isNested ? `has${camelCaser(label)}Checked` : underscorize(field.label['en'].text)}
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
                hasAddressFinder={field.hasAddressFinder}
                // key={key}
                // label={label}
                // name={field.isNested ? `has${camelCaser(label)}Checked` : underscorize(field.label['en'].text)}
                // isRequired={field.isRequired}
                // component={field.component}
                // instructions={field.instructions && field.instructions[lang].text}
                // options={field.options && field.options[lang].text}
                // hasValue={this.props[`has${camelCaser(label)}Value`]}
                // hasHeader={field.hasHeader}
                // hasTextField={field.hasTextField && field.hasTextField}
                // hasChildren={field.hasChildren}
                // hasAddressFinder={field.hasAddressFinder}
                // hasExtraInfo={field.hasExtraInfo}
                // extraInfoLabel={field.extraInfo ? field.extraInfo.label[lang].text : null}
                // extraInfoContent={field.extraInfo ? '' : ''}
              />
            );
          })}
          <div>
          <h3>We have calculated that you could be eligible for <span>$XXX</span></h3>
        <p>This is indicative only and may differ from the final rebate once the application is processed fully.</p>
        </div>

          <div>
            <button type="submit"
              disabled={this.props.submitting}
              className="btn-primary"> Send Application
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

const selector = formValueSelector('selectingFormValues');
SelectingFormValuesForm = connect(state => {
//   const hasSuperAnnuationValue = selector(state, 'hasSuperAnnuationChecked');
//   const hasTestValue = selector(state, 'hasTestChecked');
//   const hasWageOrSalaryValue = selector(state, 'hasWageOrSalaryChecked');
//   const hasLivedHereValue = selector(state, 'hasLivedHereChecked');
//   const hasJobSeekerBenefitValue = selector(state, 'hasJobSeekerBenefitChecked');
//   const hasOtherValue = selector(state, 'hasOtherChecked');
//   const hasPartnerValue = selector(state, 'hasPartnerChecked');
//   const hasSupportedLivingValue = selector(state, 'hasSupportedLivingChecked');
//   const hasSelfEmployedValue = selector(state, 'hasSelfEmployedChecked');
//   const hasOffensenoticeValue= selector(state, 'hasOffensenoticeChecked');

  return {
//     hasTestValue,
//     hasSuperAnnuationValue,
//     hasWageOrSalaryValue,
//     hasLivedHereValue,
//     hasPartnerValue,
//     hasJobSeekerBenefitValue,
//     hasSupportedLivingValue,
//     hasSelfEmployedValue,
//     hasOtherValue,
//     hasOffensenoticeValue,
    validate
  };

})(SelectingFormValuesForm);

export default SelectingFormValuesForm;
