const validate = values => {

  const errors = {};

  if (!values.what_is_your_address) {
    errors.what_is_your_address = 'This is a required field, please enter your address.';
  }

  if (!values.what_is_your_name) {
    errors.what_is_your_name = 'This is a required field, please enter your full name.';
  }

  if (!values.did_you_live_here_at_1st_july) {
    errors.did_you_live_here_at_1st_july = 'This is a required field, please provide an answer.';
  }

  if (!values.do_you_have_a_partner_or_joint_homeowner_who_lives_with_you) {
    errors.do_you_have_a_partner_or_joint_homeowner_who_lives_with_you = 'This is a required field, please select one.';
  }

  if (!values.hasSuperAnnuationNestedValue) {
    errors.hasSuperAnnuationNestedValue  = 'This is a required field, please select one.';
  }

  if (!values.hasWageOrSalaryNestedValue) {
    errors.hasWageOrSalaryNestedValue  = 'This is a required field, please provide an answer.';
  }

  return errors;
};

export default validate;
