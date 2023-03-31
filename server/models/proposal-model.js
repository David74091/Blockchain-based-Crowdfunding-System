const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  organizeImage: {
    type: String,
    required: true,
  },
  organizeName: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);
module.exports = Proposal;
