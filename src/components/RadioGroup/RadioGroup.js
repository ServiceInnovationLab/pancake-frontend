import React from 'react';
import InputField from '../InputField/InputField';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);

    this.state = {
      showSection: false
    };
  }

  inputHandler(e) {
    this.setState({
      showSection: e.target.value === this.props.toggleBy ? true : false
    });
  }

  render() {
    return (
      <div>
        {this.props.radios.map(item =>
          <label key={item}>{item}
            <InputField
              type="radio"
              name={this.props.name}
              value={item}
              inputHandler={this.inputHandler}
            />
          </label>
        )}
        {this.state.showSection &&
          <div className="test">
            {this.props.toggledRadios.map(item =>
              <label key={item}>{item}
                <InputField
                  key={item}
                  type="radio"
                  name={this.props.toggledName}
                  value={item}
                />
              </label>
            )}
          </div>
        }
      </div>
    );
  }
}


export default RadioGroup;
