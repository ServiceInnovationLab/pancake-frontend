import React, { Fragment } from 'react';

const renderField = ({ input, label, type, className, meta: { touched, error } }) => (
  <Fragment>
    <label className="subheading">{label}</label>
    <div>
      <input {...input} type={type} className={className} />
      {touched && error && <span>{error}</span>}
    </div>
  </Fragment>
);

export default renderField;
