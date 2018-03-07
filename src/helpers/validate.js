const validate = values => {

  const errors = {};

  if (!values.address) {
    errors.address = 'Required';
  }

  if (!values.full_name) {
    errors.full_name = 'Required';
  }
  
  if (!values.did_you_live_here) {
    errors.did_you_live_here = 'Required';
  }

  if (!values.joint_homeowner) {
    errors.joint_homeowner = 'Required';
  }

  if (!values.income) {
    errors.income = 'Required';
  }
  
  return errors;
}

export default validate;
