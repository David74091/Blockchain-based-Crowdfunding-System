const mongoose = require("mongoose");
const updateSchema = new mongoose.Schema({
  belong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  detail: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  //   Verified: {
  //     type: Boolean,
  //     default: false,
  //   },
});

const Update = mongoose.model("Update", updateSchema);
module.exports = Update;
