import { AsyncStorage } from 'react-native';
import { isEqual } from 'lodash';

/**
 * @param key
 * @param data
 * @returns {Promise.<boolean>}
 */
export async function isInCache(key, data) {
  let savedData = JSON.parse(await AsyncStorage.getItem(key)) || {};
  return isEqual({ [key] : data }, savedData);
}

/**
 * @param key
 * @param data
 * @returns {Promise.<void>}
 */
export async function setInStorage(key, data) {
  try {
    let isItemSaved = await isInCache(key, data);
    if (isItemSaved) return;

    let result = { [key] : data };
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
    savedData = savedData ? JSON.parse(savedData) : {};
    return savedData;

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