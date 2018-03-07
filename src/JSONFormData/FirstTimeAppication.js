const firstTimeApplication = [
  {
    "question": {
      "en": {
        "text": "What is your address?"
      },
      "ma": {
        "text": "Ko wai tō wāhi noho?"
      }
    },
    "type": "text",
    "name": "address",
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "text": "What is your name?"
      },
      "ma": {
        "text": "Ko wai to ingoa?"
      }
    },
    "type": "text",
    "name": "full_name",
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "text": "Only En: Did you live here at 1st July?"
      }
    },
    "type": "radio",
    "instructions": {
      "en": {
        "text": "Please use the name you use on the property title"
      },
      "ma": {
        "text": "Māori: Please use the name you use on the property title"
      }
    },
    "name": "did_you_live_here",
    "options": {
      "en": {
        "text": ['yes', 'no']
      },
      "ma": {
        "text": ['āe', 'kāore']
      }
    },
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "text": "Do you have a partner or joint homeowner who lives with you?"
      },
      "ma": {
        "text": "Māori: Do you have a partner or joint homeowner who lives with you?"
      }
    },
    "type": "radio",
    "instructions": {
      "en": {
        "text": "'Partner' is a person you are married to/in a civil union, or de facto relationship with."
      },
      "ma": {
        "text": "Māori: 'Partner' is a person you are married to/in a civil union, or de facto relationship with."
      }
    },
    "options": {
      "en": {
        "text": ['yes', 'no']
      },
      "ma": {
        "text": ['āe', 'kāore']
      }
    },
    "name": "joint_homeowner",
    "isRequired": true
  },
  {
    "question": {
      "en": {
        "text": "Income"
      },
      "ma": {
        "text": "Māori: Income"
      }
    },
    "type": "checkbox",
    "instructions": {
      "en": {
        "text": "Select any that you receive."
      },
      "ma": {
        "text": "Māori: Select any that you receive."
      }
    },
    "options": {
      "en": {
        "text": [
          'NZ Superannuation',
          'Jobseeker benefit',
          'Sole parents',
          'Supported living',
          'Self employed',
          'Wage or salary',
          'Other'
        ]
      },
      "ma": {
        "text": [
          'Māori: NZ Superannuation',
          'Māori: Jobseeker benefit',
          'Māori: Sole parents',
          'Māori: Supported living',
          'Māori: Self employed',
          'Māori: Wage or salary',
          'Māori: Other'
        ]
      }
    },
    "name": "income",
    "isRequired": true
  }
];

export default firstTimeApplication;
