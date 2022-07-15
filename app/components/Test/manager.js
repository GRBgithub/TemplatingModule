// TODO: TDD
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';
import Test from '.';
const component = <Test />;
describe('The Test component', () => {
  it('renders correctly', () => {
    const wrapper = render(component);
    expect(wrapper.hasClass('test')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});