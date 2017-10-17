import { ERROR_API, SET_TYPE, REQUEST_API, SUCCESS_API, SET_IN_CACHE } from '../constants';
import request from '../../config/api';

export const requestApi = (site, typeOfResult, pageNumber) => ({
  type: REQUEST_API,
  site,
  typeOfResult,
  pageNumber
});

export const successApi = result => ({
  type: SUCCESS_API,
  result
});

export const errorApi = error => ({
  type: ERROR_API,
  error
});

export const setType = articleType => ({
  type: SET_TYPE,
  articleType
});

export const setInCache = result => ({
  type: SET_IN_CACHE,
  result
});

export const fetchApi = (site, typeOfResult, pageNumber) => {
  return dispatch => {

    dispatch(requestApi(site, typeOfResult, pageNumber));

    return request(site, typeOfResult, pageNumber)
      .then(response => {
        return response.data;
      })
      .then(json => {
        dispatch(successApi(json));
        dispatch(setType(typeOfResult));
      })
      .catch(e =>{
        alert(e);
      })
  }
};