export default (state = {
    isOpen: false
  } , action) => {
  switch (action.type){
    case 'OPEN_MENU' :
      return {
        ...state,
        isOpen: !action.isOpen
      }
    default :
      return state;
  }
}