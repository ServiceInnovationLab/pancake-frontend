import React from 'react';
import renderer from 'react-test-renderer';
import RenderRadio from '../components/Forms/RenderRadio';
import TextField from '../components/Forms/TextField';

describe('components', function() {



  describe('<RenderRadio />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<RenderRadio />).toJSON();
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
