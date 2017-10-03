export default (state = {
    isOpen: false
  } , action) => {
  switch (action.type){
    case 'OPEN_MENU' :
      console.log('tototo', action.isOpen);
      return {
        ...state,
        isOpen: !action.isOpen
      }
    default :
      return state;
  }
}