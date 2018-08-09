import React from 'react';
import { shallow } from 'enzyme';
import Accordian from './Accordian';

describe('<Accordian />', () => {
  it('renders an accordian', () => {
    const input = shallow(
      <Accordian />
    );
    expect(input.find('.accordian')).toHaveLength(1);
  });

  it('contains header & body props', () => {
    const input = shallow(
      <Accordian
        header="header"
        body="body text"
      />
    );
    expect(input.instance().props.header).toBeTruthy();
    expect(input.instance().props.body).toBeTruthy();
  });


});

