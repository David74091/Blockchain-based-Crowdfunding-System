const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  message: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Case", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createAt: { type: Date, default: Date.now },
  reply: [replySchema],
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
