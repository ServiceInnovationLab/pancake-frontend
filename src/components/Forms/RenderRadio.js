import React, {Fragment} from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Checkbox from './Checkbox';

var _ = require('lodash');

const isObject = (obj, key) => {
  return _.isObject(obj) ? obj[key] : obj;
};

// const RenderRadio = fields => {
//   const {label, isRequired, instructions, options, input} = fields;

//   return <Fragment>
//     <fieldset className={options && options.length > 2 ? 'radio-list' : 'field radio-group'}>
//       {label && <legend>
//         {label}
//         {isRequired && <span className="aria-hidden">(required)</span>}
//       </legend>}
//       {instructions && <p dangerouslySetInnerHTML={{ __html: instructions }}></p>}
//       <div>
//         <div>
//           {options && options.map((item, key) => {
//             return <label key={key} onClick={()=> input.value === 'yes' ? fields.handleOpenPanelClick() : fields.handleClosePanelClick() } className={fields.className && fields.className}>
//               <input {...input} type="radio" value={isObject(item, 'value')} />
//               <span style={{border: '1px solid black'}}>{isObject(item, 'label')}</span>
//             </label>;
//           })}
//         </div>
//       </div>
//       <ErrorMessage fields={fields} />
//     </fieldset>
//     <div>This thing</div>
//     {/* <Checkbox props={fields}/> */}
//   </Fragment>
//   ;
// };
class RenderRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPanel: false
    };
  }

  render() {
    const {label, isRequired, instructions, options, input} = this.props;
    return <Fragment>
      <fieldset className={options && options.length > 2 ? 'radio-list' : 'field radio-group'}>
        {label && <legend>
          {label}
          {isRequired && <span className="aria-hidden">(required)</span>}
        </legend>}
        {instructions && <p dangerouslySetInnerHTML={{ __html: instructions }}></p>}
        <div>
          <div>
            {options && options.map((item, key) => {
              return <label key={key} className={this.props.className && this.props.className}>
                <input {...input} type="radio" value={isObject(item, 'value')} />
                <span style={{border: '1px solid black'}}>{isObject(item, 'label')}</span>
              </label>;
            })}
          </div>
        </div>
        <ErrorMessage fields={this.props} />
      </fieldset>
      
      {/* <Checkbox props={this.props.options}/> */}
      
    </Fragment>;
  }
}

export default RenderRadio;
