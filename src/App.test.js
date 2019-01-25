import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders App', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('div');
});

it('snapshot testinf App', () => {
  const app = shallow(<App />);
  const tree = toJson(app);
  expect(tree).toMatchSnapshot();
});
