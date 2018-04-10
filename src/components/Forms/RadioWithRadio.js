import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Accordian from '../../components/Forms/Accordian';

export default class RadioWithRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      sub: false
    };
  }

  toggleSub(item) {
    if(item === 'yes') {
      this.setState({showYes: true});
      this.setState({showNo: false});
    } else {
      this.setState({showYes: false});
      this.setState({showNo: true});
    }
    this.setState({showYes: item === 'yes' ? true : false});
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  sub() {
    this.setState({
      sub: !this.state.sub
    });
  }

  stateType(type) {
    let data = {
      display: this.state[type] ? 'block' : 'none'
    };
    return data;
  }

  render() {
    return (
      <div>
        <fieldset className="radio-group">
          {this.props.label && <legend>
            {this.props.label}
          </legend>}
          {this.props.instructions && <p>{this.props.instructions}</p>}
          {!this.props.instructions && <p></p>}

          <Accordian label={this.props.accordianLabel} text={this.props.accordianText} />
          <div>
            <div>
              {this.props.options && this.props.options.map((item, key) => {
                return <label key={key}>
                  <input {...this.props.input} type="radio" value={item} onClick={()=>{this.toggleSub(item);}} />
                  <span>{item}</span>
                </label>;
              })}
            </div>
            {<div style={ this.stateType('showYes') }>{this.props.optionsText[0]}</div>}
            {<div style={ this.stateType('showNo') }>
              <fieldset  style={{marginTop: '35px'}}>
                <legend style={{marginBottom: '15px'}}>{this.props.optionsText[1]}</legend>
                <div>
                  {['Yes', 'No'].map((item, key)=>{
                    return <label key={key}><input type="radio" name="test1" onClick={this.sub.bind(this)} /><span>{item}</span></label>;
                  })}
                </div>
              </fieldset>
              <p style={ this.stateType('sub') }>A council officer will contact you about further information you will need to provide before processing your application.</p>
            </div>}
          </div>
          <ErrorMessage fields={this.props.meta} />
        </fieldset>
      </div>
    );
  }
}
