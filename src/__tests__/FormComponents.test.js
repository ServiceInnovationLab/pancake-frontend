import React from 'react';
import renderer from 'react-test-renderer';
import RenderRadio from '../components/Forms/RenderRadio';
import TextField from '../components/Forms/TextField';

const Components = [RenderRadio, TextField];


describe('components', function() {
    'use strict';
    Components.map(item => {
        describe(`<${item} />`, function() {
            it('renders correctly', function() {
                const TagName = item;
                const tree = renderer.create(<TagName />).toJSON();
                expect(tree).toMatchSnapshot();
            });
        });
    });

});
