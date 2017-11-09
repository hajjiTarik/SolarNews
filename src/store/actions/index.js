import {
  ERROR_API,
  SET_TYPE,
  REQUEST_API,
  SUCCESS_API,
  SET_IN_CACHE,
  SET_PAGE,
  SET_CHECKBOX_VISIBILITY,
  SET_ACTIVE_SITE,
  SET_NOTIFICATION_DATE
} from '../constants';
import request from '../../config/api';

export const requestApi = (site, typeOfResult, pageNumber) => ({
  type: REQUEST_API,
  site,
  typeOfResult,
  pageNumber
});

export const successApi = (result, render) => ({
  type: SUCCESS_API,
  result,
  render
});

export const errorApi = error => ({
  type: ERROR_API,
  error
});

export const setInCache = result => ({
  type: SET_IN_CACHE,
  result
});


export const setType = articleType => ({
  type: SET_TYPE,
  articleType
});

export const setPage = page => ({
  type: SET_PAGE,
  page
});

export const showCheckbox = visible => ({
  type: SET_CHECKBOX_VISIBILITY,
  visible
});

export const setActiveSite = activeSite => ({
  type: SET_ACTIVE_SITE,
  activeSite
});

export const setNotificationDate = notificationDate => ({
  type: SET_NOTIFICATION_DATE,
  notificationDate
});

export const fetchApi = (site, typeOfResult, pageNumber, reset = false) => {

  console.log(site, typeOfResult, pageNumber);

  return dispatch => {
    if( reset ){
      setPage(1);
      pageNumber = 1;
    }
    dispatch(requestApi(site, typeOfResult, pageNumber));

    return request(site, typeOfResult, pageNumber)
      .then(({ data }) => data)
      .then(json => {
        dispatch(successApi(json, reset));
        dispatch(setType(typeOfResult));
      })
      .catch(e =>{
        alert(e);
      })
  }
};