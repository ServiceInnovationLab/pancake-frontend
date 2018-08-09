import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
  it('renders a radio group', () => {
    const input = shallow(
      <RadioGroup
        radios={['yes', 'no', 'maybe']}
      />
    );
    expect(input.find('InputField').length).toEqual(3);
  });
});
