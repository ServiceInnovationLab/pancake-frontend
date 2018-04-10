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
    return (
      <div>
        <div>
          <div>
            {this.props.props.options && this.props.props.options.map((item, key) => {
              return <label key={key}>
                <input {...this.props.props.input} type="radio" value={item} onClick={()=>{this.toggleSub(item);}} />
                <span>{item}</span>
              </label>;
            })}
          </div>
        </div>
        {<div style={ this.stateType('showYes') }>{this.props.props.optionsText[0]}</div>}
        {<div style={ this.stateType('showNo') }>
          <fieldset  style={{marginTop: '35px'}}>
            <legend style={{marginBottom: '15px'}}>{this.props.props.optionsText[1]}</legend>
            <div>
              {['Yes', 'No'].map((item, key)=>{
                return <label key={key}><input type="radio" name="test1" onClick={this.sub.bind(this)} /><span>{item}</span></label>;
              })}
            </div>
          </fieldset>
          <p style={ this.stateType('sub') }>A council officer will contact you about further information you will need to provide before processing your application.</p>
        </div>}
      </div>
    );
  }
}

export default Radio;
