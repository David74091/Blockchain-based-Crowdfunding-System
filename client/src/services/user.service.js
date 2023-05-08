import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class UserService {
  async updateUser(form, picture) {
    let { _id, email, username, phoneNumber, birth, sex, address } = form;
    console.log(_id, email, username);
    const response = await axios.put(API_URL + "/update/" + _id, {
      picture,
      email,
      username,
      phoneNumber,
      birth,
      sex,
      address,
    });
    return response.data;
  }

  addOrganize(_id, _organize) {
    console.log("userService: ", _organize);
    return axios.post(API_URL + "/addorganize/" + _id, {
      _organize,
    });
  }

  getCurrentUser(_id) {
    return axios.get(API_URL + "/getcurrentuser/" + _id);
  }

  getAllUser() {
    return axios.get(API_URL + "/getAllUser");
  }
}

export default new UserService();
