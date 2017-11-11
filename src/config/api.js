import instance from './axiosInstance';

export default (site, typeOfResult, pageNumber = 1) => instance.get(`${site}/${typeOfResult}?page=${pageNumber}`);
