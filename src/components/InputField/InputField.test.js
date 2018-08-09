import React from 'react';
import { shallow } from 'enzyme';
import InputField from './InputField';

describe('<InputField />', () => {
  it('renders an input field', () => {
    const input = shallow(<InputField />);
    expect(input.find('input').length).toEqual(1);
  });
});
