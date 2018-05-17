import React, {Fragment} from 'react';
import './RadioGroup.css';

export class RadioGroup extends React.Component {

  propData(parent, child) {
    return !this.props.isChild ? parent : child;
  }

  render() {
    const { childFieldName, childLabel, label, options, field_name } = this.props;
    return (
      <fieldset className="field">
        <legend>{this.propData(label, childLabel)}</legend>
        <div>
          <div>
            {options.map((item, key)=> <label key={key}>
              <input
                type="radio"
                name={this.propData(field_name, childFieldName)}
                onClick={this.props.handleClick ? ()=>this.props.handleClick(item) : null}
              />
              <span>{item}</span>
            </label>)}
          </div>
        </div>
      </fieldset>
    );
  }
}

export default class RadioGroupSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(toggleValue) {
    if(this.props.toggleByOption.toLowerCase() === toggleValue.toLowerCase()) {
      this.setState({toggle: true});
    } else {
      this.setState({toggle: false});
    }
  }

  render() {
    return (
      <Fragment>
        {/* Parent Radio */}
        <div className={this.props.options && this.props.options.length > 2 ? 'radio-list' : 'field radio-group'}>
          <RadioGroup {...this.props} handleClick={this.handleClick} />
        </div>

        {/* Child Radio */}
        {this.props.childType === 'radio' && this.state.toggle && 
          <div className="radio-group">
            <RadioGroup {...this.props} isChild={true} />
          </div>
        }

        {/* Child TextField */}
        {this.props.childType === 'text-field' && this.state.toggle && 
          <div>
            <input {...this.props} type="text" />
          </div>
        }
      </Fragment>
    );
  }
}
