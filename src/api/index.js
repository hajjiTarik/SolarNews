import instance from './config/axiosInstance';

export default (site = 'echojs', typeOfResult = 'popular', pageNumber = 1, customConfig = {}) => {
  return instance.get(`${site}/${typeOfResult}?page=${pageNumber}`, customConfig);
}
