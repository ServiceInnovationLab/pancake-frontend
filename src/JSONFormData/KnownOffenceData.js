// import RenderTextField from '../components/Forms/RenderTextField';
// import RenderRadio from '../components/Forms/RenderRadio';
import RenderCheckbox from '../components/Forms/RenderCheckbox';

const knownOffence = [
  {
    'label': {
      'en': {
        'text': 'OffenseNotice'
      },
      'mi': {
        'text': 'OffenseNotice'
      }
    },
    'text': {
      'en': {
        'text': 'It is an offence to knowingly make a false statement in your application'
      },
      'mi': {
        'text': 'It is an offence to knowingly make a false statement in your application'
      }
    },
    'isRequired': true,
    'component': RenderCheckbox,
    'hasHeader': false,
    'isNested': true,
    'hasChildren': true,
    'hasPlainTextField': true,
    'theme': 'square'
    // 'isNestedForm': true
  }
];

export default knownOffence;
