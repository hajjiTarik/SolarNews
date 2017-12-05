import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import persistMiddleware from './middleware/persistMiddlware';

export default class CreateStore {
  constructor() {
    const store = createStore(
      reducer,
      {},
      applyMiddleware(
        persistMiddleware,
        thunkMiddleware
      )
    );

    Object.assign(this, store, {});
  }
}