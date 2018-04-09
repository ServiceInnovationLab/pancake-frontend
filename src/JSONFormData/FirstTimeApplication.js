import RenderTextField from '../components/Forms/RenderTextField';
import RenderRadio from '../components/Forms/RenderRadio';
import RenderCheckbox from '../components/Forms/RenderCheckbox';

const firstTimeApplication = [
  {
    'label': {
      'en': {
        'text': 'What is your name?'
      },
      'mi': {
        'text': 'Ko wai tō ingoa?'
      }
    },
    'isRequired': true,
    'component': RenderTextField
  },
  {
    'label': {
      'en': {
        'text': 'What is your address?'
      },
      'mi': {
        'text': 'Ko wai tō wāhi noho?'
      }
    },
    'instructions': {
      'en': {
        'text': 'Please use the name you use on the property title'
      },
      'mi': {
        'text': 'Please use the name you use on the property title'
      }
    },
    'isRequired': true,
    'component': RenderTextField,
    'hasAddressFinder': true
  },
  {
    'label': {
      'en': {
        'text': 'Did you live here at 1st July?'
      },
      'mi': {
        'text': 'Did you live here at 1st July?'
      }
    },
    'instructions': {
      'en': {
        'text': 'Please use the name you use on the property title'
      },
      'mi': {
        'text': 'Please use the name you use on the property title'
      }
    },
    'options': {
      'en': {
        'text': ['yes','no']
      },
      'mi': {
        'text': ['ae', 'kaore']
      }
    },
    'isRequired': true,
    'component': RenderRadio
  },
  {
    'label': {
      'en': {
        'text': 'Do you have a partner or joint homeowner who lives with you?'
      },
      'mi': {
        'text': 'Do you have a partner or joint homeowner who lives with you?'
      }
    },
    'instructions': {
      'en': {
        'text': '\'Partner\' is a person you are married to/in a civil union, or de facto relationship with.'
      },
      'mi': {
        'text': '\'Partner\' is a person you are married to/in a civil union, or de facto relationship with.'
      }
    },
    'options': {
      'en': {
        'text': ['yes','no']
      },
      'mi': {
        'text': ['ae', 'kaore']
      }
    },
    'isRequired': true,
    'component': RenderRadio
  },
  {
    'label': {
      'en': {
        'text': 'Super Annuation'
      },
      'mi': {
        'text': 'Super Annuation'
      }
    },
    'options': {
      'en': {
        'text': ['Single - Living alone', 'Single - Sharing']
      },
      'mi': {
        'text': ['Single - Living alone', 'Single - Sharing']
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': true,
    'isNested': true
  },
  {
    'label': {
      'en': {
        'text': 'Sole Parents'
      },
      'mi': {
        'text': 'Sole Parents'
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': false
  },
  {
    'label': {
      'en': {
        'text': 'Supported Living'
      },
      'mi': {
        'text': 'Supported Living'
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': false
  },
  {
    'label': {
      'en': {
        'text': 'Self Employed'
      },
      'mi': {
        'text': 'Self Employed'
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': false
  },
  {
    'label': {
      'en': {
        'text': 'Wage or Salary'
      },
      'mi': {
        'text': 'Wage or Salary'
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': false,
    'hasTextField': true,
    'isNested': true
  },
  {
    'label': {
      'en': {
        'text': 'Other'
      },
      'mi': {
        'text': 'Other'
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': false,
    'isNested': true,
    'hasChildren': true
  }
];

export default firstTimeApplication;
