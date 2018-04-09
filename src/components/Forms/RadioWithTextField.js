import React from 'react';

export default class RadioWithTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showYes: false };
  }

  toggle(item) {
    this.setState({showYes: item === 'yes' ? true : false});
  }

  render() {
    let showYes = {
      display: this.state.showYes ? 'block' : 'none'
    };

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
                  <input {...this.props.input} type="radio" value={item} onClick={()=>{this.toggle(item);}} />
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
      </div>
    );
  }
}
