import instance from './axiosInstance';

export default (site, typeOfResult, pageNumber = 1) => {
  return instance.get(`${site}/${typeOfResult}?page=${pageNumber}`);
}
