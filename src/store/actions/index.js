
export default openMenu = (payload) => {
  console.log(payload);
  return {
    type: 'OPEN_MENU',
    isOpen: payload
  }
};
