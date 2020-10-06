import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const shallowApp = () =>
  shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe('App :', () => {
  it('should render', () => {
    const component = shallowApp();
    expect(component).toMatchSnapshot();
  });
});
