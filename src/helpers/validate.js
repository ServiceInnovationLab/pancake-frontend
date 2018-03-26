const validate = values => {

  const errors = {};


  if (!values.address) {
    errors.address = 'This is a required field, please enter your address.';
  }

  if (!values.fullName) {
    errors.fullName = 'This is a required field, please enter your full name.';
  }

  if (!values.hasLivedHere) {
    errors.hasLivedHere = 'This is a required field, please provide an answer.';
  }

  if (!values.isJointOwner) {
    errors.isJointOwner = 'This is a required field, please select one.';
  }

  if (!values.hasSuperAnnuationNestedValue) {
    errors.hasSuperAnnuationNestedValue  = 'This is a required field, please select one.';
  }

  if (!values.hasWageOrSalaryNestedValue) {
    errors.hasWageOrSalaryNestedValue  = 'This is a required field, please provide an answer.';
  }

  // if (!values.income) {
  //   errors.income = 'This is a required field, please select all that apply.';
  // }
  console.log(errors)
  return errors;
};

export default validate;
