import React from 'react';

const Instructions = props => {
  return (
    <p dangerouslySetInnerHTML={{ __html: props.instructions }} style={props.instructions ? {'display': 'block'} : {'display': 'none'}}></p>
  );
};

export default Instructions;
