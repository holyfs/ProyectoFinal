import axios from "axios";
import config from "../front/js/config.js";
const API_URL =`${config.hostname}/api`;
class AuthService {
  login(email, password) {
    
    return axios
      .post(API_URL + "/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("jwt-token", JSON.stringify(response.data));
          localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("jwt-token");
  }
  register(name, email, password) {
    return axios.post(API_URL + "/signup", {
      name,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('jwt-token'));
  }
}
export default new AuthService();