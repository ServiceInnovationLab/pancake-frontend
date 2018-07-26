import React, { Fragment } from 'react';
class Radio extends React.Component {

  render() {
    return (
      <Fragment>
        {this.props.fieldType && this.props.fieldType === 'radio' &&
          <fieldset className="field radio-group">
            <legend>{this.props.optionsText[1]}</legend>
            <div>
              <div>
                {['Yes', 'No'].map((item, key)=>{
                  return <label key={key}>
                    <input name={this.props.childFieldName}
                      item={item}
                      type="radio"
                      value={item.toLowerCase()}
                    />
                    <span>{item}</span></label>;
                })}
              </div>
            </div>
          </fieldset>}
      </Fragment>
    );
  }
}


export default Radio;
