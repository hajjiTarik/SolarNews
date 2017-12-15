import { ERROR_API, REQUEST_API, SET_PAGE, SET_TOP_ARTICLE, SET_TYPE, SUCCESS_API } from '../../constants';

export default (state = {
                  isFetching: false,
                  type: 'popular',
                  page: 1,
                  result: [],
                  topArticle: []
                }, action) => {
  switch (action.type) {
    case [REQUEST_API, SET_TYPE] :
      return {
        ...state,
        isFetching: true
      };
    case SUCCESS_API :
      const result = (!action.render ? [...state.result, ...action.result] : action.result);

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
        page: ++action.page
      };
    case SET_TOP_ARTICLE :
      return {
        ...state,
        topArticle: action.topArticle
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