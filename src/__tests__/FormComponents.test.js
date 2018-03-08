import reducers from '../reducers/index';
import CheckboxGroup from '../components/Forms/CheckboxGroup';
import TextField from '../components/Forms/TextField';
import RadioGroup from '../components/Forms/RadioGroup';

import React from 'react';
import renderer from 'react-test-renderer';
import { App } from '../components/App';

describe('components', function() {

  describe('<CheckboxGroup />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<CheckboxGroup />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('<RadioGroup />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<RadioGroup />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('<TextField />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<TextField />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
