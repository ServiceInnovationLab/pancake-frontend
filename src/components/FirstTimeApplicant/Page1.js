// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
// import validate from '../../helpers/validate';
// import firstTimeApplication from "../../JSONFormData/FirstTimeApplication";
// import TextField from '../Forms/TextField';
// import RadioGroup from '../Forms/RadioGroup';
// import CheckboxGroup from '../Forms/CheckboxGroup';
// import AddressFinder from '../Forms/AddressFinder';

// class Page1 extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 'en',
//       page: 1
//     };
//     this.nextPage = this.nextPage.bind(this);
//     this.previousPage = this.previousPage.bind(this);
//   }

//   nextPage = () => {
//     this.setState({ page: this.state.page + 1 });
//   }

//   previousPage = () => {
//     this.setState({ page: this.state.page - 1 });
//   }

//   handleFieldType = type => {
//     switch(type) {
//     case 'radio':
//       return RadioGroup;
//     case 'checkbox':
//       return CheckboxGroup;
//     default:
//       return TextField;
//     }
//   }

//   handleLanguageChange = lang => {
//     this.setState({lng: lang});
//   }

//   render() {

//     const { handleSubmit, submitting } = this.props;

//     return(
//       <div className="container">

//         <div className="btn-group">
//           <a onClick={()=>{this.handleLanguageChange('en');}} className={this.state.lng === 'en' ? 'btn active' : 'btn'}>English</a>
//           <a onClick={()=>{this.handleLanguageChange('ma');}} className={this.state.lng === 'ma' ? 'btn active' : 'btn'}>Māori</a>
//         </div>

//         <h1>Apply for a Rebate</h1>

//         <form name="wizard" onSubmit={handleSubmit((values) => console.log(values))}>
//           <Field
//             data={this.props}
//             component={AddressFinder}
//             type="search"
//             name="address"
//             placeholder="Enter a Location"
//             className="address-finder-input"
//             id="address_field"
//             isRequired={true}
//           />
//           {firstTimeApplication.map((field, key) => (
//             <Field
//               key={key}
//               label={field.question}
//               name={field.name}
//               instructions={field.instructions}
//               isRequired={true}
//               component={this.handleFieldType(field.type)}
//               options={field.options && field.options}
//               lang={this.state.lng}
//               id={field.name}
//             />
//           ))}

//           <div>
//             <button type="submit" disabled={submitting}>Submit</button>
//           </div>

//         </form>
//       </div>
//     )
//   }
// };



// export default reduxForm({
//   form: 'wizard',
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true,
//   validate
// })(Page1);


/*

TODO:
  1. click super annuation
  select an option
  click submit
  uncheck super annuation
  click submit
  click super annuation again
  click submit
  there should be an error

  2. need error messages for otherIncome

*/
import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from '../../helpers/validate';
import '../../styles/TextField.css';
import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import { scroller } from 'react-scroll';

let SelectingFormValuesForm = props => {
  const {
    hasSuperAnnuationValue,
    hasWageOrSalaryValue,
    hasOtherValue,
    handleSubmit,
    submitting
  } = props;
  // console.log(props)
  return (
    <form className="container" onSubmit={handleSubmit(values => console.log(values))}>

      <Field
        label="What is your name?"
        name="fullName"
        isRequired={true}
        component={RenderTextField}
      />

      <Field
        label="What is your address?"
        name="address"
        isRequired={true}
        instructions="Please use the name you use on the property title"
        component={RenderTextField}
      />

      <Field
        label="Did you live here at 1st July?"
        name="hasLivedHere"
        isRequired={true}
        options={['yes', 'no']}
        component={RenderRadio}
      />

      <Field
        label="Do you have a partner or joint homeowner who lives with you?"
        name="isJointOwner"
        isRequired={true}
        instructions="'Partner' is a person you are married to/in a civil union, or de facto relationship with."
        options={['yes', 'no']}
        component={RenderRadio}
      />


      <fieldset className="checkbox-group">
        <legend>Income</legend>
        <p>Select any you receive</p>
      </fieldset>

      <Field
        name="hasSuperAnnuationChecked"
        nestedFieldName="hasSuperAnnuationNestedValue"
        component={RenderCheckbox}
        label="Super Annuation"
        isRequired={true}
        hasValue={hasSuperAnnuationValue}
        options={['Single - Living alone', 'Single - Sharing']}
      />

      <Field
        name="hasJobSeekerBenefitChecked"
        component={RenderCheckbox}
        label="Job Seeker"
        isRequired={true}
      />

      <Field
        name="hasSoleParentsChecked"
        component={RenderCheckbox}
        label="Sole Parents"
        isRequired={true}
      />


      <Field
        name="hasSupportedLivingChecked"
        component={RenderCheckbox}
        label="Supported Living"
        isRequired={true}
      />

      <Field
        name="hasSelfEmployedChecked"
        component={RenderCheckbox}
        label="Self Employed"
        isRequired={true}
      />

      <Field
        name="hasWageOrSalaryChecked"
        nestedFieldName="hasWageOrSalaryNestedValue"
        component={RenderCheckbox}
        label="Wage or Salary"
        isRequired={true}
        hasValue={hasWageOrSalaryValue}
        hasTextField={true}
      />

      <Field
        name="hasOtherChecked"
        nestedFieldName="hasOtherNestedValue"
        component={RenderCheckbox}
        label="Other"
        isRequired={true}
        hasValue={hasOtherValue}
        hasChildren={true}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn-primary">
          Send Application
        </button>
      </div>

    </form>
  );
};

const RenderTextField = fields => {
  return <div className="input-group">
    <label>
      <span>{fields.label}</span>
      {fields.isRequired && <span className="aria-hidden">(required)</span>}
    </label>
    {fields.instructions && <p>{fields.instructions}</p>}
    <div>
      <input {...fields.input} type="text" />
      {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
        <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
      }
    </div>
  </div>;
};

const RenderRadio = fields => {
  const {label, isRequired, instructions, options, input} = fields;

  return <fieldset className="radio-group">
    {label && <legend>
      {label}
      {isRequired && <span className="aria-hidden">(required)</span>}
    </legend>}
    {instructions && <p>{instructions}</p>}
    {!instructions && <p></p>}
    <div>
      <div>
        {options && options.map((item, key) => {
          return <label key={key}>
            <input {...input} type="radio" value={item} />
            <span>{item}</span>
          </label>;
        })}
      </div>
    </div>
    {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
      <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
    }
  </fieldset>;
};


const RenderCheckbox = props => {
  return <fieldset className="checkbox-group">
    <label>
      <input {...props.input} type="checkbox" />
      {props.label && <span>{props.label}</span>}
    </label>
    {props.hasValue && props.options && (
      <div className="radio-group">
        <Field
          name={props.nestedFieldName}
          isRequired={true}
          options={props.options}
          component={RenderRadioCheckbox}
        />
      </div>
    )}
    {props.hasValue && props.hasTextField &&
      <Field
        name={props.nestedFieldName}
        isRequired={true}
        component={RenderRadioTextField}
      />
    }
    {props.hasValue && props.hasChildren &&
      <FieldArray name="otherIncome" component={renderOtherIncome} />
    }
  </fieldset>;
};

const RenderRadioCheckbox = fields => {
  const {label, options, input} = fields;
  return <div>
    <div className="nested-field">
      {options && options.map((item, key) => {
        return <label className="checkbox-radio" key={key}>
          <input
            {...input}
            type="radio"
            value={item}
          />
          <span>{item}</span>
        </label>;
      })}
    </div>
    {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
      <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
    }
  </div>;
};

const RenderRadioTextField = fields => {
  const {input} = fields;
  return <div>
    <div className="nested-field">
      <input
        {...input}
        type="number"
        style={{width: '100%', margin: '0'}}
      />

      {fields.meta !== undefined && fields.meta.touched && fields.meta.error &&
        <span className="error"><strong>Error: </strong>{fields.meta.error}</span>
      }
    </div>
  </div>;
};


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
  const fullNameValue = selector(state, 'fullName');
  const addressValue = selector(state, 'address');

  return {
    hasSuperAnnuationValue,
    hasWageOrSalaryValue,
    fullNameValue,
    addressValue,
    hasLivedHereValue,
    hasPartnerValue,
    hasJobSeekerBenefitValue,
    hasSupportedLivingValue,
    hasSelfEmployedValue,
    hasOtherValue,
    validate
  };
})(SelectingFormValuesForm);


export function scrollToFirstError(errors) {
  const errorFields = getErrorFieldNames(errors);

  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = `${errorFields[i]}`;

    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -200, smooth: true });
      break;
    }
  }
}

function getErrorFieldNames(obj, name = '') {
  const errorArr = [];
  errorArr.push(Object.keys(obj).map((key) => {
    const next = obj[key];
    if (next) {
      if (typeof next === 'string') {
        return name + key;
      }
      if (next.map) {
        errorArr.push(next.map((item, index) => getErrorFieldNames(item, `${name}${key}[${index}].`)).filter(o => o));
      }
    }
    return null;
  }).filter(o => o));
  return flatten(errorArr);
}

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label><span className="aria-hidden">{label}</span>
      <div>
        <input {...input} type={type} placeholder={label} style={{marginBottom: '5px'}} />
        {touched && error && <span>{error}</span>}
      </div>
    </label>
  </div>
);

const renderOtherIncome = ({ fields, meta: { error, submitFailed } }) => (

  <ul style={{listStyle: 'none', paddingLeft: '20px'}}>
    {fields.map((income, index) => (
      <li key={index} style={{marginBottom: '45px'}}>

        <h4>Other income #{index + 1} </h4>
        <button
          type="button"
          title="Remove income"
          className="nested-button"
          onClick={() => fields.remove(index)}
        >Remove income</button>
        <Field
          name={`${income}.incomeFrom`}
          type="text"
          component={renderField}
          label="Where did this income come from?"
        />
        <Field
          name={`${income}.totalAmount`}
          type="number"
          component={renderField}
          label="Enter the total amount"
        />
      </li>
    ))}
    <li>
      <button type="button" onClick={() => fields.push({})}>
        + Add Income
      </button>
      {console.log('error',error)}
      {submitFailed && error && <span>ERRRRROOOOORRRRRR</span>}
    </li>
  </ul>
);

export default SelectingFormValuesForm;
