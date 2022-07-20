import axios from "axios";
const API_URL = "https://3001-holyfs-proyectofinal-q4aicqzoqf2.ws-eu54.gitpod.io/api";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(name, last_name, email, password, age, description, artist_name_or_band_name) {
    return axios.post(API_URL + "/signup", {
      name,
      last_name,
      email,
      password,
      age,
      description,
      artist_name_or_band_name
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();