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
    let lang = this.state.lng;
    return (
      <Fragment>
        <LanguageToggle handler={this.handleLanguageChange} langState={this.state.lng} />
        <form className="container" onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <h1>What you will need to do to apply for a rebate</h1>
          <ul>
            <li>Fill out this form,</li>
            <li>Provide evidence of income for the previous tax year,</li>
            <li>Make a declaration in front of an authorised witness (you can do this by visiting your local council service centre).</li>
          </ul>
          {knownOffence.map((field, key) => {
            let label = field.label[lang].text;
            return <Field
              key={key}
              label={label}
              name={field.isNested ? `has${camelCaser(label)}Checked` : underscorize(field.label['en'].text)}
              isRequired={field.isRequired}
              component={field.component}
              instructions={field.instructions && field.instructions[lang].text}
              options={field.options && field.options[lang].text}
              hasValue={this.props[`has${camelCaser(label)}Value`]}
              hasHeader={field.hasHeader}
              hasTextField={field.hasTextField && field.hasTextField}
              hasChildren={field.hasChildren}
              hasAddressFinder={field.hasAddressFinder}
              hasPlainTextField={field.hasPlainTextField}
              theme="square"
              text={field.text[lang].text}
            />
          })}
          <h2>Apply for a rebate</h2>
          <p>This is for the 2017/2018 rating year</p>
          {firstTimeApplication.map((field, key) => {
            let label = field.label[lang].text;
            return (
              <Field
                key={key}
                label={label}
                name={field.isNested ? `has${camelCaser(label)}Checked` : underscorize(field.label['en'].text)}
                isRequired={field.isRequired}
                component={field.component}
                instructions={field.instructions && field.instructions[lang].text}
                options={field.options && field.options[lang].text}
                hasValue={this.props[`has${camelCaser(label)}Value`]}
                hasHeader={field.hasHeader}
                hasTextField={field.hasTextField && field.hasTextField}
                hasChildren={field.hasChildren}
                hasAddressFinder={field.hasAddressFinder}
                hasExtraInfo={field.hasExtraInfo}
                extraInfoLabel={field.extraInfo ? field.extraInfo.label[lang].text : null}
                extraInfoContent={field.extraInfo ? '' : ''}
              />
            );
          })}
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
  const hasSuperAnnuationValue = selector(state, 'hasSuperAnnuationChecked');
  const hasWageOrSalaryValue = selector(state, 'hasWageOrSalaryChecked');
  const hasLivedHereValue = selector(state, 'hasLivedHereChecked');
  const hasJobSeekerBenefitValue = selector(state, 'hasJobSeekerBenefitChecked');
  const hasOtherValue = selector(state, 'hasOtherChecked');
  const hasPartnerValue = selector(state, 'hasPartnerChecked');
  const hasSupportedLivingValue = selector(state, 'hasSupportedLivingChecked');
  const hasSelfEmployedValue = selector(state, 'hasSelfEmployedChecked');
  const hasOffensenoticeValue= selector(state, 'hasOffensenoticeChecked');

  return {
    hasSuperAnnuationValue,
    hasWageOrSalaryValue,
    hasLivedHereValue,
    hasPartnerValue,
    hasJobSeekerBenefitValue,
    hasSupportedLivingValue,
    hasSelfEmployedValue,
    hasOtherValue,
    hasOffensenoticeValue,
    validate
  };

})(SelectingFormValuesForm);

export default SelectingFormValuesForm;
