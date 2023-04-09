const mongoose = require("mongoose");

const organizeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
  CasesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
    },
  ],
});

const Organize = mongoose.model("Organize", organizeSchema);

module.exports = Organize;
