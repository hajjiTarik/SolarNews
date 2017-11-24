import { AsyncStorage } from 'react-native';
import { shallowComparing } from './helpers';

/**
 * @param key
 * @param data
 * @param prop = ''
 * @returns {Promise.<Array.<T>|*>}
 */
export async function isInCache(key, data, prop = '') {
  let savedData = JSON.parse(await AsyncStorage.getItem(key)) || {};

  if (savedData instanceof Array) {
    return (savedData || []).filter(item => item[prop] === data[prop]).length;
  } else {
    return shallowComparing(savedData, { [key] : data });
  }
}

/**
 * @param key
 * @param data
 * @param prop
 * @returns {Promise.<void>}
 */
export async function setInStorage(key, data, prop = '') {
  try {
    let isItemSaved = await isInCache(key, data, prop);
    let savedData = JSON.parse(await AsyncStorage.getItem(key));
    let result = null;

    if (isItemSaved) return;

    if (savedData instanceof Array) {
      result = savedData || [];
      result.unshift(data);
    } else {
      result = { [key] : data };
    }
    console.log('in cache manager',savedData, key, result);
    await AsyncStorage.setItem(key, JSON.stringify(result));

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @param key
 * @returns {Promise.<*|Promise>}
 */
export async function getFromStorage(key) {
  try {
    let savedData = await AsyncStorage.getItem(key);
    savedData = savedData ? JSON.parse(savedData) : [];
    return savedData;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @param key
 * @param data
 * @param prop
 * @returns {Promise.<Array.<T>|*>}
 */
export async function removeOneItemFromStorage(key, data, prop = '') {
  try {
    let savedData = await AsyncStorage.getItem(key);

    savedData = savedData ? JSON.parse(savedData) : [];
    let result = savedData.filter(item => item[prop] !== data[prop]);
    await AsyncStorage.setItem(key, JSON.stringify(result));

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @param key
 * @param clearAll
 * @returns {Promise.<void>}
 */
export async function removeDataFromStorage(clearAll = false, key) {
  try {
    if (clearAll) await AsyncStorage.clear();

    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
}