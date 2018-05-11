import React, {Fragment} from 'react';
import {underscorize} from '../../helpers/strings';
class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideButtons: false
    };
  }

  stateType(type) {
    let data = {
      display: this.state[type] ? 'block' : 'none'
    };
    return data;
  }

  toggleSub(item) {
    if(item === 'yes') {
      this.setState({showYes: true, showNo: false});
    } else {
      this.setState({showYes: false, showNo: true});
    }
    this.setState({showYes: item === 'yes' ? true : false});
  }

  componentWillMount() {
    if(this.props.props.values[`${this.props.props.input.name}`]) {
      this.setState({showYes: true});
    }
  }

  componentDidMount() {
    this.props.props.input.name === 'dependants' && this.option1.click();
    this.setState({hideButtons: true});
  }

  render() {
    let prop = this.props.props;

    return (
      <Fragment>
        <div>
          {this.props.props.input.name === 'dependants' && this.state.hideButtons ? '' :
            prop.options && prop.options.map((item, key) => {
              return <label key={key}>
                <input {...prop.input} ref={i => this[`option${key+1}`] = i} type="radio" value={item} onClick={()=>{
                  this.toggleSub(item);
                }}
                />
                <span>{item}</span>
              </label>;
            })
          }
        </div>
        {this.props.fieldType === 'radio' &&
          <Fragment>
            <FieldRadio
              showYes={this.stateType('showYes')}
              showNo={this.stateType('showNo')}
              prop={prop}
              showSub={this.stateType('sub')}
            />
          </Fragment>
        }
        {this.props.fieldType === 'text' && <FieldText showYes={this.stateType('showYes')} prop={prop} submittedValue={this.props.submittedValue} /> }
        {this.props.fieldType === 'radioList' && <FieldList showYes={this.stateType('showYes')} prop={prop} props={this.props} submittedValue={this.props.submittedValue} /> }
      </Fragment>
    );
  }
}

const FieldRadio = props => {
  return (
    <Fragment>
      {<div style={props.showYes}>{props.prop.optionsText[0]}</div>}
      {<div style={props.showNo}>
        <FieldSet prop={props.prop}/>
        <p style={props.showSub}>A council officer will contact you about further information you will need to provide before processing your application.</p>
      </div>}
    </Fragment>
  );
};

const FieldText = props => {
  return (
    <div>
      {props.showYes && <div style={props.showYes}>
        {props.prop.instructionsSecondary && <label style={{marginTop: '35px'}}>{props.prop.textFieldLabel}</label>}
        <p>{props.prop.instructionsSecondary}</p>
        <input type="number" id={props.prop.input.name} name={`${props.prop.input.name}`} defaultValue={(props.submittedValue) ? (props.submittedValue) : ''} placeholder={props.prop.placeholder} />
      </div>}
    </div>
  );
};

const FieldList = props => {
  return (
    <div style={{marginTop: '42px'}}>
      <fieldset>
        <label style={{fontSize: '20px'}}>{props.props.props.childLabel}</label>
        {props.props.props.childInstructions && <label style={{marginTop: '35px'}}>{props.props.props.textFieldLabel}</label>}
        <p dangerouslySetInnerHTML={{ __html: props.props.props.childInstructions }}></p>

        <div className="row">
          <ul className="column list-stripped">
            <li>
              <h4>
                Your Income
              </h4>
            </li>
            {props.props.props.childOptions
              .map((item, i) => {
                return <li key={i}>
                  <label className="radio-list-container">
                    <input type="checkbox" {...props.input} name={`total_income.applicant_${underscorize(item)}`}/>
                    <div className="radio-list-multi">
                      {item}
                      <span className="checkmark"></span>
                    </div>
                  </label>
                </li>;
              })}</ul>
          {props.showYes && <ul style={props.showYes} className="column list-stripped">
            <li>
              <h4>
                Partner/joint homeowner's income
              </h4>
            </li>
            {props.props.props.childOptions
              .map((item, i) => {
                return <li key={i} className="radio-list-container">
                  <label className="radio-list-container">
                    <input type="checkbox" {...props.input} name={`total_income.partner_${underscorize(item)}`}/>
                    <div className="radio-list-multi">
                      {item}
                      <span className="checkmark"></span>
                    </div>
                  </label>
                </li>;
              })}</ul>}
        </div>
      </fieldset>
    </div>
  );
};

const FieldSet = props => {
  return (
    <fieldset style={{marginTop: '35px'}}>
      <legend style={{marginBottom: '15px'}}>{props.prop.optionsText[1]}</legend>
      <RadioChild name={`${props.prop.input.name}_child`}/>
    </fieldset>
  );
};

class RadioChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sub: false
    };
  }
  sub() {
    this.setState({
      sub: !this.state.sub
    });
  }
  render() {
    return (
      <div>
        {[ 'Yes', 'No' ].map((item, key)=>{
          return <label key={key}><input type="radio" name={`${this.props.name}`} onClick={this.sub.bind(this)} /><span>{item}</span></label>;
        })}
      </div>
    );
  }
}

export default Radio;
