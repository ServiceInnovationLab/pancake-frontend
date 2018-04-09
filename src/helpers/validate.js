const validate = () => {
  let x = document.getElementsByTagName('input');
  let arrayOfInputNames = [];

  for(let i in x) {
    arrayOfInputNames.push(x[i].name);
  }
  const errors = {};

  arrayOfInputNames.forEach(item=>{
    errors[item] = 'This is a required field, please provide an answer';
  });

  return errors;
};

export default validate;
