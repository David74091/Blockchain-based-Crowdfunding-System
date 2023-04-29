import axios from "axios";
const API_URL = "http://localhost:8080/api/donation";

class DonationService {
  getDonationHistory(_id) {
    return axios.get(API_URL + "/getDonationHistory/" + _id);
  }

  pushHash(_id, _hash) {
    return axios.put(API_URL + "/hash/" + _id, {
      _hash,
    });
  }
  DonationVerified(_id) {
    return axios.put(API_URL + "/verified/" + _id);
  }

  getDonationsFalse() {
    return axios.get(API_URL + "/getdonations/false");
  }

  getDonations() {
    return axios.get(API_URL + "/getdonations");
  }

  pushDonation(caseId, donorId, amount) {
    return axios.post(API_URL + "/pushdonation", { caseId, donorId, amount });
  }
}

export default new DonationService();
