import { SET_CHECKBOX_VISIBILITY, SET_ACTIVE_SITE, SET_NOTIFICATION_DATE } from '../../constants';

export default (state = {
                  visible: false,
                  activeSite: 'behance',
                  notificationDate: new Date()
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
    case SET_NOTIFICATION_DATE :
      return {
        ...state,
        notificationDate: action.notificationDate
      };
    default :
      return state;
  }
}