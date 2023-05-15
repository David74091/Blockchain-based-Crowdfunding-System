import axios from "axios";
const API_URL = "http://localhost:8080/api/cases";

class CaseService {
  //axios將提案資料與提案身份資料一起傳向後端
  postCase(
    title,
    description,
    category,
    target,
    deadline,
    image,
    details,
    proposer,
    organizeId
  ) {
    console.log("case.service:", proposer);
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
          title,
          description,
          category,
          target,
          deadline,
          image,
          details,
          proposer,
          organizeId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
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

  getCaseByName(name, category) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName", {
      params: { name: name, category: category },
      headers: { Authorization: token },
    });
  }

  //尋找所有verified為true的case
  getAllTrue() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/verified", {
      headers: {
        Authorization: token,
      },
    });
  }
  //尋找所有verified為false的case
  getAllFalse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/!verified", {
      headers: {
        Authorization: token,
      },
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

  putWithdrawHash(_id, _withdrawHash) {
    console.log("請求進入caseServices的putWithdraw", _id, _withdrawHash);
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(
      API_URL + "/putWithdrawHash/" + _id,
      { _withdrawHash },
      { headers: { Authorization: token } }
    );
  }

  verifiedCase(_id, _bId, _hash) {
    console.log("Hash到了verfiedCase", _id, _bId, _hash);
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(
      API_URL + "/verified/" + _id,
      { _bId, _hash },
      {
        headers: { Authorization: token },
      }
    );
  }

  downCase(_id) {
    console.log("Hash到了downCase", _id);
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(
      API_URL + "/downVerified/" + _id,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }

  getAllDonations(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/getdonorsbytime/" + _id, {
      headers: { Authorization: token },
    });
  }
}

export default new CaseService();
