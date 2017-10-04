import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import apiReducer from './apiReducer';

export default combineReducers({
  menuReducer,
  apiReducer
})