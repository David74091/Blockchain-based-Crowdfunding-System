const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  //表單1
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  proposer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //表單2
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
  // donor: {
  //   type: [String],
  //   default: [],
  // },
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
