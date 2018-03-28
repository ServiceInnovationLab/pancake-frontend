import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from '../../helpers/validate';
import { scrollToFirstError } from '../../components/Forms/FormScroll';
import LanguageToggle from '../../components/Forms/LanguageToggle';
import { underscorize, camelCaser } from '../../helpers/strings';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import firstTimeApplication from '../../JSONFormData/FirstTimeApplication';

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

  render() {
    let lang = this.state.lng;
    return (
      <Fragment>
        <LanguageToggle handler={this.handleLanguageChange} langState={this.state.lng} />
        <form className="container" onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

  return {
    hasSuperAnnuationValue,
    hasWageOrSalaryValue,
    hasLivedHereValue,
    hasPartnerValue,
    hasJobSeekerBenefitValue,
    hasSupportedLivingValue,
    hasSelfEmployedValue,
    hasOtherValue,
    validate
  };

})(SelectingFormValuesForm);

export default SelectingFormValuesForm;
