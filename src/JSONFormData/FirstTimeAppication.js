const firstTimeApplication = [

  {
    "question": "What is your address?",
    "type": "text",
    "name": "address",
    "isRequired": true
  },
  {
    "question": "What is your name?",
    "type": "text",
    "instructions": "Please use the name you use on the property title",
    "name": "full_name",
    "isRequired": true
  },
  {
    "question": "Did you live here at July 1 2017?",
    "type": "radio",
    "instructions": "Please use the name you use on the property title.",
    "name": "did_you_live_here",
    "options": ['yes', 'no'],
    "isRequired": true
  },
  {
    "question": "Do you have a partner or joint homeowner who lives with you?",
    "type": "radio",
    "instructions": "'Partner' is a person you are married to/in a civil union, or de facto relationship with.",
    "options": ['yes', 'no'],
    "name": "joint_homeowner",
    "isRequired": true
  },
  {
    "question": "Income",
    "type": "checkbox",
    "instructions": "Select any that you receive.",
    "options": [
      'NZ Superannuation',
      'Jobseeker benefit',
      'Sole parents',
      'Supported living',
      'Self employed',
      'Wage or salary',
      'Other'
    ],
    "name": "income",
    "isRequired": true
  }

];

export default firstTimeApplication;
