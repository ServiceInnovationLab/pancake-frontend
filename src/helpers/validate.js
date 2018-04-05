const validate = values => {

  const errors = {};

  // if (!values.what_is_your_address) {
  //   errors.what_is_your_address = 'This is a required field, please enter your address.';
  // }

  if (!values.what_is_your_full_name) {
    errors.what_is_your_full_name = 'This is a required field, please enter your full name.';
  }

  if (!values.did_you_live_here_at_1_july_2017) {
    errors.did_you_live_here_at_1_july_2017 = 'This is a required field, please provide an answer.';
  }
  if (!values.what_is_your_email_address) {
    errors.what_is_your_email_address = 'This is a required field, please provide an answer.';
  }
  if (!values.what_is_your_phone_number) {
    errors.what_is_your_phone_number = 'This is a required field, please provide an answer.';
  }

  if (!values.do_you_have_a_partner_or_joint_home_owner_s_who_was_living_with_you_on_july_1st_2017) {
    errors.do_you_have_a_partner_or_joint_home_owner_s_who_was_living_with_you_on_july_1st_2017 = 'This is a required field, please select one.';
  }
  if (!values.do_you_have_dependants) {
    errors.do_you_have_dependants = 'This is a required field, please select one.';
  }
  if (!values.do_you_earn_money_from_home_or_run_a_business_from_home) {
    errors.do_you_earn_money_from_home_or_run_a_business_from_home = 'This is a required field, please select one.';
  }

  if (!values.hasSuperAnnuationChecked) {
    errors.hasSuperAnnuationValue  = 'This is a required field, please select one.';
  }

  if (!values.hasWageOrSalaryNestedValue) {
    errors.hasWageOrSalaryNestedValue  = 'This is a required field, please provide an answer.';
  }


  return errors;
};

export default validate;
