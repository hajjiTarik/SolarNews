import { setInStorage } from '../../App/utils/cacheManager';
import { TRIGGER_PERSISTENCE } from '../constants';

export default  store => next => {
  return async action => {
    if (action.type === TRIGGER_PERSISTENCE) {
      const { key, data } = action;
      if (key) {
        await setInStorage(key, data);
      }
    }
    // NEXT MIDDLEWARE
    next(action);
  };
};