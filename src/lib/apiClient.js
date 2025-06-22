import axios from 'axios';
import { API_URL } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: API_URL,
  // No default Content-Type — handled per request
});



export default apiClient;