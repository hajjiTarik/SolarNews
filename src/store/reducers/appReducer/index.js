import { SET_CHECKBOX_VISIBILITY, SET_ACTIVE_SITE, SET_NOTIFICATION_DATE, SET_FONT_SIZE } from '../../constants';

export default (state = {
                  visible: false,
                  activeSite: 'behance',
                  notificationDate: new Date(),
                  fontSize: 14
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
    case SET_FONT_SIZE :
      return {
        ...state,
        fontSize: action.value
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