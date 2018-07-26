import React, { Fragment, Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
// import WizardFormSecondPage from './WizardFormSecondPage';
import StepZilla from 'react-stepzilla';

import Radios from '../Forms/Radio';
import RadioWithRadio from '../Forms/RadioWithRadio';
import Accordian from '../Forms/Accordian';
import Error from '../Forms/Error';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      toggle: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }


  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleToggle(e) {
    const val = e.target.value === 'yes' ? false : true;
    this.setState({[`${e.target.name}_toggle`]: !val});
  }

  render() {
    const steps =
    [
      {
        name: 'Step 1',
        component: <Step1
          handleChange={this.handleChange}
          handleToggle={this.handleToggle}
          state={this.state}
        />
      },
      {
        name: 'Step 2',
        component: <Step2 handleChange={this.handleChange} />
      },
      // {name: 'Step 3', component: <Step3 />},
      // {name: 'Step 4', component: <Step4 />},
      // {name: 'Step 5', component: <Step5 />}
    ];

    return (<div className="container">
      <StepZilla steps={steps}/>
    </div>
    );
  }
}

const Step1 = props => {

  return <Fragment>
    <fieldset class="field radio-group">
      <legend>Did you live here at 1 July 2017?</legend>
      <div>
        <div>
          <Radio
            name="lived_here_before_july_2017"
            options={['yes', 'no']}
            handleToggle={props.handleToggle}
          />
        </div>
        <Accordian
          label="What if I moved house during the rates year?"
          text="Get in touch with your local council. There are some situations where you can still get a rebate on your previous home after you moved. They will ask you some details including: <ul><li>the settlement date</li><li>what rates you paid for the current year.</li></ul>"
        />
      </div>
    </fieldset>
    {props.state.lived_here_before_july_2017_toggle && <fieldset class="field radio-group">
      <legend>Were you living in another property that you owned on 1 July 2017, have sold that property, and moved to the address of the property you are currently living in during the the current rating year (1 July 2017-30 June 2018)?</legend>
      <div>
        <div>
          <Radio
            name="lived_other_owned_property"
            options={['yes', 'no']}
            handleToggle={props.handleToggle}
          />
        </div>
      </div>
    </fieldset>}
  </Fragment>;
};

const Step2 = () => {
  return (<p>this is step 2</p>);
};

const Radio = props => {
  return <div>
    {props.options.map(item => <label>
      <input
        type="radio"
        name={props.name}
        value={item}
        onChange={props.handleToggle}
      />
      <span>{item}</span>
    </label>
    )}
  </div>;
};

// const RadioWithRadio = props => {
//   return (
//     <div>
  //       <fieldset className="field radio-group">
  //         {props.label && <legend>
//           {props.label}
//         </legend>}
//         <div>
//           <Radio
//             optionsText={props.optionsText}
//             fieldType="radio"
//           />
//         </div>
//         {props.instructions && <p dangerouslySetInnerHTML={{ __html: props.instructions }}></p>}
//         {props.accordianLabel && <Accordian label={props.accordianLabel} text={props.accordianText} />}
//         <Error fields={props.meta} />
//       </fieldset>
//     </div>
//   );
// }
export default WizardForm;
