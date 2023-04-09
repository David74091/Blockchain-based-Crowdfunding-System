import axios from "axios";
const API_URL = "http://localhost:8080/api/organize";
class OrganizeService {
  createOrganize(
    userId,
    organizeImage,
    organizeName,
    personName,
    idNumber,
    phoneNumber,
    email,
    introduction
  ) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios
      .post(
        API_URL,
        {
          userId,
          organizeImage,
          organizeName,
          personName,
          idNumber,
          phoneNumber,
          email,
          introduction,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        return response.data; // 返回JSON数据
      });
  }

  pushCase(organizeId, caseId) {
    return axios.post(API_URL + "/pushcase/" + organizeId, { caseId });
  }

  getOrganize(_id) {
    return axios.get(API_URL + "/getorganize/" + _id);
  }
}

export default new OrganizeService();
