import TextBoxWithAccordian from '../components/Forms/TextboxWithAccordian';
import RadioWithRadio from '../components/Forms/RadioWithRadio';
import RadioWithTextField from '../components/Forms/RadioWithTextField';
import IncomeListSection from '../components/Forms/IncomeListSection';

var firstTimeApplication = [
  {
    'component': RadioWithRadio,
    'field_name': 'lived_here_before_july_2017',
    'label': {
      'en': {
        'text': 'Did you live here at 1 July 2017?'
      },
      'mi': {
        'text': 'Did you live here at 1 July 2017?'
      }
    },
    'options': {
      'en': {
        'text': ['yes', 'no']
      },
      'mi': {
        'text': ['yes', 'no']
      }
    },
    'optionsText': {
      'en': {
        'text': ['', 'Were you living in another property that you owned on 1 July 2017, have sold that property, and moved to the address of the property you are currently living in during the the current rating year (1 July 2017-30 June 2018)?']
      },
      'mi': {
        'text': ['', 'Were you living in another property that you owned on 1 July 2017, have sold that property, and moved to the address of the property you are currently living in during the the current rating year (1 July 2017-30 June 2018)?']
      }
    },
    'accordianLabel': {
      'en': {
        'text': 'What if I moved house during the rates year?'
      },
      'mi': {
        'text': 'What if I moved house during the rates year?'
      }
    },
    'accordianText': {
      'en': {
        'text': 'Get in touch with your local council. There are some situations where you can still get a rebate on your previous home after you moved. They will ask you some details including: <ul><li>the settlement date</li><li>what rates you paid for the current year.</li></ul>'
      },
      'mi': {
        'text': 'Get in touch with your local council. There are some situations where you can still get a rebate on your previous home after you moved. They will ask you some details including: <ul><li>the settlement date</li><li>what rates you paid for the current year.</li></ul>'
      }
    }
  }, {
    'component': TextBoxWithAccordian,
    'field_name': 'full_name',
    'theme': 'theme-sand',
    'label': {
      'en': {
        'text': 'What is your full name?'
      },
      'mi': {
        'text': 'Ko wai to ingoa?'
      }
    },
    'instructions': {
      'en': {
        'text': 'Your name must be on the title for the property you are applying for on the Rating Information Database (RID) at your local council.  '
      },
      'mi': {
        'text': 'Your name must be on the title for the property you are applying for on the Rating Information Database (RID) at your local council.'
      }
    },
    'accordianLabel': {
      'en': {
        'text': 'What if I live in a retirement village or company share flat/apartment?'
      },
      'mi': {
        'text': 'What if I live in a retirement village or company share flat/apartment?'
      }
    },
    'accordianText': {
      'en': {
        'text': '<p>If you are eligible for a rebate under the Rates Rebate (Retirement Village Residents) Amendment Act 2018 you will be able to apply for a rebate in the new rating year after 1 July 2018.</p><p>If the property you own is part of owner/occupier flats (often referred to as company share flats or apartments), you will need to fill in an additional declaration form and bring it with you when visiting the council.</a> This can be found <a href="https://www.dia.govt.nz/Pubforms.nsf/URL/OwnerOccupierDeclarationFormJuly2011.pdf/$file/OwnerOccupierDeclarationFormJuly2011.pdf">here</a></p>'
      },
      'mi': {
        'text': '<p>If you are eligible for a rebate under the Rates Rebate (Retirement Village Residents) Amendment Act 2018 you will be able to apply for a rebate in the new rating year after 1 July 2018.</p><p>If the property you own is part of owner/occupier flats (often referred to as company share flats or apartments), you will need to fill in an additional declaration form and bring it with you when visiting the council.</a> This can be found <a href="https://www.dia.govt.nz/Pubforms.nsf/URL/OwnerOccupierDeclarationFormJuly2011.pdf/$file/OwnerOccupierDeclarationFormJuly2011.pdf">here</a></p>'
      }
    }
  },
  {
    'label': {
      'en': {
        'text': 'Do you have dependants?'
      },
      'mi': {
        'text': 'Do you have dependants?'
      }
    },
    'instructions': {
      'en': {
        'text': 'Dependants are: <br/><ul><li>children you care and provide for under the age of 18 on 1 July 2017 and who at this time were not married and for whom you were not receiving payments under section 363 of the Children, Young Persons, and their Families Act 1989</li><li>relatives in receipt of a benefit (but not NZ Superannuation) on 1 July 2017.</li></ul>'
      },
      'mi': {
        'text': 'Dependants are: <br/><ul><li>children you care and provide for under the age of 18 on 1 July 2017 and who at this time were not married and for whom you were not receiving payments under section 363 of the Children, Young Persons, and their Families Act 1989</li><li>relatives in receipt of a benefit (but not NZ Superannuation) on 1 July 2017.</li></ul>'
      }
    },
    'options': {
      'en': {
        'text': ['yes', 'no']
      },
      'mi': {
        'text': ['ae', 'kaore']
      }
    },
    'isRequired': true,
    'component': TextBoxWithAccordian,
    'field_name': 'dependants',
    'textFieldLabel': {
      'en': {
        'text': 'label'
      },
      'mi': {
        'text': ['ae', 'kaore']
      }
    },
    'placeholder': {
      'en': {
        'text': 'Enter the total amount'
      },
      'mi': {
        'text': 'Enter the total amount'
      }
    }
  },
  {
    'label': {
      'en': {
        'text': 'Were you living with a partner or joint home owner(s) on July 1 2017?'
      },
      'mi': {
        'text': 'Were you living with a partner or joint home owner(s) on July 1 2017?'
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
        'text': [ 'yes','no' ]
      },
      'mi': {
        'text': [ 'ae', 'kaore' ]
      }
    },
    'isRequired': true,
    'component': IncomeListSection,
    'field_name': 'income_page_2'
  },
  {
    'theme': 'theme-sand',
    'label': {
      'en': {
        'text': 'Do you earn money from home or run a business from home?'
      },
      'mi': {
        'text': 'Do you earn money from home or run a business from home?'
      }
    },
    'instructionsSecondary': {
      'en': {
        'text': 'If yes, and you deducted over 50% of your rates as expenses, you may not be able to get a rebate. If your property is mainly used for commercial activities, for example farming or business, you cannot apply for a rates rebate.'
      },
      'mi': {
        'text': 'If yes, and you deducted over 50% of your rates as expenses, you may not be able to get a rebate. If your property is mainly used for commercial activities, for example farming or business, you cannot apply for a rates rebate.'
      }
    },
    'options': {
      'en': {
        'text': ['yes', 'no']
      },
      'mi': {
        'text': ['ae', 'kaore']
      }
    },
    'component': RadioWithTextField,
    'field_name': 'has_home_business',
    'textFieldLabel': {
      'en': {
        'text': 'Please describe how you earn money or what business you run'
      },
      'mi': {
        'text': 'Please describe how you earn money or what business you run'
      }
    },
    'placeholder': {
      'en': {
        'text': 'Enter the total amount'
      },
      'mi': {
        'text': 'Enter the total amount'
      }
    }
  },
  {
    'component': TextBoxWithAccordian,
    'field_name': 'email',
    'label': {
      'en': {
        'text': 'What is your email address?'
      },
      'mi': {
        'text': 'What is your email address?'
      }
    }
  }, {
    'component': TextBoxWithAccordian,
    'field_name': 'phone_number',
    'label': {
      'en': {
        'text': 'What is your phone number?'
      },
      'mi': {
        'text': 'What is your phone number?'
      }
    }
  }
];

export default firstTimeApplication;
