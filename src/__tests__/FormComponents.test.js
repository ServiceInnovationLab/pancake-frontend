import React from 'react';
import renderer from 'react-test-renderer';
import RenderCheckbox from '../components/Forms/RenderCheckbox';
import RenderTextField from '../components/Forms/RenderTextField';
import RenderRadio from '../components/Forms/RenderRadio';

describe('components', function() {

  describe('<RenderCheckbox />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<RenderCheckbox />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('<RenderRadio />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<RenderRadio />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('<RenderTextField />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<RenderTextField />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
