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
}

export default new UserService();
