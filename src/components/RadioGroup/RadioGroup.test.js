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
  it('toggles a radio group', () => {
    const input = shallow(
      <RadioGroup
        name="question_1"
        radios={['yes', 'no']}
        toggleBy="yes"
        toggledRadios={['yes', 'no']}
        toggledName="question_2"
      />
    );
    expect(input.find('InputField').length).toEqual(2);
  });
});
