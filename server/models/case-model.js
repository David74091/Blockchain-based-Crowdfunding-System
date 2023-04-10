const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
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
});

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
    required: true,
  },
  // donor: {
  //   type: [donorSchema],
  //   default: [],
  // },
  organize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organize",
    required: true,
  },
  donations: {
    type: [donationSchema],
    default: [],
  },
  Verified: {
    type: Boolean,
    default: false,
  },
});

caseSchema.methods.getDonorsByTime = async function () {
  const caseWithDonations = await Case.findById(this._id).populate(
    "donations.donor",
    "username picture"
  );

  return caseWithDonations.donations
    .sort((a, b) => new Date(a.donateDate) - new Date(b.donateDate))
    .map(({ donor, amount, donateDate }) => ({
      donor: {
        id: donor._id,
        username: donor.username,
        picture: donor.picture,
      },
      amount,
      donateDate,
    }));
};

// 定義一個名為 `donorsByAmount` 的 virtual property
caseSchema.virtual("donorsByAmount").get(function () {
  const donorsByAmount = {
    100: [],
    500: [],
    1000: [],
    5000: [],
  };

  // 將每筆捐款者資料放入對應的欄位
  this.donations.forEach(({ donor, amount, donateDate }) => {
    switch (amount) {
      case 100:
        donorsByAmount[100].push({ donor, donateDate });
        break;
      case 500:
        donorsByAmount[500].push({ donor, donateDate });
        break;
      case 1000:
        donorsByAmount[1000].push({ donor, donateDate });
        break;
      case 5000:
        donorsByAmount[5000].push({ donor, donateDate });
        break;
    }
  });

  return donorsByAmount;
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
