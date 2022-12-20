const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  need: {
    type: Number,
    required: true,
  },
  proposer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donor: {
    type: [String],
    default: [],
  },
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
