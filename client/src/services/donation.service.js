import axios from "axios";
const API_URL = "http://localhost:8080/api/donation";

class DonationService {
  pushDonation(caseId, donorId, amount) {
    return axios.post(API_URL + "/pushdonation", { caseId, donorId, amount });
  }
}

export default new DonationService();
