import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default class CreateStore {
  constructor() {
    const store = createStore(
      reducer,
      {},
      applyMiddleware(
        thunkMiddleware
      )
    );

    Object.assign(this, store, {});
  }
}