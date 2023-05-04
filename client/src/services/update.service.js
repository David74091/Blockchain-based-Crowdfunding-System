import axios from "axios";
const API_URL = "http://localhost:8080/api/update";

class UpdateService {
  postUpdate(_id, title, detail) {
    return axios.post(API_URL + "/postUpdate", { _id, title, detail });
  }

  getUpdate(_id) {
    return axios.get(API_URL + "/getUpdate/" + _id);
  }
}
export default new UpdateService();
