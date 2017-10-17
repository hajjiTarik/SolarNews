import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import appContentReducer from './appContentReducer';

export default combineReducers({
  apiReducer,
  appContentReducer
})