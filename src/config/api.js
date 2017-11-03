import instance from './axiosInstance';

export default (site, typeOfResult, pageNumber = 1) => {
  console.log(`${site}/${typeOfResult}?page=${pageNumber}`);
  return instance.get(`${site}/${typeOfResult}?page=${pageNumber}`);
}
