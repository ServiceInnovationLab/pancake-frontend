import React, { Fragment } from 'react';

const HiddenField = ({ input, type, className }) => (
  <Fragment>
    {console.log(type)}
    {console.log(...input)}
    <input {...input} type={type} className={className} />
  </Fragment>
);

export default HiddenField;
