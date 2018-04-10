import React from 'react';
import renderer from 'react-test-renderer';
import RenderRadio from '../components/Forms/RenderRadio';

describe('components', function() {



  describe('<RenderRadio />', function() {
    it('renders correctly', function() {
      let tree = renderer.create(<RenderRadio />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
