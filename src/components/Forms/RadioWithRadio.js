import React from 'react';

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
      this.setState({yes: true});
      this.setState({no: false});
    } else {
      this.setState({yes: false});
      this.setState({no: true});
    }
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

  render() {
    let shown = {
      display: this.state.shown ? 'block' : 'none'
    };
    let showYes = {
      display: this.state.yes ? 'block' : 'none'
    };
    let showNo = {
      display: this.state.no ? 'block' : 'none'
    };
    let sub = {
      display: this.state.sub ? 'block' : 'none'
    };

    return (
      <div>
        <fieldset className="radio-group">
          {this.props.label && <legend>
            {this.props.label}
          </legend>}
          {this.props.instructions && <p>{this.props.instructions}</p>}
          {!this.props.instructions && <p></p>}

          <div onClick={this.toggle.bind(this)} className="accordion">{this.props.accordianLabel}</div>
          <div style={ shown }>{this.props.accordianText}</div>
          <div>
            <div>
              {this.props.options && this.props.options.map((item, key) => {
                return <label key={key}>
                  <input {...this.props.input} type="radio" value={item} onClick={()=>{this.toggleSub(item)}} />
                  <span>{item}</span>
                </label>;
              })}
            </div>
            {showYes && <div style={ showYes }>{this.props.optionsText[0]}</div>}
            {showNo && <div style={ showNo }>
              <fieldset  style={{marginTop: '35px'}}>
                <legend style={{marginBottom: '15px'}}>{this.props.optionsText[1]}</legend>
                <div>
                  <div>
                    <label><input type="radio" name="test1" onClick={this.sub.bind(this)} /><span>Yes</span></label>
                    <label><input type="radio" name="test1" onClick={this.sub.bind(this)} /><span>No</span></label>
                  </div>
                </div>
              </fieldset>
              <p style={ sub }>A council officer will contact you about further information you will need to provide before processing your application.</p>
            </div>}
          </div>
          {this.props.meta !== undefined && this.props.meta.touched && this.props.meta.error &&
            <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>
          }
        </fieldset>
      </div>
    );
  }
}
