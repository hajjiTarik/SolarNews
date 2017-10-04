import { ERROR_API, REQUEST_API, SUCCESS_API } from '../../constants';


export default (state = {
                  isFetching: false
                }, action) => {
  switch (action.type) {
    case REQUEST_API :
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