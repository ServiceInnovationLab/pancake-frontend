const validate = values => {
  let x = document.getElementsByTagName('input');
  let arrayOfInputNames = [];

  for ( let i in x ) {
    arrayOfInputNames.push(x[i].name);
  }


  // HACK
  let optionals = ['email', 'phone_number', 'lived_here_before_july_2017', 'lived_here_before_july_2017_child', 'has_home_business', 'business_deducted_over_50'];

  const errors = {};
  arrayOfInputNames.forEach(item=>{
    if(!values[item] && ! optionals.includes(item)) {
      errors[item] = 'This is a required field, please provide an answer';
    }

    // Custom errors
  });
  return errors;
};

export default validate;
