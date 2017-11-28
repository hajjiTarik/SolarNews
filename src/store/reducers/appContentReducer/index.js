import { SET_IN_CACHE } from '../../constants';

export default (state = {
                  articles: {},
                }, action) => {
  switch (action.type) {
    case SET_IN_CACHE :
      return {
        ...state,
        articles: action.result
      };
    default :
      return state;
  }
}