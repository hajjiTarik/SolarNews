import { setInStorage } from '../../App/utils/cacheManager';

export default  store => next => {
  return async action => {
    if (action.type === 'TRIGGER_PERSISTENCE') {
      const { key, data } = action;
      if (action.key) {
        console.log(action.key, action.data);
        await setInStorage(key, data);
      }
    }

    next(action);
  };
};