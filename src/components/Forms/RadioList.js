import React, {Fragment} from 'react';

const RadioList = props => {
  return (
    <Fragment>
      {props.options.map(item => {
        return <label className="radio-list">
          <input type="radio" value={item.value} name="test"/>
          <span>{item.label}</span>
        </label>;
      })}
    </Fragment>
  );
};

export default RadioList;
