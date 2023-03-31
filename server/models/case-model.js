const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

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
  category: { type: [String], required: true },

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
  details: {
    type: String,
    required: true,
  },
  proposer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donor: {
    type: [donorSchema],
    default: [],
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
  Verified: {
    type: Boolean,
    default: false,
  },
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
