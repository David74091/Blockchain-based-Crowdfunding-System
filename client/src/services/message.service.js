import axios from "axios";
const API_URL = "http://localhost:8080/api/message";

class MessageService {
  postMessage(message, caseId, userId) {
    return axios.post(API_URL + "/postMessage", { message, caseId, userId });
  }

  getMessage(caseId) {
    return axios.get(API_URL + "/getmessage", { params: { caseId } });
  }

  postReply(messageId, reply) {
    return axios.post(API_URL + "/postreply", { messageId, reply });
  }
}
export default new MessageService();
