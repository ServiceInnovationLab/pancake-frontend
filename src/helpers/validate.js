const validate = values => {

  const errors = {};

  if (!values.address) {
    errors.address = 'This is a required field, please provide an answer.';
  }

  if (!values.full_name) {
    errors.full_name = 'This is a required field, please provide an answer.';
  }
  
  if (!values.did_you_live_here) {
    errors.did_you_live_here = 'This is a required field, please provide an answer.';
  }

  if (!values.joint_homeowner) {
    errors.joint_homeowner = 'This is a required field, please provide an answer.';
  }

  if (!values.income) {
    errors.income = 'This is a required field, please select all that apply.';
  }
  
  return errors;
}

export default validate;
