import axios from 'axios';
import api from './apiConfig';

export default axios.create({
  baseURL: api.baseURL,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});