import { ERROR_API, OPEN_MENU, REQUEST_API, SUCCESS_API } from '../constants';
import request from '../../api';

export const openMenu = (payload) => ({
  type: OPEN_MENU,
  isOpen: payload
});

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
})

export const fetchApi = (site, typeOfResult, pageNumber) => {

  return dispatch => {

    dispatch(requestApi(site, typeOfResult, pageNumber));

    return request(site, typeOfResult, pageNumber)
      .then(response => {
        return response.data;
      })
      .then(json => dispatch(successApi(json)))
      .catch(err => dispatch(errorApi(err)))
  }
}