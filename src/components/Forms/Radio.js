import React from 'react';

class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  sub() {
    this.setState({
      sub: !this.state.sub
    });
  }

  render() {
    let prop = this.props.props;
    return (
      <div>
        <div>
          <div>
            {prop.options && prop.options.map((item, key) => {
              return <label key={key}>
                <input {...prop.input} type="radio" value={item} onClick={()=>{this.toggleSub(item);}} />
                <span>{item}</span>
              </label>;
            })}
          </div>
        </div>
        {this.props.fieldType === 'radio' &&
          <div>
            {<div style={ this.stateType('showYes') }>{prop.optionsText[0]}</div>}
            {<div style={ this.stateType('showNo') }>
              <fieldset  style={{marginTop: '35px'}}>
                <legend style={{marginBottom: '15px'}}>{prop.optionsText[1]}</legend>
                <div>
                  {['Yes', 'No'].map((item, key)=>{
                    return <label key={key}><input type="radio" name={`${prop.input.name}_sub_field`} onClick={this.sub.bind(this)} /><span>{item}</span></label>;
                  })}
                </div>
              </fieldset>
              <p style={ this.stateType('sub') }>A council officer will contact you about further information you will need to provide before processing your application.</p>
            </div>}
          </div>
        }
        {this.props.fieldType === 'text' &&
          <div>
            {this.stateType('showYes') && <div style={ this.stateType('showYes') }>
              {prop.instructionsSecondary && <label style={{marginTop: '35px'}}>{prop.textFieldLabel}</label>}
              <p>{prop.instructionsSecondary}</p>
              <input type="number" name={`${prop.input.name}_sub_field`} placeholder={prop.placeholder} />
            </div>}
          </div>
        }
      </div>
    );
  }
}

export default Radio;
