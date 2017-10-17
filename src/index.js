import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import CreateStore from './store';

const store = new CreateStore();

export default class extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}