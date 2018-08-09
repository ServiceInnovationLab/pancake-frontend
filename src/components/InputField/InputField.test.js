import React from 'react';
import { shallow } from 'enzyme';
import InputField from './InputField';

describe('<InputField />', () => {
  it('renders an input field', () => {
    const input = shallow(<InputField />);
    expect(input.find('input').length).toEqual(1);
  });

  it('toggles', () => {
    const mockFn = jest.fn();
    const input = shallow(<InputField inputHandler={mockFn}/>);
    input.simulate('click');
    expect(mockFn).toHaveBeenCalled();
    expect(input).toMatchSnapshot();
  });
});
