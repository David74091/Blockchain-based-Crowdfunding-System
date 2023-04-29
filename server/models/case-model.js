const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  id: { type: String },
  bId: { type: String, required: true },
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
  organize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organize",
    required: true,
  },
  donations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Donation",
    default: [],
  },
  Verified: {
    type: Boolean,
    default: false,
  },
});

caseSchema.methods.getDonorsByTime = async function () {
  const caseWithDonations = await Case.findById(this._id).populate({
    path: "donations",
    select: "hash amount", // 將 select 移動到與 populate 平行的位置
    populate: {
      path: "donor",
      select: "username picture",
    },
  });

  const sortedDonations = caseWithDonations.donations
    .sort((a, b) => new Date(a.donateDate) - new Date(b.donateDate))
    .map(({ donor, amount, donateDate, hash }) => ({
      donor: {
        id: donor._id,
        username: donor.username,
        picture: donor.picture,
      },
      amount,
      donateDate,
      hash, // 添加hash字段
    }));

  console.log("sortedDonations:", sortedDonations);
  return sortedDonations;
};

caseSchema.methods.getTotalAmount = async function () {
  const caseWithDonations = await Case.findById(this._id).populate("donations");
  console.log("donations:", caseWithDonations.donations);
  return caseWithDonations.donations.reduce(
    (total, donation) => total + donation.amount,
    0
  );
};

caseSchema.virtual("donorsByAmount").get(function () {
  return this.getDonorsByAmount();
});

caseSchema.methods.getDonorsByAmount = async function () {
  const donorsByAmount = {
    100: [],
    500: [],
    1000: [],
    5000: [],
  };

  const populatedCase = await this.model("Case")
    .findById(this._id)
    .populate({
      path: "donations",
      populate: {
        path: "donor",
        select: "username picture",
      },
    });

  populatedCase.donations.forEach(({ donor, amount, donateDate }) => {
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
};

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
