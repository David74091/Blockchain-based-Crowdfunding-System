import axios from "axios";
const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  login(email, password) {
    //axios:透過react傳送http request到後端
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role, address, birth, phoneNumber, sex) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
      address,
      birth,
      phoneNumber,
      sex,
    });
  }

  getUserData(_id) {
    return axios.get(API_URL + "/userData/" + _id);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
