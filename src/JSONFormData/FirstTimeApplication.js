const firstTimeApplication = [
  {
    'question': {
      'en': {
        'text': 'What is your name?'
      },
      'ma': {
        'text': 'Ko wai to ingoa?'
      }
    },
    'type': 'text',
    'name': 'full_name',
    'isRequired': true
  },
  {
    'question': {
      'en': {
        'text': 'Did you live here at 1st July?'
      }
    },
    'type': 'radio',
    'instructions': {
      'en': {
        'text': 'Please use the name you use on the property title'
      },
      'ma': {
        'text': 'Please use the name you use on the property title'
      }
    },
    'name': 'did_you_live_here',
    'options': {
      'en': {
        'text': ['yes', 'no']
      },
      'ma': {
        'text': ['āe', 'kāore']
      }
    },
    'isRequired': true
  },
  {
    'question': {
      'en': {
        'text': 'Do you have a partner or joint homeowner who lives with you?'
      },
      'ma': {
        'text': 'Do you have a partner or joint homeowner who lives with you?'
      }
    },
    'type': 'radio',
    'instructions': {
      'en': {
        'text': '\'Partner\' is a person you are married to/in a civil union, or de facto relationship with.'
      },
      'ma': {
        'text': '\'Partner\' is a person you are married to/in a civil union, or de facto relationship with.'
      }
    },
    'options': {
      'en': {
        'text': ['yes', 'no']
      },
      'ma': {
        'text': ['āe', 'kāore']
      }
    },
    'name': 'joint_homeowner',
    'isRequired': true
  },
  {
    'question': {
      'en': {
        'text': 'Income'
      },
      'ma': {
        'text': 'Income'
      }
    },
    'type': 'checkbox',
    'instructions': {
      'en': {
        'text': 'Select any that you receive.'
      },
      'ma': {
        'text': 'Select any that you receive.'
      }
    },
    'options': {
      'en': {
        'option': [
          {
            text: 'NZ Superannuation',
            options: ['Single - Living alone', 'Single - Sharing']
          },
          {
            text: 'Jobseeker benefit'
          },
          {
            text: 'Sole parents'
          },
          {
            text: 'Supported living'
          },
          {
            text: 'Self employed'
          },
          {
            text: 'Wage or salary'
          },
          {
            text: 'Other'
          }
        ]
      },
      'ma': {
        'option': [
          {
            text: 'NZ Superannuation',
            options: ['Single - Living alone', 'Single - Sharing']
          },
          {
            text: 'Jobseeker benefit'
          },
          {
            text: 'Sole parents'
          },
          {
            text: 'Supported living'
          },
          {
            text: 'Self employed'
          },
          {
            text: 'Wage or salary'
          },
          {
            text: 'Other'
          }
        ]
      },
    },
    'name': 'income',
    'isRequired': true
  }
];

export default firstTimeApplication;
