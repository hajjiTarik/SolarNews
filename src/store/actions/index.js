import {
  ERROR_API,
  SET_TYPE,
  REQUEST_API,
  SUCCESS_API,
  SET_IN_CACHE,
  SET_PAGE,
  SET_CHECKBOX_VISIBILITY,
  SET_ACTIVE_SITE,
  SET_NOTIFICATION_DATE,
  SET_FONT_SIZE,
  TRIGGER_PERSISTENCE
} from '../constants';
import request from '../../config/api';

export const requestApi = (site, typeOfResult, pageNumber) => ({
  type: REQUEST_API,
  site,
  typeOfResult,
  pageNumber
});

export const setFontSize = value => ({
  type: SET_FONT_SIZE,
  value
});


export const successApi = (result, render) => ({
  type: SUCCESS_API,
  result,
  render
});

/**
 * @param error
 */
export const errorApi = error => ({
  type: ERROR_API,
  error
});

/**
 * @param result
 */
export const setInCache = result => ({
  type: SET_IN_CACHE,
  result
});

/**
 * @param articleType
 */
export const setType = articleType => ({
  type: SET_TYPE,
  articleType
});

/**
 * @param page
 */
export const setPage = (page = 0) => ({
  type: SET_PAGE,
  page
});

/**
 * @param visible
 */
export const showCheckbox = visible => ({
  type: SET_CHECKBOX_VISIBILITY,
  visible
});

/**
 * @param activeSite
 */
export const setActiveSite = activeSite => ({
  type: SET_ACTIVE_SITE,
  activeSite
});

/**
 * @param notificationDate
 */
export const setNotificationDate = notificationDate => ({
  type: SET_NOTIFICATION_DATE,
  notificationDate
});

/**
 * @param key
 * @type string
 * @param data
 * @type object
 */
export const persist = (key, data) => ({
  type: TRIGGER_PERSISTENCE,
  key,
  data
});

/**
 *
 * @param site
 * @param typeOfResult
 * @param pageNumber
 * @param render
 * @returns {function(*)}
 */
export const fetchApi = (site, typeOfResult, pageNumber, render = false) => {

  return (dispatch) => {
    if( render ){
      dispatch(setPage());
    }

    dispatch(requestApi(site, typeOfResult, pageNumber));

    return request(site, typeOfResult, pageNumber)
      .then(({ data }) => data)
      .then(json => {
        dispatch(successApi(json, render));
        dispatch(setType(typeOfResult));
      })
      .catch(e =>{
        alert(e);
      })
  }
};