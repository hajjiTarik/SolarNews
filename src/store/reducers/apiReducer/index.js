import { ERROR_API, REQUEST_API, SET_TYPE, SET_PAGE, SUCCESS_API } from '../../constants';

export default (state = {
                  isFetching: false,
                  type: 'popular',
                  siteSource: 'behance',
                  page: 1,
                  result: []
                }, action) => {
  switch (action.type) {
    case [REQUEST_API, SET_TYPE] :
      return {
        ...state,
        isFetching: true
      };
    case SUCCESS_API :
      const result = !action.render ? [...state.result , ...action.result] : action.result;

      console.log(action.render);
      return {
        ...state,
        result,
        isFetching: false
      };
    case SET_TYPE :
      return {
        ...state,
        type: action.articleType
      };
    case SET_PAGE :
      return {
        ...state,
        page: action.page
      };
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