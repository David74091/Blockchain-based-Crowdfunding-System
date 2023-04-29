const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema({
  belong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donateDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Verified: {
    type: Boolean,
    default: false,
  },
  hash: {
    type: String,
    default: null,
  },
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
