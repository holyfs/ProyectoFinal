import axios from 'axios';
import authHeader from './auth-header';
import config from '../front/js/config';
class UserService {
  getPublicContent() {
    return axios.get(`${config.hostname}/user`);
  }
  getUserBoard() {
    return axios.get(`${config.hostname}/private`, { headers: authHeader() });
  }
}
export default new UserService();