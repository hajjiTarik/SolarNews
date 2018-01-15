import { setInStorage } from '../../utils/cacheManager';
import { TRIGGER_PERSISTENCE } from '../constants';

export default  store => next => async action => {
  if (action.type === TRIGGER_PERSISTENCE) {
    const { key, data } = action;
    if (key) {
      await setInStorage(key, data);
    }
  }
  // NEXT MIDDLEWARE
  next(action);
};