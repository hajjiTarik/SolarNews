import { createStore } from 'redux';
import reducer from './reducers';

export default class CreateStore {
  constructor() {

    const store = createStore(
      reducer,
      {}
    );

    Object.assign(this, store, {});
  }
}