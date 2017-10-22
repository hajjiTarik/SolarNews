import { AsyncStorage } from 'react-native';

/**
 * @param key
 * @param data
 * @param prop
 * @returns {Promise.<Array.<T>|*>}
 */
export async function isInCache (key, data, prop){
  let savedData = await AsyncStorage.getItem(key);
  savedData = savedData ? JSON.parse(savedData) : [];

  return savedData.filter(item => item[prop] === data[prop]);
}

/**
 * @param key
 * @param data
 * @param prop
 * @returns {Promise.<void>}
 */
export async function setInStorage (key, data, prop){
  try {
    let savedItem = isInCache(key, data, prop);
    let dataFromCache = await AsyncStorage.getItem(key);

    if(!savedItem.length){
      let result = JSON.parse(dataFromCache) || [];
      result.unshift(data);
      await AsyncStorage.setItem(key, JSON.stringify(result));

      return result;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getFromStorage (key){
  try {
    let savedData = await AsyncStorage.getItem(key);
    savedData = savedData ? JSON.parse(savedData) : [];

    return savedData;
  } catch (e) {
    console.log(e);
  }
}

export async function removeOneItemFromStorage (key, data, prop){
  try {
    let savedData = await AsyncStorage.getItem(key);

    savedData = savedData ? JSON.parse(savedData) : [];
    let result = savedData.filter(item => item[prop] !== data[prop]);
    await AsyncStorage.setItem(key, JSON.stringify(result));

    return result;
  }catch (e){
    console.log(e);
  }
}

export async function removeDataFromStorage (key, clearAll = false){
  try {
    if (clearAll) await AsyncStorage.clear();

    console.log(key);
    let result = await AsyncStorage.removeItem(key);

    console.log(result);
  } catch (e) {
    console.log(e);
  }
}