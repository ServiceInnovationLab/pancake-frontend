const validate = values => {
  let x = document.getElementsByTagName('input');
  let arrayOfInputNames = [];
  for (var i = 0; i < x.length; i++) {
    arrayOfInputNames.push(x[i].name);
  }
  const errors = {};

  arrayOfInputNames.forEach(item=>{
    errors[item] = 'This is a required field, please provide an answer';
  });

  return errors;
};

export default validate;
