import React from 'react';

export default class RadioWithTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yes: false,
      no: false,
      sub: false
    }
  }

  toggle(item) {
    if(item === 'yes') {
      this.setState({yes: true})
      this.setState({no: false})
    } else {
      this.setState({yes: false})
      this.setState({no: true})
    }
  }
  sub() {
		this.setState({
			sub: !this.state.sub
		});
	}
  render() {
    var showYes = {
			display: this.state.yes ? "block" : "none"
    };
    var showNo = {
			display: this.state.no ? "block" : "none"
    };
    var sub = {
			display: this.state.sub ? "block" : "none"
    };
    var hidden = {
			display: this.state.shown ? "none" : "block"
		}
    return (
      <div>




<fieldset className="radio-group">
    {this.props.label && <legend>
      {this.props.label}
    </legend>}
    {this.props.instructions && <p>{this.props.instructions}</p>}
    {!this.props.instructions && <p></p>}
    <div>
      <div>
        {this.props.options && this.props.options.map((item, key) => {
          return <label key={key}>
            <input {...this.props.input} type="radio" value={item} onClick={()=>{this.toggle(item)}} />
            <span>{item}</span>
          </label>;
        })}
      </div>
      {showYes && <div style={ showYes }>
          {this.props.instructionsSecondary && <label style={{marginTop: '35px'}}>{this.props.textFieldLabel}</label>}
          <p>{this.props.instructionsSecondary}</p>
          <input type="number" placeholder={this.props.placeholder} />
          </div>}
    </div>
    {this.props.meta !== undefined && this.props.meta.touched && this.props.meta.error &&
        <span className="error"><strong>Error: </strong>{this.props.meta.error}</span>
      }
  </fieldset>



        {/* <label>{this.props.label}</label>

        {this.props.options.map(item => {
          return (
            <div>
              <label>
                <input type="radio" name="test" value={item} onClick={()=>{this.toggle(item)}}/>
                {item}
              </label>
            </div>

          );
        })}

        {showYes && <div style={ showYes }>
          <label>{this.props.textFieldLabel}</label>
          <p>{this.props.instructions}</p>
          <input type="number" placeholder={this.props.placeholder} />
          </div>} */}
        {/* {showNo && <div style={ showNo }>
          <label>{this.props.optionsText[1]}</label>
          <label><input type="radio" name="test1" onClick={this.sub.bind(this)} />Yes</label>
          <label><input type="radio" name="test1" onClick={this.sub.bind(this)} />No</label>
          <p style={ sub }>A council officer will contact you about further information you will need to provide before processing your application.</p>
        </div>} */}


      </div>
    );
  }
}
