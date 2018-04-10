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

          <Accordian label={this.props.accordianLabel} text={this.props.accordianText} />
          <div style={ shown }>{this.props.accordianText}</div>
          <div>
            <div>
              {this.props.options && this.props.options.map((item, key) => {
                return <label key={key}>
                  <input {...this.props.input} type="radio" value={item} onClick={()=>{this.toggleSub(item);}} />
                  <span>{item}</span>
                </label>;
              })}
            </div>
            {showYes && <div style={ showYes }>{this.props.optionsText[0]}</div>}
            {showNo && <div style={ showNo }>
              <fieldset  style={{marginTop: '35px'}}>
                <legend style={{marginBottom: '15px'}}>{this.props.optionsText[1]}</legend>
                <div>
                  {['Yes', 'No'].map(item=>{
                    <label><input type="radio" name="test1" onClick={this.sub.bind(this)} /><span>{item}</span></label>;
                  })}
                </div>
              </fieldset>
              <p style={ sub }>A council officer will contact you about further information you will need to provide before processing your application.</p>
            </div>}
          </div>
          <ErrorMessage fields={this.props.meta} />
        </fieldset>
      </div>
    );
  }
}
