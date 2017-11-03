import { SET_CHECKBOX_VISIBILITY, SET_ACTIVE_SITE } from '../../constants';

export default (state = {
                  visible: false,
                  activeSite: 'behance'
                }, action) => {
  switch (action.type) {
    case SET_CHECKBOX_VISIBILITY :
      return {
        ...state,
        visible: action.visible
      };
    case SET_ACTIVE_SITE :
      return {
        ...state,
        activeSite: action.activeSite
      };
    default :
      return state;
  }
}