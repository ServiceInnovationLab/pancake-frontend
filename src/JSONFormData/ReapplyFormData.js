const ReapplyFormData = [
  {
    'question': {
      'en': {
        'text': 'What is your address?'
      },
      'ma': {
        'text': 'Ko wai tō wāhi noho?'
      }
    },
    'type': 'text',
    'name': 'address',
    'isRequired': true
  },
  {
    'question': {
      'en': {
        'text': 'Has your situation changed since you last applied?'
      },
      'ma': {
        'text': 'Has your situation changed since you last applied?'
      }
    },
    'instructions': {
      'en': {
        'text': 'This means your income, number of dependants or whether you have a partner.'
      },
      'ma': {
        'text': 'This means your income, number of dependants or whether you have a partner.'
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
    'type': 'radio',
    'name': 'situation_changed',
    'isRequired': true
  },
  {
    'question': {
      'en': {
        'text': 'What service centre would you like to sign at?'
      },
      'ma': {
        'text': 'What service centre would you like to sign at?'
      }
    },
    'type': 'radio',
    'instructions': {
      'en': {
        'text': 'This is where you want to have your signature witnessed to finish submitting it.'
      },
      'ma': {
        'text': 'This is where you want to have your signature witnessed to finish submitting it.'
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
  }
];

export default ReapplyFormData;
