import { ERROR_API, SET_TYPE, REQUEST_API, SUCCESS_API, IS_REFRESHING } from '../constants';
import request from '../../api';

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
  }
};