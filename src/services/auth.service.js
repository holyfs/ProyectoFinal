import axios from "axios";
const API_URL = "https://3001-holyfs-proyectofinal-5zwcb1ywnhe.ws-eu54.gitpod.io/api";
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