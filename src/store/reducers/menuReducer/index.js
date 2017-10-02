export default (state = {} , action) => {
  console.log(action.type);
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