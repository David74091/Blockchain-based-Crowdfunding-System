import axios from "axios";
const API_URL = "http://localhost:8080/api/cases";

class CaseService {
  post(title, description, need) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, need },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getDonatedCases(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/donor/" + _id, {
      headers: { Authorization: token },
    });
  }

  getCaseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/proposer/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  donate(_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/donate/" + _id,
      { user_id },
      { headers: { Authorization: token } }
    );
  }
}

export default new CaseService();
