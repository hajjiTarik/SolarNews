import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import appContentReducer from './appContentReducer';
import appReducer from './appReducer';

export default combineReducers({
  apiReducer,
  appContentReducer,
  appReducer
})