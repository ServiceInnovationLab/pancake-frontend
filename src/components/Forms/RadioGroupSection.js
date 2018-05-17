import React, {Fragment} from 'react';
import Accordian from '../Forms/Accordian';
import '../../styles/RadioGroup.css';

export class RadioGroup extends React.Component {

  propData(parent, child) {
    return !this.props.isChild ? parent : child;
  }

  render() {
    const { childFieldName, childLabel, label, childOptions, field_name } = this.props;
    return (
      <fieldset className="field">
        <legend>{this.propData(label, childLabel)}</legend>
        <div>
          <div>
            {childOptions.map((item, key)=> <label key={key}>
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
        <div className={this.props.options && this.props.options.length > 2 ? 'radio-list' : 'radio-group'}>
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

        {this.props.accordianText && <div>
          <Accordian label={this.props.accordianLabel} text={this.props.accordianText} />
        </div>
        }
      </Fragment>
    );
  }
}
