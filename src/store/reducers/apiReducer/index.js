import { ERROR_API, REQUEST_API, SET_TYPE, SUCCESS_API } from '../../constants';

export default (state = {
                  isFetching: false,
                  type: 'popular',
                  siteSource: 'behance',
                  page: 1,

                }, action) => {
  switch (action.type) {
    case [REQUEST_API, SET_TYPE] :
      return {
        ...state,
        isFetching: true
      };
    case SUCCESS_API :
      return {
        ...state,
        result: action.result,
        isFetching: false
      };
    case SET_TYPE :
      return {
        ...state,
        type: action.articleType
      }
    case ERROR_API :
      return {
        ...state,
        error: action.error,
        isFetching: true
      };
    default :
      return state;
  }
}