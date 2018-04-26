const validate = values => {
  let x = document.getElementsByTagName('input');
  let arrayOfInputNames = [];

  for ( let i in x ) {
    arrayOfInputNames.push(x[i].name);
  }

  const errors = {};
  arrayOfInputNames.forEach(item=>{
    if(!values[item]) {
      errors[item] = 'This is a required field, please provide an answer';
    }

    // Custom errors
  });
  return errors;
};

export default validate;
