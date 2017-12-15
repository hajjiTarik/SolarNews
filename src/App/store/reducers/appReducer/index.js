import {
  ADD_TO_TMP_LIST,
  CHANGE_ARTICLE_DISPOSITION,
  RESET_ALL_SETTINGS,
  SET_ACTIVE_SITE,
  SET_CHECKBOX_VISIBILITY,
  SET_FONT_SIZE,
  SET_NOTIFICATION_DATE,
  TOGGLE_CAROUSEL
} from '../../constants';

export default (state = {
                  visible: false,
                  activeSite: 'behance',
                  notificationDate: new Date(),
                  fontSize: 14,
                  showCarousel: false,
                  typeOfArticle: false,
                  tmpArticle: []
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
    case TOGGLE_CAROUSEL :
      return {
        ...state,
        showCarousel: !action.showCarousel
      };
    case RESET_ALL_SETTINGS :
      return {
        ...state,
        activeSite: 'behance',
        fontSize: 14,
        notificationDate: new Date()
      };
    case CHANGE_ARTICLE_DISPOSITION :
      return {
        ...state,
        typeOfArticle: !state.typeOfArticle
      };
    case ADD_TO_TMP_LIST :
      return {
        ...state,
        tmpArticle: state.tmpArticle.includes(action.id)
          ? [...state.tmpArticle.filter(id => id !== action.id)]
          : [...state.tmpArticle, action.id]
      };
    default :
      return state;
  }
}