const firstTimeApplication = [
  
  {
    "question": {
      "en": {
        "label": "What is your address?"
      },
      "ma": {
        "label": "Ko wai tō wāhi noho?"
      }
    },
    "type": "text",
    "name": "address",
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "label": "What is your name?"
      },
      "ma": {
        "label": "Ko wai to ingoa?"
      }
    },
    "type": "text",
    "name": "full_name",
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "label": "Only En: Did you live here at 1st July?"
      }
    },
    "type": "radio",
    "instructions": {
      "en": {
        "label": "Please use the name you use on the property title"
      },
      "ma": {
        "label": "Māori: Please use the name you use on the property title"
      }
    },
    "name": "did_you_live_here",
    "options": {
      "en": {
        "label": ['yes', 'no']
      },
      "ma": {
        "label": ['āe', 'kāore']
      }
    },
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "label": "Do you have a partner or joint homeowner who lives with you?"
      },
      "ma": {
        "label": "Māori: Do you have a partner or joint homeowner who lives with you?)"
      }
    },
    "type": "radio",
    "instructions": {
      "en": {
        "label": "'Partner' is a person you are married to/in a civil union, or de facto relationship with."
      },
      "ma": {
        "label": "Māori: 'Partner' is a person you are married to/in a civil union, or de facto relationship with."
      }
    },
    "options": {
      "en": {
        "label": ['yes', 'no']
      },
      "ma": {
        "label": ['āe', 'kaore']
      }
    },
    "name": "joint_homeowner",
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "label": "Income"
      },
      "ma": {
        "label": "Māori: Income"
      }
    },
    "type": "checkbox",
    "instructions": {
      "en": {
        "label": "Select any that you receive."
      },
      "ma": {
        "label": "Māori: Select any that you receive."
      }
    },
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
